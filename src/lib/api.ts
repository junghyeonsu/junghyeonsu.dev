import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// TODO: 자동화 할 수는 없을까? : 폴더 읽는 라이브러리 있었는데 그거 잘 사용하면 되지 않을까?
// NOTE: 블로그 포스팅 폴더 생길 때 마다 추가해줘야 함.
const paths = ['retrospects', 'computer-science'];

interface PostSlugWithPath {
  slug: string;
  path: string;
}

export interface Items {
  [key: string]: string;
}

export function getPostSlugs() {
  const postSlugsWithPath: PostSlugWithPath[] = [];
  paths.forEach(path => {
    const directory = join(process.cwd(), `_posts/${path}`);
    fs.readdirSync(directory).forEach(slug => {
      postSlugsWithPath.push({ slug, path });
    });
  });
  return postSlugsWithPath;
}

export function getPathBySlug(slug: string): string {
  const slugs = getPostSlugs();
  const removeMd = slugs.map(obj => {
    const removeMdSlug = obj.slug.split('.md')[0];
    return { slug: removeMdSlug, path: obj.path };
  });
  let path = '';
  removeMd.forEach(obj => {
    if (obj.slug === slug) path = obj.path;
  });

  return path;
}

export function getPostBySlug(slugWithPath: PostSlugWithPath, fields: string[] = []) {
  const realSlug = slugWithPath.slug.replace(/\.md$/, '');
  const directory = join(process.cwd(), `_posts/${slugWithPath.path}`);
  const fullPath = join(directory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'path') {
      items[field] = slugWithPath.path;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();

  const posts = slugs
    .map(slugWithPath => getPostBySlug(slugWithPath, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
