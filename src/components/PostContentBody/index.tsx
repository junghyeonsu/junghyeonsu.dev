import { ColorMode, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock';

interface BodyProps {
  content: string;
}

interface ContentProps {
  colorMode: ColorMode;
}

const Content = styled.article<ContentProps>`
  position: relative;
  width: 100%;
  margin-bottom: 100px;

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
    font-size: 30px;
  }

  h2 {
    font-size: 26px;
  }

  h3 {
    font-size: 23px;
  }

  p {
    font-size: 16px;
    margin-top: 28px;

    img {
      margin-bottom: 10px;
    }

    img + em {
      display: block;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      opacity: 0.6;
      margin-bottom: 20px;
    }

    code {
      font-family: 'Noto Sans KR, sans-serif';
      font-weight: 700;
      background: ${props => (props.colorMode === 'dark' ? '' : 'var(--chakra-colors-gray-100)')};
      border-radius: ${props =>
        props.colorMode === 'dark' ? 'var(--chakra-radii-md)' : 'var(--chakra-radii-md)'};
      border-width: 1px 1px 3px;
      padding: 2px;
    }
  }

  blockquote {
    background-color: ${props =>
      props.colorMode === 'dark' ? 'rgba(251, 211, 141, 0.16)' : 'rgb(254, 235, 200)'};
    border-inline-start-width: 4px;
    border-inline-start-color: ${props =>
      props.colorMode === 'dark'
        ? 'var(--chakra-colors-orange-200)'
        : 'var(--chakra-colors-orange-500)'};
    border-radius: 5px;

    p {
      padding: 10px;
    }
  }

  a {
    text-decoration: underline;
    color: #0a91ff;

    :hover {
      color: #0a91ffa6;
    }
  }

  ul,
  ol {
    position: relative;
    left: 10px;
    padding: 10px;
  }

  pre {
    margin: 30px 0px;
  }
`;

const PostContentBody = ({ content }: BodyProps) => {
  const { colorMode } = useColorMode();

  return (
    <Content colorMode={colorMode}>
      <ReactMarkdown components={CodeBlock}>{content}</ReactMarkdown>
    </Content>
  );
};

export default PostContentBody;
