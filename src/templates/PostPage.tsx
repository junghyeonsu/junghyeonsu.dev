import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import React from "react";

import Giscus from "../components/Giscus";
import PostContentTitle from "../components/PostContentTitle";
import PostLayout from "../components/PostLayout";
import RelatedPosts from "../components/RelatedPosts";
import TableOfContents from "../components/TableOfContents";
import { DOMAIN } from "../constants";
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
      sort: { frontmatter: { createdAt: DESC } }
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
      <motion.article style={{ width: "100%" }} {...fadeInFromLeft}>
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

export const Head: HeadFC<Queries.PostPageQuery> = ({ data }) => {
  const title = `${data.post?.frontmatter?.title!} - 정현수 기술 블로그`;
  const description = data.post?.frontmatter?.description!;
  const ogimage = data.post?.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!;

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={`${DOMAIN}/posts/${data.post?.frontmatter?.tags}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={getSrc(ogimage)} />

      {/*  Twitter Meta Tags  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="junghyeonsu.com" />
      <meta property="twitter:url" content={`${DOMAIN}/posts/${data.post?.frontmatter?.slug}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={getSrc(ogimage)}></meta>
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content={`개발 | ${data.post?.frontmatter?.tags![0]}`} />
      <meta
        name="article:published_time"
        content={`${data.post?.frontmatter?.createdAt?.replace(/[/]/g, "-")}T09:00:00.000Z`}
      />
    </>
  );
};
export default PostTemplate;
