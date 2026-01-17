import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseInternalPostLink(
  href: string | undefined,
): { slug: string; locale?: "en" } | null {
  if (!href) return null;

  const withoutQueryAndHash = href.split(/[?#]/)[0];
  const withoutTrailingSlash = withoutQueryAndHash.replace(/\/$/, "");

  const enMatch = withoutTrailingSlash.match(/^\/en\/posts\/([^/]+)$/);
  if (enMatch) {
    return { slug: enMatch[1], locale: "en" };
  }

  const koMatch = withoutTrailingSlash.match(/^\/posts\/([^/]+)$/);
  if (koMatch) {
    return { slug: koMatch[1] };
  }

  return null;
}
