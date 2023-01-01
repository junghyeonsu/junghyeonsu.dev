import { Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

import { fadeInFromLeft } from "../framer-motions";
import MainPostCard from "./MainPostCard";
import PostCard from "./PostCard";

interface PostGridProps {
  posts: GatsbyTypes.AllPostPageTemplateQuery["allMdx"]["nodes"];
}

const PostGrid = ({ posts }: PostGridProps) => {
  return (
    <motion.div {...fadeInFromLeft}>
      <Grid
        as="section"
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        margin={{ base: "40px 10px", md: "40px 0px" }}
        gap={6}
      >
        {posts.map((posts, index) => {
          if (index === 0) {
            return (
              <GridItem key={posts.frontmatter?.slug} as="article">
                <MainPostCard
                  title={posts.frontmatter?.title!}
                  description={posts.frontmatter?.description!}
                  slug={posts.frontmatter?.slug!}
                  thumbnail={posts.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                  createdAt={posts.frontmatter?.createdAt!}
                  updatedAt={posts.frontmatter?.updatedAt!}
                  tags={posts.frontmatter?.tags!}
                />
              </GridItem>
            );
          }

          return (
            <GridItem key={posts.frontmatter?.slug} as="article">
              <PostCard
                title={posts.frontmatter?.title!}
                description={posts.frontmatter?.description!}
                slug={posts.frontmatter?.slug!}
                thumbnail={posts.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                createdAt={posts.frontmatter?.createdAt!}
                updatedAt={posts.frontmatter?.updatedAt!}
                tags={posts.frontmatter?.tags!}
              />
            </GridItem>
          );
        })}
      </Grid>
    </motion.div>
  );
};

export default PostGrid;
