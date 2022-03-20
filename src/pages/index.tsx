import { GetStaticProps } from 'next';
import { PostCard } from '../components';
import { getAllPosts } from '../lib/api';
import Post from '../types/post';

interface Props {
  allPosts: Post[];
}

const IndexPage = ({ allPosts }: Props) => {
  return (
    <>
      {allPosts.map(post => (
        <PostCard post={post} />
      ))}
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
};
