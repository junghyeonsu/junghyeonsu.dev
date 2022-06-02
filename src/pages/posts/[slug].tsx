import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, chakra } from '@chakra-ui/react';

import {
  PostContentBody,
  PostContentTitle,
  PostContentContainer,
  Giscus,
  TableOfContents,
} from '../../components';

import useMediaQuery from '../../hooks/useMediaQuery';
import useReadingTime from '../../hooks/useReadingTime';
import { getAllPosts, getPathBySlug, getPostBySlug } from '../../lib/api';
import { CONTENT_ELEMENTS } from '../../constants';

import type PostType from '../../types/post';

interface Props {
  post: PostType;
}

const Section = chakra(Box, {
  baseStyle: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minHeight: 'calc(100vh - 170px)', // TODO: 바꿔야함 100vh - (2 * header)
  },
});

const Post = ({ post }: Props) => {
  const router = useRouter();
  const mediaQuery = useMediaQuery();
  const { readingTime } = useReadingTime(post.content);

  if (!router.isFallback && !post?.slug) {
    return <div>statusCode 404</div>; // TODO: 에러 페이지 만들기
  }

  if (!mediaQuery) return null;

  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div> // TODO: 로딩 페이지 만들기
      ) : (
        <Section as="section">
          <Head>
            <title>{post.title} | 정현수 기술 블로그</title>
            <meta property="og:site_name" content="정현수 기술 블로그" />

            <meta property="og:image" content={post.coverImage} />
            <meta property="og:title" content={`${post.title} | 정현수 기술 블로그`} />

            <meta name="og:description" content={post.description} />
            <meta name="twitter:description" content={post.description} />

            <meta name="twitter:label1" content="Category" />
            <meta name="twitter:data1" content={`개발 | ${post.category}`} />

            <meta name="twitter:label2" content="Time to read" />
            <meta name="twitter:data2" content={`${readingTime.toString()} minutes`} />

            <meta
              name="article:published_time"
              content={`${post.date.replace(/[/]/g, '-')}T09:00:00.000Z`}
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:image"
              content={`https://junghyeonsu-dev.vercel.app/posts/${post.slug}`}
            />
            <meta
              property="og:url"
              content={`https://junghyeonsu-dev.vercel.app/posts/${post.slug}`}
            />
          </Head>
          <PostContentContainer>
            {mediaQuery?.isLargerThan1400 && <TableOfContents />}
            <PostContentTitle
              title={post.title}
              category={post.category}
              date={post.date}
              coverImage={post.coverImage}
              readingTime={readingTime}
            />
            <PostContentBody content={post.content} />
            <Giscus />
          </PostContentContainer>
        </Section>
      )}
    </>
  );
};

export default Post;

interface Params {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const path = getPathBySlug(params.slug);
  const post = getPostBySlug({ slug: params.slug, path }, CONTENT_ELEMENTS.POST_WITH_CONTENT);
  // const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content: post.content,
      },
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(CONTENT_ELEMENTS.POST_PATHS);

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
