// @refresh reset
import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import React from "react";

import Giscus from "../components/Giscus";
import PostContentTitle from "../components/PostContentTitle";
import PostLayout from "../components/PostLayout";
import Profile from "../components/Profile";
import TableOfContents from "../components/TableOfContents";
import { DOMAIN } from "../constants";
import { fadeInFromLeft } from "../framer-motions";

export const query = graphql`
  query PortfolioPage($id: String!) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
        slug
        title
        description
        createdAt
        updatedAt
        tags
        locale
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
    }
  }
`;

interface PortfolioTemplateProps {
  children: React.ReactNode;
  data: GatsbyTypes.PortfolioPageQuery;
  pageContext: {
    readingTime: {
      minutes: number;
      text: string;
      time: number;
      words: number;
    };
  };
}

const PostTemplate: React.FC<PortfolioTemplateProps> = ({ children, data, pageContext }) => {
  return (
    <PostLayout>
      <motion.article style={{ width: "100%" }} {...fadeInFromLeft}>
        <Flex direction="column" width={{ base: "100%", xl: "800px" }}>
          <PostContentTitle readingTime={pageContext.readingTime.text} post={data.post} />
          <Box marginTop="50px">{children}</Box>
          <Profile />
          <Giscus />
        </Flex>
      </motion.article>
      <motion.div {...fadeInFromLeft}>
        <TableOfContents tableOfContents={data.post?.tableOfContents} />
      </motion.div>
    </PostLayout>
  );
};

export const Head: HeadFC<GatsbyTypes.PortfolioPageQuery> = ({ data }) => {
  const title = `${data.post?.frontmatter?.title!} - 정현수 기술 블로그`;
  const description = data.post?.frontmatter?.description!;
  const ogimage = data.post?.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!;
  const metaLocale = "ko_KR";
  const devCategory = "개발";

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={`${DOMAIN}/${data.post?.frontmatter?.slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={getSrc(ogimage)} />
      <meta property="og:locale" content={metaLocale} />

      {/*  Twitter Meta Tags  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="junghyeonsu.com" />
      <meta property="twitter:url" content={`${DOMAIN}/${data.post?.frontmatter?.slug}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={getSrc(ogimage)}></meta>
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content={`${devCategory}`} />
      <meta
        name="article:published_time"
        content={`${data.post?.frontmatter?.createdAt?.replace(/[/]/g, "-")}T09:00:00.000Z`}
      />
    </>
  );
};
export default PostTemplate;
