import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Box, chakra } from '@chakra-ui/react';

import {
  PostContentBody,
  PostContentTitle,
  PostContentContainer,
  Giscus,
  TableOfContents,
  CustomHead,
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

  if (!mediaQuery) return <CustomHead post={post} type="posting" />;

  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div> // TODO: 로딩 페이지 만들기
      ) : (
        <Section as="section">
          <CustomHead post={post} type="posting" />
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
