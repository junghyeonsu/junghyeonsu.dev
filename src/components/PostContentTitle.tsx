import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import { koreanTagNames } from "../constants";

interface PostContentTitleProps {
  readingTime: string;
  post: GatsbyTypes.PostPageQuery["post"];
}

const PostContentTitle = ({ post, readingTime }: PostContentTitleProps) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      width="100%"
      position="relative"
      flexDirection="column"
      alignItems="baseline"
      isolation="isolate"
    >
      <Heading as="h1" fontSize={36} marginBottom="3" fontWeight={900}>
        {post?.frontmatter?.title}
      </Heading>
      <Flex columnGap="14px" rowGap="10px" alignItems="end" flexWrap="wrap">
        <Box
          color={colorMode === "dark" ? "gray.50" : "gray.900"}
          borderColor={colorMode === "dark" ? "gray.50" : "gray.900"}
          border="2px solid"
          borderRadius="20px"
          padding="6px 10px"
          fontSize="14px"
          fontWeight="800"
          width="fit-content"
        >
          {post?.frontmatter?.createdAt}
        </Box>
        {post?.frontmatter?.tags?.map((tag) => (
          <Link key={tag} to={`/tags/${tag}`}>
            <Box
              key={tag}
              color={colorMode === "dark" ? "gray.50" : "gray.900"}
              borderColor={colorMode === "dark" ? "gray.50" : "gray.900"}
              border="2px solid"
              borderRadius="20px"
              padding="6px"
              fontSize="14px"
              fontWeight="800"
              width="fit-content"
            >
              {koreanTagNames[tag!]}
            </Box>
          </Link>
        ))}
        <Text fontSize="12px">{readingTime}</Text>
      </Flex>

      <Box display="flex" width="100%" justifyContent="center" alignItems="center">
        <GatsbyImage
          style={{ marginTop: "20px", borderRadius: "20px" }}
          image={post?.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
          alt={post?.frontmatter?.title!}
        />
      </Box>
    </Flex>
  );
};

export default PostContentTitle;
