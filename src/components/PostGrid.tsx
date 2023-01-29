import { Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { fadeInFromLeft } from "../framer-motions";
import PostCard from "./PostCard";

interface PostGridProps {
  posts: GatsbyTypes.AllPostPageTemplateQuery["allMdx"]["nodes"];
}

const PostGrid = ({ posts }: PostGridProps) => {
  return (
    <motion.div {...fadeInFromLeft}>
      <Grid
        as="section"
        templateColumns={{ lg: "repeat(12, 1fr)" }}
        maxWidth={{ base: "95%", md: "600px", lg: "100%" }}
        margin={{ base: "40px auto", md: "40px 0px" }}
        gap={6}
      >
        {posts.map((posts, index) => {
          const cardData = {
            title: posts.frontmatter?.title!,
            description: posts.frontmatter?.description!,
            slug: posts.frontmatter?.slug!,
            thumbnail: posts.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!,
            createdAt: posts.frontmatter?.createdAt!,
            updatedAt: posts.frontmatter?.updatedAt!,
            tags: posts.frontmatter?.tags!,
          };

          if (index % 4 === 0) {
            return (
              <GridItem colSpan={{ lg: 7 }} key={posts.frontmatter?.slug} as="article">
                <PostCard {...cardData} />
              </GridItem>
            );
          }

          if (index % 4 === 1) {
            return (
              <GridItem colSpan={{ lg: 5 }} key={posts.frontmatter?.slug} as="article">
                <PostCard {...cardData} />
              </GridItem>
            );
          }

          if (index % 4 === 2) {
            return (
              <GridItem colSpan={{ lg: 5 }} key={posts.frontmatter?.slug} as="article">
                <PostCard {...cardData} />
              </GridItem>
            );
          }

          if (index % 4 === 3) {
            return (
              <GridItem colSpan={{ lg: 7 }} key={posts.frontmatter?.slug} as="article">
                <PostCard {...cardData} />
              </GridItem>
            );
          }
        })}
      </Grid>
    </motion.div>
  );
};

export default PostGrid;
