import styled from '@emotion/styled';

interface Props {
  content: string;
}

const Content = styled.div`
  p {
    font-size: 16px;
  }

  h2 {
    font-size: 24px;
    color: red;
  }
`;

const PostBody = ({ content }: Props) => {
  return <Content dangerouslySetInnerHTML={{ __html: content }} />;
};

export default PostBody;
