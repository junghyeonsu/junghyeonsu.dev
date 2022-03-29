import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { PostCard } from '../components';
import { CONTENT_ELEMENTS } from '../constants';
import { getAllPosts } from '../lib/api';
import Post from '../types/post';

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
