import Link from 'next/link';
import { getAllPosts } from '../lib/api';
import Post from '../types/post';

interface Props {
  allPosts: Post[];
}

const IndexPage = ({ allPosts }: Props) => {
  const { title, slug, date, author, coverImage } = allPosts[0];

  return (
    <>
      {/* TODO: 포스트들 보여줄 컴포넌트 작성하기  */}
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <div>
          <img style={{ width: '100px', height: '100px', objectFit: 'contain' }} src={coverImage} />
          <h1>{title}</h1>
          <p>{date}</p>
          <p>{author.name}</p>
        </div>
      </Link>
    </>
  );
};

export default IndexPage;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
};
