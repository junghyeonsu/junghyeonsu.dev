import { Box, Divider, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import React from "react";

import PostCard from "../components/PostCard";
import Tags from "../components/Tags";
import { fadeInFromLeft } from "../framer-motions";

export const query = graphql`
  query IndexPage {
    allPosts: allMdx(sort: { fields: frontmatter___createdAt, order: DESC }) {
      nodes {
        frontmatter {
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          title
          updatedAt
          createdAt
          description
          slug
          tags
        }
      }
    }
    ogimage: imageSharp(fluid: { originalName: { eq: "og-image.png" } }) {
      original {
        height
        src
        width
      }
    }
  }
`;

interface IndexPageProps {
  data: GatsbyTypes.IndexPageQuery;
}

const IndexPage = ({ data }: IndexPageProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxWidth={800}
      margin="auto"
    >
      <Tags currentTag="all" />
      <Divider orientation="horizontal" marginTop="20px" />
      <motion.div {...fadeInFromLeft}>
        <Grid
          as="section"
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          margin={{ base: "20px", md: "20px 0px" }}
          gap={6}
        >
          {data.allPosts.nodes.map((node) => (
            <GridItem key={node.frontmatter?.slug} as="article">
              <PostCard
                title={node.frontmatter?.title!}
                description={node.frontmatter?.description!}
                slug={node.frontmatter?.slug!}
                thumbnail={node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                createdAt={node.frontmatter?.createdAt!}
                updatedAt={node.frontmatter?.updatedAt!}
                tags={node.frontmatter?.tags!}
              />
            </GridItem>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => {
  return (
    <>
      <title>Home Page</title>
    </>
  );
};
