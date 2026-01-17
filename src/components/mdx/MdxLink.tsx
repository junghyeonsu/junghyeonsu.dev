import type { AnchorHTMLAttributes, ReactNode } from "react";

interface MdxLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
}

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block ml-0.5 -mt-0.5"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function isExternalHref(href: string | undefined): boolean {
  if (!href) return false;
  return /^(https?:)?\/\//.test(href);
}

export default function MdxLink({ href, children, className, ...props }: MdxLinkProps) {
  const isExternal = isExternalHref(href);
  const hasNoUnderlineClass = className?.includes("no-underline");
  const showIcon = isExternal && !hasNoUnderlineClass;

  return (
    <a
      href={href}
      className={className}
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...props}
    >
      {children}
      {showIcon && <ExternalLinkIcon />}
    </a>
  );
}
