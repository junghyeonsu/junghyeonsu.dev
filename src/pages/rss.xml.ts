import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { DOMAIN } from "@/constants";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.locale);

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.data.createdAt.replace(/\//g, "-"));
    const dateB = new Date(b.data.createdAt.replace(/\//g, "-"));
    return dateB.getTime() - dateA.getTime();
  });

  return rss({
    title: "정현수 블로그",
    description: "프론트엔드 엔지니어 정현수입니다.",
    site: context.site || DOMAIN,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.createdAt.replace(/\//g, "-")),
      description: post.data.description,
      link: `/posts/${post.data.slug}/`,
    })),
    customData: `<language>ko</language>`,
  });
}
