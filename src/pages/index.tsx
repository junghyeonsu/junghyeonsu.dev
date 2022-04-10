import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import { PostCard } from '../components';

import type Post from '../types/post';

import { CONTENT_ELEMENTS } from '../constants';
import { getAllPosts } from '../lib/api';
import { generateRssFeed } from '../scripts/rss';
import { generateSiteMap } from '../scripts/sitemap';
import useBreakPoint from '../hooks/useBreakPoint';

interface Props {
  allPosts: Post[];
}

const IndexPage = ({ allPosts }: Props) => {
  const isLargerThan900 = useBreakPoint();

  return (
    <>
      <Head>
        <title>정현수 기술 블로그</title>
        <meta property="og:image" content="/profile.jpeg" />
        <meta property="og:title" content="정현수 기술 블로그" />
        <meta property="og:description" content="정현수의 기술 블로그입니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://junghyeonsu-dev.vercel.app" />
      </Head>
      <Box width="100%" display="flex" justifyContent="center">
        <Box
          as="section"
          marginTop="50px"
          marginBottom="50px"
          width={isLargerThan900 ? '840px' : '80vw'}
          display="flex"
          flexWrap="wrap"
        >
          {allPosts.map((post, index) => (
            <PostCard key={`post${index}-${post.title}`} post={post} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts(CONTENT_ELEMENTS.POST_CARD);
  generateRssFeed(allPosts);
  generateSiteMap(allPosts);

  return {
    props: { allPosts },
  };
};
