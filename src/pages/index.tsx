import styled from '@emotion/styled';
import { GetStaticProps } from 'next';

import { PostCard } from '../components';

import type Post from '../types/post';

import { CONTENT_ELEMENTS } from '../constants';
import { getAllPosts } from '../lib/api';

interface Props {
  allPosts: Post[];
}

const Contents = styled.section`
  display: flex;
  flex-direction: column;
`;

const IndexPage = ({ allPosts }: Props) => (
  <Contents>
    {allPosts.map((post, index) => (
      <PostCard key={`post${index}-${post.title}`} post={post} />
    ))}
  </Contents>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts(CONTENT_ELEMENTS.POST_CARD);

  return {
    props: { allPosts },
  };
};
