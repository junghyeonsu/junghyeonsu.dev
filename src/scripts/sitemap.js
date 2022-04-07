import fs from 'fs';
import prettier from 'prettier';

const getDate = new Date().toISOString();

const DOMAIN = 'https://junghyeonsu-dev.vercel.app';

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' });

export const generateSiteMap = posts => {
  const postListSitemap = `
    ${posts
      .map(post => {
        return `
          <url>
            <loc>${`${DOMAIN}/posts/${post.slug}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`;
      })
      .join('')}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      <url>
        <loc>${DOMAIN}/</loc>
        <lastmod>${getDate}</lastmod>
      </url>
      ${postListSitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync('public/sitemap.xml', formattedSitemap, 'utf8');
};
