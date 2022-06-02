import { useState } from 'react';
import { GetStaticProps } from 'next';
import { Box, Divider } from '@chakra-ui/react';

import { PostCard, CategoryChangeButton, CustomHead } from '../components';

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

  if (!mediaQuery) return null;

  return (
    <>
      <CustomHead type="main" />
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
          width={mediaQuery.isLargerThan900 ? '840px' : '90vw'}
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
        <Divider width={mediaQuery.isLargerThan900 ? '840px' : '90vw'} margin="20px" />
        <Box
          as="section"
          marginBottom="50px"
          width={mediaQuery.isLargerThan900 ? '880px' : '90vw'}
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
