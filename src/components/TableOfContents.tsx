import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "gatsby";
import React, { useEffect, useState } from "react";

import { fadeInFromLeft } from "../framer-motions";

export type TableOfContentsItemType = {
  url: string;
  title: string;
  items?: TableOfContentsItemType[];
};

export type TableOfContentsType = {
  items: TableOfContentsItemType[];
};

const TableOfContentsItem: React.FC<{
  delay: number;
  tableOfContentsItem: TableOfContentsItemType;
  activeId: string;
}> = ({ tableOfContentsItem, activeId, delay }) => {
  const { url, title, items } = tableOfContentsItem;
  const isActive = url === activeId;
  return (
    <>
      <motion.div transition={{ delay }} {...fadeInFromLeft}>
        <Box as="li" id={url}>
          <Link to={url}>
            <Text
              fontWeight={isActive ? "bold" : "normal"}
              transform={isActive ? "scale(1.02)" : "scale(1)"}
              color={isActive ? "blue.500" : "GrayText"}
            >
              {title}
            </Text>
          </Link>
        </Box>
      </motion.div>
      {items && (
        <Box listStyleType="none" paddingInlineStart="20px" as="ul">
          {items.map((item, index) => (
            <TableOfContentsItem
              delay={(delay + index + 1) / 10}
              activeId={activeId}
              key={item.url}
              tableOfContentsItem={item}
            />
          ))}
        </Box>
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
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(`#${entry.target.id}`);
      });
    };

    const observer = new IntersectionObserver(callback);

    const observe = (item: TableOfContentsItemType) => {
      // NOTE: itme.url is like "#heading-1", so we need to remove the first character.
      const element = document.querySelector(`[id="${item.url.substring(1)}"]`);

      if (element) observer.observe(element);
      if (item.items) item.items.forEach(observe);
    };

    tableOfContents.items.forEach(observe);

    return () => observer.disconnect();
  }, [setActiveId]);

  return (
    <Box
      as="nav"
      position="sticky"
      display={{ base: "none", xl: "block" }}
      top="150px"
      width="250px"
      marginLeft="100px"
    >
      <motion.div transition={{ delay: 0.1 }} {...fadeInFromLeft}>
        <Heading as="h2" fontSize="20px">
          ON THIS PAGE
        </Heading>
      </motion.div>
      <Box marginTop="10px" listStyleType="none" fontSize="14px" as="ul">
        {tableOfContents.items.map((item, index) => (
          <TableOfContentsItem
            delay={(0.1 + index) / 10}
            key={item.url}
            activeId={activeId}
            tableOfContentsItem={item}
          />
        ))}
      </Box>
    </Box>
  );
}
