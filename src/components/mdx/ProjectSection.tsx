import type { ReactNode } from "react";

interface ProjectSectionProps {
  title: string;
  startYear: number;
  startMonth?: number;
  endYear?: number;
  endMonth?: number;
  children: ReactNode;
}

function formatPeriod(
  startYear: number,
  startMonth?: number,
  endYear?: number,
  endMonth?: number,
): string {
  const startStr = startMonth
    ? `${startYear}.${String(startMonth).padStart(2, "0")}`
    : `${startYear}`;

  if (endYear === undefined) {
    return `${startStr} – Present`;
  }

  const endStr = endMonth ? `${endYear}.${String(endMonth).padStart(2, "0")}` : `${endYear}`;
  return `${startStr} – ${endStr}`;
}

export default function ProjectSection({
  title,
  startYear,
  startMonth,
  endYear,
  endMonth,
  children,
}: ProjectSectionProps) {
  const period = formatPeriod(startYear, startMonth, endYear, endMonth);

  return (
    <section className="mb-8 last:mb-0">
      <header className="mb-3">
        <h3 className="text-base font-semibold m-0 leading-tight">{title}</h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">{period}</span>
      </header>
      <div className="text-sm leading-relaxed">{children}</div>
    </section>
  );
}
