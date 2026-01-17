export type EvidenceType = "link" | "post" | "image" | "video" | "github";

export interface EvidenceCardProps {
  id: string;
  type: EvidenceType;
  title: string;
  href?: string;
  thumb?: string;
}

const GITHUB_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SEED_ICON = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black dark:text-white"
  >
    <rect x="52.5" width="15" height="120" fill="currentColor" />
    <rect
      x="120"
      y="52.5"
      width="15"
      height="120"
      transform="rotate(90 120 52.5)"
      fill="currentColor"
    />
    <rect
      x="107.73"
      y="97.123"
      width="15"
      height="120"
      transform="rotate(135 107.73 97.123)"
      fill="currentColor"
    />
    <rect
      x="22.875"
      y="107.729"
      width="15"
      height="120"
      transform="rotate(-135 22.875 107.729)"
      fill="currentColor"
    />
  </svg>
);

function isSeedHref(href: string | undefined): boolean {
  if (!href) return false;
  return /(^|\/\/)(www\.)?seed-design\.io(\/|$)/.test(href);
}

const ARROW_ICON = (
  <svg
    fill="#000000"
    width="24"
    height="24"
    viewBox="-6 -6.5 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
  >
    <path d="M7.828 2.414H2.243a1 1 0 1 1 0-2h8a.997.997 0 0 1 1 1v8a1 1 0 0 1-2 0V3.828l-6.779 6.779A1 1 0 0 1 1.05 9.192l6.778-6.778z" />
  </svg>
);

const EXTERNAL_LINK_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function Overlay({ title, isExternal }: { title: string; isExternal: boolean }) {
  return (
    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100">
      <div className="absolute top-2.5 right-2.5 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-700">
        {isExternal ? EXTERNAL_LINK_ICON : ARROW_ICON}
      </div>
      <h4 className="text-white text-sm font-medium leading-snug line-clamp-2">{title}</h4>
    </div>
  );
}

function Thumbnail({
  thumb,
  title,
  showGithubPlaceholder,
  showSeedPlaceholder,
}: {
  thumb?: string;
  title: string;
  showGithubPlaceholder: boolean;
  showSeedPlaceholder: boolean;
}) {
  if (showSeedPlaceholder) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        {SEED_ICON}
      </div>
    );
  }

  if (thumb) {
    return (
      <img
        src={thumb}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
    );
  }

  if (showGithubPlaceholder) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        {GITHUB_ICON}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <span className="text-gray-400 text-xs">No Image</span>
    </div>
  );
}

function isExternalHref(href: string | undefined): boolean {
  if (!href) return false;
  return /^(https?:)?\/\//.test(href);
}

const ZOOM_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

function ZoomOverlay({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end items-start p-3 opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 group-focus-visible:opacity-100">
      <div className="absolute top-2.5 right-2.5 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-700">
        {ZOOM_ICON}
      </div>
      <h4 className="text-white text-sm font-medium leading-snug line-clamp-2 text-left">
        {title}
      </h4>
    </div>
  );
}

function EvidenceCard({ id, type, title, href, thumb }: EvidenceCardProps) {
  const isExternal = isExternalHref(href);
  const isClickable = !!href;
  const showGithubPlaceholder = type === "github" && !thumb;
  const showSeedPlaceholder = type === "link" && isSeedHref(href);
  const isZoomable = type === "image" && !!thumb && !href;

  const cardClasses =
    "group relative flex-shrink-0 w-[200px] h-[150px] rounded-lg overflow-hidden snap-start bg-gray-50 dark:bg-gray-800";

  if (isClickable) {
    return (
      <a
        id={id}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`${cardClasses} no-underline block`}
        draggable={false}
      >
        <Thumbnail
          thumb={thumb}
          title={title}
          showGithubPlaceholder={showGithubPlaceholder}
          showSeedPlaceholder={showSeedPlaceholder}
        />
        <Overlay title={title} isExternal={isExternal} />
      </a>
    );
  }

  if (isZoomable) {
    return (
      <button
        type="button"
        id={id}
        data-zoom-src={thumb}
        data-zoom-alt={title}
        className={`${cardClasses} cursor-zoom-in focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2`}
        draggable={false}
      >
        <Thumbnail
          thumb={thumb}
          title={title}
          showGithubPlaceholder={showGithubPlaceholder}
          showSeedPlaceholder={showSeedPlaceholder}
        />
        <ZoomOverlay title={title} />
      </button>
    );
  }

  return (
    <div id={id} className={cardClasses}>
      <Thumbnail
        thumb={thumb}
        title={title}
        showGithubPlaceholder={showGithubPlaceholder}
        showSeedPlaceholder={showSeedPlaceholder}
      />
      <Overlay title={title} isExternal={false} />
    </div>
  );
}

export default EvidenceCard;
