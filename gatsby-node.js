const path = require("path");
const readingTime = require(`reading-time`);

const postTemplate = path.resolve(`./src/templates/post.tsx`);
const tagsTemplate = path.resolve(`./src/templates/tags.tsx`);

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allPosts: allMdx {
        nodes {
          id
          body
          frontmatter {
            slug
            tags
          }
          internal {
            contentFilePath
          }
        }
      }

      allTags: allMdx {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `);

  // 모든 포스트 페이지 생성
  result.data.allPosts.nodes.forEach((node) => {
    createPage({
      path: `/posts/${node.frontmatter.slug}`,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        tags: node.frontmatter.tags,
        id: node.id,
        readingTime: readingTime(node.body),
      },
    });
  });

  // 태그 페이지 생성
  result.data.allTags.group.forEach(({ tag }) => {
    createPage({
      path: `/tags/${tag}`,
      component: tagsTemplate,
      context: {
        tag,
      },
    });
  });
};
