import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import PostBody from '../../components/PostBody';
import markdownToHtml from '../../lib/markdownToHtml';
import PostType from '../../types/post';

type Props = {
  post: PostType;
  preview?: boolean;
};

const Post = ({ post, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <div>statusCode 404</div>;
  }

  return (
    <div>
      <header>헤더</header>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <article>
          <Head>
            <title>{post.title} | 현수의 블로그</title>
            <meta property="og:image" content={post.ogImage.url} />
          </Head>
          <div>
            post header
            <div>{post.title}</div>
          </div>
          <PostBody content={post.content} />
        </article>
      )}
    </div>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
