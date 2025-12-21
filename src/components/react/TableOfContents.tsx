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
}: {
	delay: number;
	tableOfContentsItem: TableOfContentsItemType;
	activeId: string;
}) => {
	const { url, title, items } = tableOfContentsItem;
	const isActive = url === activeId;

	return (
		<>
			<motion.div
				transition={{ delay }}
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
			>
				<li id={url}>
					<a href={url}>
						<span
							className={`transition-all ${
								isActive ? "scale-[1.02] text-blue-500" : "scale-100 text-gray-500"
							}`}
						>
							{title}
						</span>
					</a>
				</li>
			</motion.div>
			{items && (
				<ul className="list-none pl-5">
					{items.map((item, index) => (
						<TableOfContentsItem
							delay={(delay + index + 1) / 10}
							activeId={activeId}
							key={item.url}
							tableOfContentsItem={item}
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
			<nav className="sticky self-start hidden xl:block top-[150px] w-[250px] ml-[100px]">
				<h2 className="text-xl font-bold">ON THIS PAGE</h2>
			</nav>
		);
	}

	return (
		<nav className="sticky self-start hidden xl:block top-[150px] w-[250px] ml-[100px]">
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1 }}
			>
				<h2 className="text-xl font-bold">ON THIS PAGE</h2>
			</motion.div>
			<ul className="mt-2.5 list-none text-sm">
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
