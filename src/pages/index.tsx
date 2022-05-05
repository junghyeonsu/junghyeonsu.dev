import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Box, Divider } from '@chakra-ui/react';

import { PostCard, CategoryChangeButton } from '../components';

import type Post from '../types/post';

import { CONTENT_ELEMENTS } from '../constants';
import { getAllPosts } from '../lib/api';
import { generateRssFeed } from '../scripts/rss';
import { generateSiteMap } from '../scripts/sitemap';
import useMediaQuery from '../hooks/useMediaQuery';

interface Props {
  allPosts: Post[];
  categoies: string[];
}

const IndexPage = ({ allPosts, categoies }: Props) => {
  const [currentCategory, setCurrentCategory] = useState('전체');
  const mediaQuery = useMediaQuery();

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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
      >
        <Box
          display="flex"
          flexWrap="wrap"
          columnGap="10px"
          rowGap="10px"
          width={mediaQuery?.isLargerThan900 ? '840px' : '90vw'}
          marginTop="20px"
          as="nav"
        >
          <CategoryChangeButton
            category="전체"
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
          {categoies.map(category => (
            <CategoryChangeButton
              key={category}
              category={category}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          ))}
        </Box>
        <Divider width={mediaQuery?.isLargerThan900 ? '840px' : '90vw'} margin="20px" />
        <Box
          as="section"
          marginBottom="50px"
          width={mediaQuery?.isLargerThan900 ? '880px' : '90vw'}
          display="flex"
          flexWrap="wrap"
        >
          {allPosts.map(
            (post, index) =>
              (currentCategory === '전체' || post.category === currentCategory) && (
                <PostCard key={`post${index}-${post.title}`} post={post} />
              ),
          )}
        </Box>
      </Box>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts(CONTENT_ELEMENTS.POST_CARD);
  const categoies = Array.from(new Set(allPosts.map(post => post.category)));

  generateRssFeed(allPosts);
  generateSiteMap(allPosts);

  return {
    props: { allPosts, categoies },
  };
};
