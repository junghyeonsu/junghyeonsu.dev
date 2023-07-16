import { Box, Heading, Text } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { parseSyntaxHighlighterClassName } from "../utils/string";
import Callout from "./Callout";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

/* 커스텀 HTML Elements */
const customComponents = {
  h1: (props: Object) => <Heading as="h1" fontSize={36} mt="80px" {...props} />,

  h2: (props: Object) => <Heading as="h2" fontSize={32} mt="80px" mb="40px" {...props} />,

  h3: (props: Object) => <Heading as="h3" fontSize={24} mt="60px" mb="30px" {...props} />,

  h4: (props: Object) => <Heading as="h4" fontSize={20} mt="40px" mb="20px" {...props} />,

  p: (props: Object) => <Text fontSize={16} mt="16px" lineHeight="2" {...props} />,

  li: (props: Object) => (
    <Box
      as="li"
      sx={{
        listStyleType: "none",
        _before: {
          content: '"•"',
          fontSize: "20px",
          color: "gray.300",
          width: "20px",
          display: "inline-block",
        },
      }}
      fontSize={16}
      {...props}
    />
  ),
  ol: (props: Object) => <Box as="ol" fontSize={16} mt="16px" listStylePos="inside" {...props} />,
  ul: (props: Object) => (
    <Box
      as="ul"
      sx={{
        "* > ul": {
          margin: 0,
          marginLeft: "20px",
        },
      }}
      fontSize={16}
      mt="16px"
      listStylePos="inside"
      {...props}
    />
  ),

  a: (props: Object) => (
    <Box
      as="a"
      fontWeight={600}
      target="_blank"
      _hover={{
        textDecoration: "underline",
      }}
      color="blue.400"
      {...props}
    />
  ),

  blockquote: ({ ...props }) => {
    const children = props.children;
    return <Callout>{children}</Callout>;
  },

  code: ({ ...props }) => {
    const { className, children } = props;
    const match = /language-(\w+)/.exec(className || "");

    if (!match) {
      return (
        <Text
          as="code"
          sx={{
            _after: {
              content: '"`"',
            },
            _before: {
              content: '"`"',
            },
            color: "gray.900",
            letterSpacing: "-0.04px",
            fontWeight: "600",
            _dark: {
              color: "gray.50",
            },
          }}
        >
          {children}
        </Text>
      );
    }

    // NOTE: jsx,1-2&4-6,7-8
    const { addLines, removeLines } = parseSyntaxHighlighterClassName(className);

    return (
      <SyntaxHighlighter
        style={vscDarkPlus}
        customStyle={{ margin: "20px 0px" }}
        showLineNumbers
        PreTag="div"
        language={match[1]}
        wrapLines
        lineProps={(lineNumber) => {
          const style = {
            display: "table",
            backgroundColor: "transparent",
            width: "100%",
          };

          if (addLines?.includes(lineNumber)) {
            return { style: { ...style, backgroundColor: "#afa62d30" } };
          }

          if (removeLines?.includes(lineNumber)) {
            return { style: { ...style, backgroundColor: "#5c3232" } };
          }

          return { style };
        }}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },

  Callout,
};

export default function PostLayout({ children }: LayoutProps) {
  return (
    <MDXProvider components={customComponents}>
      <Header />
      <Box
        as="main"
        maxWidth={{ base: "800px", xl: "1100px" }}
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          margin: "50px auto",
          padding: "20px",
          wordBreak: "keep-all",
          overflowWrap: "break-word",
          lineHeight: "1.7",
          letterSpacing: "-0.04px",
        }}
      >
        {children}
      </Box>
      <Footer />
    </MDXProvider>
  );
}
