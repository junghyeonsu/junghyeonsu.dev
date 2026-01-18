interface TimelineItem {
  id: string;
  company: string;
  team: string;
  role: string;
  companyLogo?: string;
  startYear: number;
  startMonth: number;
  endYear?: number;
  endMonth?: number;
  color: string;
}

interface WorkTimelineProps {
  items: TimelineItem[];
}

const TIMELINE_START = 2022;
const TIMELINE_END = 2026;
const TOTAL_MONTHS = (TIMELINE_END - TIMELINE_START + 1) * 12;

function getMonthOffset(year: number, month: number): number {
  return (year - TIMELINE_START) * 12 + (month - 1);
}

function calculateBarPosition(item: TimelineItem): { left: number; width: number } {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const startOffset = getMonthOffset(item.startYear, item.startMonth);
  const endOffset =
    item.endYear && item.endMonth
      ? getMonthOffset(item.endYear, item.endMonth)
      : getMonthOffset(currentYear, currentMonth);

  const left = (startOffset / TOTAL_MONTHS) * 100;
  const width = Math.max(((endOffset - startOffset + 1) / TOTAL_MONTHS) * 100, 3);

  return { left, width };
}

function formatDuration(item: TimelineItem): string {
  const now = new Date();
  const endYear = item.endYear ?? now.getFullYear();
  const endMonth = item.endMonth ?? now.getMonth() + 1;

  const totalMonths = (endYear - item.startYear) * 12 + (endMonth - item.startMonth);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} mo`;
  }
  if (months === 0) {
    return years === 1 ? "1 yr" : `${years} yrs`;
  }
  return years === 1 ? `1 yr ${months} mo` : `${years} yrs ${months} mo`;
}

function sortItems(items: TimelineItem[]): TimelineItem[] {
  return [...items].sort((a, b) => {
    const aIsOngoing = !a.endYear;
    const bIsOngoing = !b.endYear;

    if (aIsOngoing && bIsOngoing) {
      const aStart = a.startYear * 12 + a.startMonth;
      const bStart = b.startYear * 12 + b.startMonth;
      return aStart - bStart;
    }

    if (aIsOngoing) return -1;
    if (bIsOngoing) return 1;

    const aEnd = a.endYear! * 12 + a.endMonth!;
    const bEnd = b.endYear! * 12 + b.endMonth!;
    return bEnd - aEnd;
  });
}

export default function WorkTimeline({ items }: WorkTimelineProps) {
  const sortedItems = sortItems(items);

  const years = Array.from(
    { length: TIMELINE_END - TIMELINE_START + 1 },
    (_, i) => TIMELINE_START + i,
  );

  const containerHeight = 16 + sortedItems.length * 8;

  return (
    <div className="my-6">
      <div className="relative overflow-x-clip">
        <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mb-1">
          {years.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>

        <div
          className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-visible"
          style={{ height: containerHeight }}
        >
          <div className="absolute inset-0 flex">
            {years.map((year, i) => (
              <div
                key={year}
                className={`flex-1 ${i < years.length - 1 ? "border-r border-gray-100 dark:border-gray-800" : ""}`}
              />
            ))}
          </div>

          {sortedItems.map((item, index) => {
            const { left, width } = calculateBarPosition(item);
            const duration = formatDuration(item);
            return (
              <div
                key={item.id}
                className="group absolute rounded-full cursor-default"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  height: 6,
                  top: 4 + index * 12,
                  backgroundColor: item.color,
                  zIndex: 1,
                }}
              >
                <span className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10 shadow-lg">
                  <span className="font-medium">{item.company}</span>
                  <span className="text-gray-300 dark:text-gray-600 mx-1">·</span>
                  <span>{item.team}</span>
                  <span className="text-gray-300 dark:text-gray-600 mx-1">·</span>
                  <span className="text-gray-300 dark:text-gray-500">{item.role}</span>
                  <span className="text-gray-400 dark:text-gray-500 ml-1.5">({duration})</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {sortedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span
              className="rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color, width: 8, height: 8 }}
            />
            {item.companyLogo && (
              <img
                src={item.companyLogo}
                alt={item.company}
                className="w-4 h-4 object-contain flex-shrink-0"
                draggable={false}
              />
            )}
            <div className="flex items-baseline gap-1.5 flex-wrap flex-1 min-w-0">
              <span className="text-sm font-medium">{item.company}</span>
              <span className="text-sm text-gray-400 dark:text-gray-500">·</span>
              <span className="text-sm">{item.team}</span>
              <span className="text-sm text-gray-400 dark:text-gray-500">·</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.role}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                {item.startYear}.{String(item.startMonth).padStart(2, "0")} –{" "}
                {item.endYear
                  ? `${item.endYear}.${String(item.endMonth).padStart(2, "0")}`
                  : "Present"}{" "}
                ({formatDuration(item)})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
