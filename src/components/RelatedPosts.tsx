import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";

import PostCard from "./PostCard";

interface RelatedPostsProps {
  relatedPosts: GatsbyTypes.PostPageQuery["relatedPosts"];
}

const RelatedPosts = ({ relatedPosts }: RelatedPostsProps) => {
  const relatedPostsLength = relatedPosts?.nodes.length;

  return (
    <Box marginTop="200px">
      {relatedPostsLength ? (
        <Heading as="h2" fontSize={24}>
          관련 포스트가 {relatedPostsLength}개 있어요.
        </Heading>
      ) : (
        <Center height="100px" borderRadius="8px" backgroundColor="blue.50">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999Zm-.004 8.25a1 1 0 0 0-.992.885l-.007.116.003 5.502.007.117a1 1 0 0 0 1.987-.002L13 16.75l-.003-5.501-.007-.117a1 1 0 0 0-.994-.882ZM12 6.5a1.251 1.251 0 1 0 0 2.503A1.251 1.251 0 0 0 12 6.5Z"
              fill="#3182ce"
            />
          </svg>
          <Heading as="h2" color="blue.500" fontSize={20}>
            관련 포스트가 없어요.
          </Heading>
        </Center>
      )}
      {
        <Grid mt="20px" templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
          {relatedPosts.nodes.map((post) => (
            <GridItem as="article" key={post?.frontmatter?.slug}>
              <PostCard
                title={post.frontmatter?.title!}
                description={post.frontmatter?.description!}
                slug={post.frontmatter?.slug!}
                thumbnail={post.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                createdAt={post.frontmatter?.createdAt!}
                updatedAt={post.frontmatter?.updatedAt!}
                tags={post.frontmatter?.tags!}
              />
            </GridItem>
          ))}
        </Grid>
      }
    </Box>
  );
};

export default RelatedPosts;
