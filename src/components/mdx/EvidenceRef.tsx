interface EvidenceRefProps {
  n: number;
  to: string;
}

const refStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 600,
  verticalAlign: "super",
  lineHeight: 1,
  cursor: "pointer",
  transition: "color 0.2s ease",
};

export default function EvidenceRef({ n, to }: EvidenceRefProps) {
  const targetId = to.startsWith("#") ? to.slice(1) : to;

  return (
    <a
      href={`#${targetId}`}
      data-evidence-target={targetId}
      style={refStyle}
      className="no-underline hover:underline focus-visible:underline hover:text-stone-600 dark:hover:text-stone-300"
      aria-label={`Evidence ${n}`}
    >
      [{n}]
    </a>
  );
}
