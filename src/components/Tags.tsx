import { Button, Flex } from "@chakra-ui/react";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

interface TagsProps {
  currentTag: string;
}

export default function Tags({ currentTag }: TagsProps) {
  const data = useStaticQuery(graphql`
    query Tags {
      allMdx {
        group(field: { frontmatter: { tags: SELECT } }) {
          tagPostCount: totalCount
          tag: fieldValue
        }
        allPostCount: totalCount
      }
    }
  `);

  return (
    <Flex
      as="nav"
      columnGap="10px"
      rowGap="10px"
      flexWrap="wrap"
      marginTop="20px"
      padding={{ base: "0 20px", md: "0px" }}
      width="100%"
    >
      <Link to="/">
        <Button
          backgroundColor={currentTag === "all" ? "blue.400" : "none"}
          colorScheme={currentTag === "all" ? "blue" : undefined}
        >
          all ({data.allMdx.allPostCount})
        </Button>
      </Link>
      {Object.values(data.allMdx.group).map((group) => {
        const { tag, tagPostCount } = group as {
          tag: string;
          tagPostCount: number;
        };
        return (
          <Link key={tag} to={`/tags/${tag}`}>
            <Button
              backgroundColor={currentTag === tag ? "blue.400" : "none"}
              colorScheme={currentTag === tag ? "blue" : undefined}
              key={tag}
            >
              {tag} ({tagPostCount})
            </Button>
          </Link>
        );
      })}
    </Flex>
  );
}
