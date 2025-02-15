import { Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "gatsby";

interface SideProjectDevlogPostSectionProps {
  posts: GatsbyTypes.AllPostPageTemplateQuery["sideProjectDevlogPosts"]["nodes"];
}

const SideProjectDevlogPostSection = ({ posts }: SideProjectDevlogPostSectionProps) => {
  return (
    <Flex
      marginTop={{ base: "100px", lg: "0px" }}
      width={{ base: "100%", lg: "240px" }}
      direction="column"
    >
      <Heading fontStyle="italic" _hover={{ textDecoration: "underline" }}>
        <Link to="/tags/side-project-devlog">Devlog.</Link>
      </Heading>
      <Flex
        direction="column"
        as="ul"
        maxHeight="570px"
        overflowY="auto"
        overscrollBehavior="contain"
        marginTop="20px"
        gap={{ base: "10px", lg: "20px" }}
      >
        {posts.map((post) => (
          <Link to={`/posts/${post.frontmatter?.slug!}`} key={post.frontmatter?.slug!}>
            <Flex direction="column" as="li" _hover={{ textDecoration: "underline" }}>
              <Text fontSize="12px" opacity={0.6}>
                {post.frontmatter?.createdAt}
              </Text>
              <Text fontSize="14px">{post.frontmatter?.title}</Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default SideProjectDevlogPostSection;
