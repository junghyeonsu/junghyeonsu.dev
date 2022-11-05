import { Box, Divider, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import React from "react";

import PostCard from "../components/PostCard";
import Tags from "../components/Tags";
import { fadeInFromTop } from "../framer-motions";

export const query = graphql`
  query TagsPage($tag: String!) {
    allMdx(
      sort: { fields: frontmatter___createdAt, order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
      gatsbyImageData
    }
  }
`;

interface TagsProps {
  pageContext: {
    tag: string;
  };
  data: GatsbyTypes.TagsPageQuery;
}

export default function TagsTemplate({ pageContext, data }: TagsProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxWidth={800}
      margin="auto"
    >
      <Tags currentTag={pageContext.tag} />
      <Divider orientation="horizontal" marginTop="20px" />

      <Grid
        as="section"
        margin={{ base: "20px", md: "20px 0px" }}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        {data.allMdx.nodes.map((node, index) => (
          <motion.div {...fadeInFromTop} transition={{ delay: 0.2 + 0.1 * index }}>
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
          </motion.div>
        ))}
      </Grid>
    </Box>
  );
}

export const Head: HeadFC<Queries.IndexPageQuery, TagsProps["pageContext"]> = ({
  data,
  pageContext,
}) => {
  const ogimage = data.ogimage?.gatsbyImageData!;
  const description = "웹 프론트엔드 개발자 정현수입니다.";
  const title = "정현수 기술 블로그";
  const domain = "https://junghyeonsu-dev.vercel.app";
  const tag = pageContext.tag;

  return (
    <>
      {/* HTML Meta Tags */}
      <title>
        {title} - {tag}
      </title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Facebook Meta Tags */}
      <meta property="og:url" content={domain} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={getSrc(ogimage)} />
      {/*  Twitter Meta Tags  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="junghyeonsu-dev.vercel.app" />
      <meta property="twitter:url" content={domain} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={getSrc(ogimage)} />
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content="개발" />
    </>
  );
};
