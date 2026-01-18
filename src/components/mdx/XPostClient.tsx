import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (
          tweetId: string,
          container: HTMLElement,
          options?: {
            theme?: "light" | "dark";
            dnt?: boolean;
            conversation?: "none" | "all";
            cards?: "hidden" | "visible";
            align?: "left" | "center" | "right";
            lang?: string;
          },
        ) => Promise<HTMLElement | undefined>;
        load: (element?: HTMLElement) => void;
      };
      ready: (callback: (twttr: Window["twttr"]) => void) => void;
    };
    __twttrLoading?: Promise<void>;
  }
}

interface XPostClientProps {
  tweetId: string;
  hideThread?: boolean;
  hideMedia?: boolean;
  align?: "left" | "center" | "right";
}

const LOAD_TIMEOUT_MS = 10000;

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

function loadWidgetsScript(): Promise<void> {
  if (window.__twttrLoading) {
    return window.__twttrLoading;
  }

  if (window.twttr?.widgets) {
    return new Promise((resolve) => {
      window.twttr!.ready(() => resolve());
    });
  }

  window.__twttrLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";

    script.onload = () => {
      if (window.twttr?.ready) {
        window.twttr.ready(() => resolve());
      } else {
        resolve();
      }
    };
    script.onerror = () => reject(new Error("Failed to load Twitter widgets.js"));

    document.head.appendChild(script);
  });

  return window.__twttrLoading;
}

export default function XPostClient({
  tweetId,
  hideThread = false,
  hideMedia = false,
  align = "center",
}: XPostClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "light");
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const renderTweet = async () => {
      if (!containerRef.current) return;

      if (!isFirstRender.current) {
        setIsLoading(true);
      }
      isFirstRender.current = false;
      setError(null);

      containerRef.current.innerHTML = "";

      try {
        await loadWidgetsScript();

        if (!window.twttr?.widgets) {
          throw new Error("Twitter widgets not available");
        }

        const result = await withTimeout(
          window.twttr.widgets.createTweet(tweetId, containerRef.current, {
            theme,
            dnt: true,
            conversation: hideThread ? "none" : "all",
            cards: hideMedia ? "hidden" : "visible",
            align,
            lang: "ko",
          }),
          LOAD_TIMEOUT_MS,
          "Tweet load timed out",
        );

        if (!result) {
          throw new Error("Tweet not found or unavailable");
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tweet");
        setIsLoading(false);
      }
    };

    renderTweet();
  }, [tweetId, theme, hideThread, hideMedia, align]);

  return (
    <div className="my-8 relative">
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm">Loading post...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <p className="text-sm mb-2">Failed to load post</p>
          <a
            href={`https://x.com/i/status/${tweetId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
          >
            View on X →
          </a>
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          display: "flex",
          justifyContent:
            align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
          visibility: isLoading || error ? "hidden" : "visible",
          position: isLoading || error ? "absolute" : "relative",
          pointerEvents: isLoading || error ? "none" : "auto",
        }}
      />
    </div>
  );
}
