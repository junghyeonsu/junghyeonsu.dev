import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import React from "react";

import Giscus from "../components/Giscus";
import PostContentTitle from "../components/PostContentTitle";
import PostLayout from "../components/PostLayout";
import RelatedPosts from "../components/RelatedPosts";
import TableOfContents from "../components/TableOfContents";
import { fadeInFromLeft } from "../framer-motions";

export const query = graphql`
  query PostPage($id: String!, $tags: [String!]!) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
        slug
        title
        description
        tags
        createdAt
        updatedAt
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
    }
    relatedPosts: allMdx(
      filter: { frontmatter: { tags: { in: $tags } }, id: { ne: $id } }
      sort: { fields: frontmatter___createdAt, order: DESC }
      limit: 4
    ) {
      nodes {
        frontmatter {
          slug
          title
          description
          tags
          createdAt
          updatedAt
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`;

interface PostTemplateProps {
  children: React.ReactNode;
  data: GatsbyTypes.PostPageQuery;
  pageContext: {
    readingTime: {
      minutes: number;
      text: string;
      time: number;
      words: number;
    };
  };
}

const PostTemplate: React.FC<PostTemplateProps> = ({ children, data, pageContext }) => {
  return (
    <PostLayout>
      <motion.article {...fadeInFromLeft}>
        <Flex direction="column" width={{ base: "100%", xl: "800px" }}>
          <PostContentTitle readingTime={pageContext.readingTime.text} post={data.post} />
          <Box marginTop="50px">{children}</Box>
          <RelatedPosts relatedPosts={data.relatedPosts} />
          <Giscus />
        </Flex>
      </motion.article>
      <motion.div {...fadeInFromLeft}>
        <TableOfContents tableOfContents={data.post?.tableOfContents} />
      </motion.div>
    </PostLayout>
  );
};

export const Head: HeadFC = () => <title>Component page</title>;

export default PostTemplate;
