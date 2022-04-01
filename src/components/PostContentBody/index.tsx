import styled from '@emotion/styled';

interface Props {
  content: string;
}

const Content = styled.article`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    margin-top: 45px;
    margin-bottom: 5px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 22px;
  }

  p {
    font-size: 16px;
  }
`;

const PostContentBody = ({ content }: Props) => {
  return <Content dangerouslySetInnerHTML={{ __html: content }} />;
};

export default PostContentBody;
