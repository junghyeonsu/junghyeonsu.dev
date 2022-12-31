import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { graphql, Link, useStaticQuery } from "gatsby";

import { koreanTagNames } from "../constants";
import { convertSlugToTitle } from "../utils/string";

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

  const currentTagPostCount = data.allMdx.group.find(
    (group: { tag: string; tagPostCount: number }) => group.tag === currentTag,
  )?.tagPostCount;

  return (
    <Flex marginTop="80px" direction="column" width="100%" maxWidth="800px">
      {/* Title + Count */}
      <Flex justifyContent="center" width="100%" margin="auto">
        <Heading
          fontStyle="italic"
          fontSize={{ base: "30px", md: "50px" }}
          fontWeight="600"
          letterSpacing={-1.5}
        >
          {currentTag === "all" ? "ALL POSTS." : `${convertSlugToTitle(currentTag)}.`}
        </Heading>
        <Text
          fontSize={{ base: "12px", md: "16px" }}
          fontStyle="italic"
          color="gray.500"
          fontWeight="200"
        >
          ({currentTag === "all" ? data.allMdx.allPostCount : currentTagPostCount})
        </Text>
      </Flex>

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
                {koreanTagNames[tag]} ({tagPostCount})
              </Button>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}
