import { Button, Flex } from "@chakra-ui/react";
import { graphql, Link, StaticQuery } from "gatsby";
import React from "react";

interface TagsProps {
  currentTag: string;
}

export default function Tags({ currentTag }: TagsProps) {
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
      <StaticQuery
        query={graphql`
          query Tags {
            allMdx {
              group(field: frontmatter___tags) {
                totalCount
                tag: fieldValue
              }
              totalCount
            }
          }
        `}
        render={(data) => {
          return (
            <>
              <Link to="/">
                <Button
                  backgroundColor={currentTag === "all" ? "blue.400" : "none"}
                  colorScheme={currentTag === "all" ? "blue" : undefined}
                >
                  all ({data.allMdx.totalCount})
                </Button>
              </Link>
              {Object.values(data.allMdx.group).map((group) => {
                const { tag, totalCount } = group as {
                  tag: string;
                  totalCount: number;
                };
                return (
                  <Link key={tag} to={`/tags/${tag}`}>
                    <Button
                      backgroundColor={currentTag === tag ? "blue.400" : "none"}
                      colorScheme={currentTag === tag ? "blue" : undefined}
                      key={tag}
                    >
                      {tag} ({totalCount})
                    </Button>
                  </Link>
                );
              })}
            </>
          );
        }}
      />
    </Flex>
  );
}
