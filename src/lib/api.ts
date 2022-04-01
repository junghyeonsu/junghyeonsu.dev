import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const paths = ['posts', 'retrospects'];

interface PostSlugWithPath {
  slug: string;
  path: string;
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
  // return fs.readdirSync(postsDirectory);
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

  interface Items {
    [key: string]: string;
  }

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
