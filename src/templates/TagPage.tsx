import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";

import MainLayout from "../components/MainLayout";
import Pagenation from "../components/Pagenation";
import PostGrid from "../components/PostGrid";
import Profile from "../components/Profile";
import Tags from "../components/Tags";
import { DOMAIN } from "../constants";

export const query = graphql`
  query TagPageTemplate($tag: String!, $limit: Int, $skip: Int) {
    allMdx(
      sort: { frontmatter: { createdAt: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
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

      pageInfo {
        currentPage
        pageCount
      }
    }
    ogimage: imageSharp(fluid: { originalName: { eq: "og-image.png" } }) {
      gatsbyImageData
    }

    profileImage: imageSharp(fluid: { originalName: { eq: "profile.png" } }) {
      gatsbyImageData
    }
  }
`;

interface TagsProps {
  pageContext: {
    tag: string;
  };
  data: GatsbyTypes.TagPageTemplateQuery;
}

export default function TagsTemplate({ pageContext, data }: TagsProps) {
  const currentPage = data.allMdx.pageInfo.currentPage;
  const pageCount = data.allMdx.pageInfo.pageCount;
  return (
    <MainLayout>
      <Profile />
      <Tags currentTag={pageContext.tag} />
      <PostGrid posts={data.allMdx.nodes} />
      {pageCount > 1 && <Pagenation currentPage={currentPage} pageCount={pageCount} />}
    </MainLayout>
  );
}

export const Head: HeadFC<Queries.TagPageTemplateQuery, TagsProps["pageContext"]> = ({
  data,
  pageContext,
}) => {
  const ogimage = data.ogimage?.gatsbyImageData!;
  const description = "웹 프론트엔드 개발자 정현수입니다.";
  const title = "정현수 기술 블로그";
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
      <meta property="og:url" content={DOMAIN} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={getSrc(ogimage)} />
      {/*  Twitter Meta Tags  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="junghyeonsu.com" />
      <meta property="twitter:url" content={DOMAIN} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={getSrc(ogimage)} />
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content="개발" />
    </>
  );
};
