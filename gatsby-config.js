const path = require(`path`);

const SITE_METADATA = Object.freeze({
  title: "정현수의 기술 블로그",
  description: "주니어 프론트엔드 개발자 정현수의 기술 블로그입니다.",
  siteUrl: process.env.URL || "https://junghyeonsu-dev.vercel.app",
});

const wrapESMPlugin = (name) =>
  function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name);
      const plugin = mod.default(opts);
      return plugin(...args);
    };
  };

module.exports = {
  siteMetadata: SITE_METADATA,
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              wrapperStyle: `margin: 25px 0px, z-index: 0`,
              showCaptions: true,
            },
          },
        ],
        mdxOptions: {
          rehypePlugins: [
            [wrapESMPlugin(`rehype-slug`)],
            [
              wrapESMPlugin(`rehype-autolink-headings`),
              {
                behavior: "append",
                content: {
                  type: `element`,
                  tagName: `span`,
                  properties: { className: `heading-anchor-icon` },
                  children: [
                    {
                      type: `text`,
                      value: `#`,
                    },
                  ],
                },
              },
            ],
          ],
        },
      },
    },
    "gatsby-plugin-mdx-frontmatter",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: path.resolve(__dirname, "./content"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `categories`,
        path: path.resolve(__dirname, "./content/"),
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        outputPath: `src/__generated__/gatsby-types.d.ts`,
        emitSchema: {
          "src/__generated__/gatsby-schema.graphql": true,
        },
      },
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Pretendard"],
          urls: [
            "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css",
          ],
        },
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  description: node.frontmatter.description,
                  pubDate: node.frontmatter.createdAt,
                  url: site.siteMetadata.siteUrl + node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + node.frontmatter.slug,
                  custom_elements: [{ "content:encoded": node.body }],
                });
              });
            },
            query: `
              {
                allMdx(sort: {fields: frontmatter___createdAt, order: DESC}) {
                  nodes {
                    frontmatter {
                      title
                      createdAt
                      description
                      slug
                    }
                    body
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Junghyeonsu blog's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-6P098S0HE9",
        head: true,
      },
    },
  ],
};
