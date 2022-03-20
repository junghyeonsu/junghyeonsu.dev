import styled from '@emotion/styled';
import Link from 'next/link';
import PostType from '../types/post';

interface Props {
  post: PostType;
}

const Container = styled.div``;

const PostCard = ({ post }: Props) => {
  const { slug, title, date, author, coverImage } = post;
  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <div>
        <img style={{ width: '100px', height: '100px', objectFit: 'contain' }} src={coverImage} />
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{author.name}</p>
      </div>
    </Link>
  );
};

export default PostCard;
