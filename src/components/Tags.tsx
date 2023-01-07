import { Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { graphql, Link, useStaticQuery } from "gatsby";

import { ALL_POSTS_TAG_NAME, koreanTagNames } from "../constants";
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
    <Flex marginTop="80px" direction="column" width="100%" alignItems="center">
      {/* Title + Count */}
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          margin: "auto",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Heading
          fontStyle="italic"
          fontSize={{ base: currentTag === ALL_POSTS_TAG_NAME ? "40px" : "30px", md: "60px" }}
          fontWeight="800"
          letterSpacing={-1.5}
        >
          {convertSlugToTitle(currentTag)}.
        </Heading>
        <Text
          fontSize={{ base: "12px", md: "16px" }}
          fontStyle="italic"
          color="gray.500"
          fontWeight="200"
        >
          ({currentTag === ALL_POSTS_TAG_NAME ? data.allMdx.allPostCount : currentTagPostCount})
        </Text>
      </motion.div>

      {/* Tag List */}
      <Flex
        as="nav"
        columnGap="10px"
        rowGap="10px"
        flexWrap="wrap"
        marginTop="40px"
        padding={{ base: "0 20px", md: "0px" }}
        width="100%"
        maxWidth="600px"
      >
        <Link to="/">
          <Flex justifyContent="center" alignItems="flex-start">
            <Text
              fontSize={{ base: "14px", md: "18px" }}
              fontWeight={currentTag === ALL_POSTS_TAG_NAME ? 700 : 400}
              _hover={{ textDecoration: "underline" }}
            >
              All Posts
            </Text>
            <Text fontSize="12px" fontWeight={currentTag === ALL_POSTS_TAG_NAME ? 700 : 300}>
              ({data.allMdx.allPostCount})
            </Text>
          </Flex>
        </Link>
        {Object.values(data.allMdx.group).map((group) => {
          const { tag, tagPostCount } = group as {
            tag: string;
            tagPostCount: number;
          };
          return (
            <Link key={tag} to={`/tags/${tag}`}>
              <Flex justifyContent="center" alignItems="flex-start">
                <Text
                  fontSize={{ base: "14px", md: "18px" }}
                  fontWeight={currentTag === tag ? 700 : 400}
                  _hover={{ textDecoration: "underline" }}
                >
                  {koreanTagNames[tag]}
                </Text>
                <Text fontSize="12px" fontWeight={currentTag === tag ? 700 : 300}>
                  ({tagPostCount})
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}
