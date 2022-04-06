import { GetStaticProps } from 'next';
import { Box } from '@chakra-ui/react';

import { PostCard } from '../components';

import type Post from '../types/post';

import { CONTENT_ELEMENTS } from '../constants';
import { getAllPosts } from '../lib/api';
import { generateRssFeed } from '../lib/generateRssFeed';
import useBreakPoint from '../hooks/useBreakPoint';

interface Props {
  allPosts: Post[];
}

const IndexPage = ({ allPosts }: Props) => {
  const isLargerThan900 = useBreakPoint();

  return (
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
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  generateRssFeed();
  const allPosts = getAllPosts(CONTENT_ELEMENTS.POST_CARD);

  return {
    props: { allPosts },
  };
};
