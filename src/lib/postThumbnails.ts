import { getCollection } from "astro:content";

type ThumbnailMap = Map<string, string>;
let cachedMap: ThumbnailMap | null = null;

function buildCacheKey(slug: string, locale?: "en"): string {
  return locale ? `${locale}:${slug}` : `ko:${slug}`;
}

export async function getPostThumbnailMap(): Promise<ThumbnailMap> {
  if (cachedMap) return cachedMap;

  const posts = await getCollection("blog");
  const map: ThumbnailMap = new Map();

  for (const post of posts) {
    const locale = post.data.locale;
    const slug = post.data.slug;
    const thumbnailSrc = post.data.thumbnail?.src;

    if (thumbnailSrc) {
      const key = buildCacheKey(slug, locale);
      map.set(key, thumbnailSrc);
    }
  }

  cachedMap = map;
  return map;
}

export async function getPostThumbnailBySlug(
  slug: string,
  locale?: "en",
): Promise<string | undefined> {
  const map = await getPostThumbnailMap();
  const key = buildCacheKey(slug, locale);
  return map.get(key);
}
