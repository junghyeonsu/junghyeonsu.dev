import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { PostCard } from '../components';
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
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
};
