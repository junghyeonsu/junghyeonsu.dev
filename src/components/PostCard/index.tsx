import styled from '@emotion/styled';
import Link from 'next/link';
import PostType from '../../types/post';

interface Props {
  post: PostType;
}

const Container = styled.article`
  border: 1px solid black;
  width: 300px;
`;

const PostCard = ({ post }: Props) => {
  const { slug, title, date, coverImage, description } = post;
  return (
    <Container>
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <div>
          <img width="100px" src={coverImage} alt="cover image" />
          <h1>{title}</h1>
          <p>{date}</p>
          <p>{description}</p>
        </div>
      </Link>
    </Container>
  );
};

export default PostCard;
