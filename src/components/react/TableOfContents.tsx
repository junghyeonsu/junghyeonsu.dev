import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export type TableOfContentsItemType = {
  url: string;
  title: string;
  items?: TableOfContentsItemType[];
};

export type TableOfContentsType = {
  items: TableOfContentsItemType[];
};

const TableOfContentsItem = ({
  tableOfContentsItem,
  activeId,
  delay,
  depth = 0,
}: {
  delay: number;
  tableOfContentsItem: TableOfContentsItemType;
  activeId: string;
  depth?: number;
}) => {
  const { url, title, items } = tableOfContentsItem;
  const isActive = url === activeId;

  const depthStyles = depth === 0 ? "text-xs" : "text-[11px]";

  return (
    <>
      <motion.div
        transition={{ delay }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <li id={url} className="leading-tight py-0.5">
          <a href={url}>
            <span
              className={`transition-colors ${depthStyles} ${
                isActive ? "text-foreground font-medium" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {title}
            </span>
          </a>
        </li>
      </motion.div>
      {items && (
        <ul className="list-none pl-3">
          {items.map((item, index) => (
            <TableOfContentsItem
              delay={(delay + index + 1) / 10}
              activeId={activeId}
              key={item.url}
              tableOfContentsItem={item}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default function TableOfContents({
  tableOfContents,
}: {
  tableOfContents: TableOfContentsType;
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!tableOfContents?.items?.length) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(`#${entry.target.id}`);
      });
    };

    const option: IntersectionObserverInit = {
      rootMargin: "0px 0px -90% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(callback, option);

    const observe = (item: TableOfContentsItemType) => {
      const element = document.querySelector(`[id="${item.url.substring(1)}"]`);
      if (element) observer.observe(element);
      if (item.items) item.items.forEach(observe);
    };

    tableOfContents.items.forEach(observe);

    return () => observer.disconnect();
  }, [tableOfContents?.items]);

  if (!tableOfContents?.items?.length) {
    return (
      <nav className="sticky self-start hidden xl:block top-[150px] w-[200px] ml-[80px]">
        <h2 className="text-[10px] font-medium tracking-widest text-gray-400 dark:text-gray-500">
          ON THIS PAGE
        </h2>
      </nav>
    );
  }

  return (
    <nav className="sticky self-start hidden xl:block top-[150px] w-[200px] ml-[80px]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-[10px] font-medium tracking-widest text-gray-400 dark:text-gray-500">
          ON THIS PAGE
        </h2>
      </motion.div>
      <ul className="mt-2 list-none">
        {tableOfContents.items.map((item, index) => (
          <TableOfContentsItem
            delay={(0.1 + index) / 10}
            key={item.url}
            activeId={activeId}
            tableOfContentsItem={item}
          />
        ))}
      </ul>
    </nav>
  );
}
