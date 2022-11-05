import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

interface PostContentTitleProps {
  readingTime: string;
  post: GatsbyTypes.PostPageQuery["post"];
}

const PostContentTitle = ({ post, readingTime }: PostContentTitleProps) => {
  return (
    <Flex width="100%" position="relative" flexDirection="column" alignItems="baseline">
      <Heading as="h1" fontSize={36} marginBottom="3" fontWeight={900}>
        {post?.frontmatter?.title}
      </Heading>
      <Flex columnGap="10px" rowGap="10px" alignItems="end" flexWrap="wrap">
        <Badge fontSize="14px">{post?.frontmatter?.createdAt}</Badge>
        {post?.frontmatter?.tags?.map((tag) => (
          <Link key={tag} to={`/tags/${tag}`}>
            <Badge fontSize="14px">{tag}</Badge>
          </Link>
        ))}
        <Text fontSize="14px">{readingTime}</Text>
      </Flex>

      <Box display="flex" width="100%" justifyContent="center" alignItems="center">
        <GatsbyImage
          style={{ marginTop: "20px" }}
          image={post?.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
          alt={post?.frontmatter?.title!}
        />
      </Box>
    </Flex>
  );
};

export default PostContentTitle;
