import { GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import PostBody from '../../components/PostBody';
import markdownToHtml from '../../lib/markdownToHtml';
import PostType from '../../types/post';

interface Props {
  post: PostType;
  preview?: boolean;
}

const Post = ({ post, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    // TODO: 에러 페이지 만들기
    return <div>statusCode 404</div>;
  }

  return (
    <div>
      {/* TODO: 헤더 만들기 */}
      <header>헤더</header>
      {router.isFallback ? (
        // TODO: 로딩 페이지 만들기
        <div>Loading…</div>
      ) : (
        <article>
          <Head>
            <title>{post.title} | junghyeonsu.dev</title>
            <meta property="og:image" content={post.coverImage} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.description} />
            <meta property="og:type" content="website" />
          </Head>
          {/* TODO: 포스트 맨 위의 내용 만들기 */}
          <div>
            post header
            <div>{post.title}</div>
          </div>
          <PostBody content={post.content} />
        </article>
      )}
      {/* TODO: 푸터 만들기 */}
      <footer>푸터</footer>
    </div>
  );
};

export default Post;

interface Params {
  params: {
    slug: string;
  };
}

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

export const getStaticPaths: GetStaticPaths = async () => {
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
};
