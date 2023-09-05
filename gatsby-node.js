const path = require("path");
const readingTime = require(`reading-time`);

const PostPageTemplate = path.resolve(`./src/templates/PostPage.tsx`);
const TagPageTemplate = path.resolve(`./src/templates/TagPage.tsx`);
const PortfolioPageTemplate = path.resolve(`./src/templates/PortfolioPage.tsx`);
const AllPostPageTemplate = path.resolve(`./src/templates/AllPostPage.tsx`);

exports.onCreateWebpackConfig = ({ actions, plugins, reporter }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.provide({
        React: "react",
      }),
    ],
  });

  reporter.info(`Provided React in all files`);
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allPosts: allMdx(filter: { frontmatter: { title: { nin: "정현수 포트폴리오" } } }) {
        nodes {
          id
          body
          frontmatter {
            slug
            tags
            locale
          }
          internal {
            contentFilePath
          }
        }
      }

      allTags: allMdx {
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          nodes {
            id
          }
        }
      }

      portfolio: mdx(frontmatter: { title: { eq: "정현수 포트폴리오" } }) {
        id
        body
        frontmatter {
          slug
        }
        internal {
          contentFilePath
        }
      }
    }
  `);

  // TODO: 현재 문제점
  // 메인(pages/index.tsx) 페이지랑 태그 템플릿 페이지가 역할이 겹침
  // tags/all-posts로 만들고
  // 메인 페이지는 진짜 메인 느낌나도록 따로 만들까 고민중

  const POST_PER_PAGE = 10;

  // ALL POSTS 페이지네이션 생성
  const posts = result.data.allPosts.nodes;
  // ko로 작성된 혹은 locale이 없는 포스트만 뽑아서 페이지네이션 해줘야 함
  const koPosts = posts.filter((post) => !post.frontmatter.locale);

  const allPostsNumPages = Math.ceil(koPosts.length / POST_PER_PAGE);
  Array.from({ length: allPostsNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: AllPostPageTemplate,
      context: {
        limit: POST_PER_PAGE,
        skip: i * POST_PER_PAGE,
        numPages: allPostsNumPages,
        currentPage: i + 1,
      },
    });
  });

  // Tags 페이지네이션 생성
  const tags = result.data.allTags.group;
  tags.forEach(({ tag, nodes }) => {
    const allTagsNumPages = Math.ceil(nodes.length / POST_PER_PAGE);

    // 각 태그별로 페이지네이션 해줘야 함
    Array.from({ length: allTagsNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tags/${tag}` : `/tags/${tag}/${i + 1}`,
        component: TagPageTemplate,
        context: {
          limit: POST_PER_PAGE,
          skip: i * POST_PER_PAGE,
          numPages: allTagsNumPages,
          currentPage: i + 1,
          tag,
        },
      });
    });
  });

  // 모든 포스트 페이지 생성
  result.data.allPosts.nodes.forEach((node) => {
    const locale = node.frontmatter.locale;
    const path = !locale
      ? `/posts/${node.frontmatter.slug}`
      : `/${locale}/posts/${node.frontmatter.slug}`;

    createPage({
      path,
      component: `${PostPageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        tags: node.frontmatter.tags,
        slug: node.frontmatter.slug,
        id: node.id,
        readingTime: readingTime(node.body),
      },
    });
  });

  // 포트폴리오 페이지 생성
  const portfolio = result.data.portfolio;

  createPage({
    path: `/portfolio`,
    component: `${PortfolioPageTemplate}?__contentFilePath=${portfolio.internal.contentFilePath}`,
    context: {
      slug: portfolio.frontmatter.slug,
      id: portfolio.id,
      readingTime: readingTime(result.data.portfolio.body),
    },
  });
};
