import type { BoxProps, ComponentDefaultProps, HeadingProps, TextProps } from "@chakra-ui/react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { parseSyntaxHighlighterClassName } from "../../utils/string";
import Callout from "./Callout";
import { InternalLink } from "./InternalLink";
import YouTubePlayer from "./YouTubePlayer";

/* 커스텀 HTML Elements */
const customComponents = {
  h1: (props: HeadingProps) => <Heading as="h1" fontSize={36} mt="80px" {...props} />,

  h2: (props: HeadingProps) => <Heading as="h2" fontSize={32} mt="80px" mb="40px" {...props} />,

  h3: (props: HeadingProps) => <Heading as="h3" fontSize={24} mt="60px" mb="30px" {...props} />,

  h4: (props: HeadingProps) => <Heading as="h4" fontSize={20} mt="40px" mb="20px" {...props} />,

  p: (props: TextProps) => <Text fontSize={16} mt="16px" lineHeight="2" {...props} />,

  li: (props: BoxProps) => (
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
  ol: (props: BoxProps) => <Box as="ol" fontSize={16} mt="16px" listStylePos="inside" {...props} />,
  ul: (props: BoxProps) => (
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

  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const ariaHidden = props["aria-hidden"];
    const isInternalLink = props.href?.startsWith("/");
    const href = props.href;

    if (!href) return <a {...props} />;

    if (isInternalLink) {
      return <InternalLink to={href}>{props.children}</InternalLink>;
    }

    return (
      <Box
        as="span"
        _hover={{
          textDecoration: "underline",
        }}
      >
        <a
          style={{
            fontWeight: 600,
            color: "var(--chakra-colors-blue-400)",
          }}
          target={!ariaHidden ? "_blank" : undefined}
          {...props}
        />
      </Box>
    );
  },

  img: (props: { src: string; alt: string }) => {
    const isGif = props.src?.includes(".gif");
    const { src, alt } = props;
    if (isGif) {
      return (
        <Box margin="25px 0px" maxWidth="800px">
          <img src={src} alt={alt} />
          <Text
            as="figcaption"
            fontSize="14px"
            textAlign="center"
            marginTop="16px"
            color="gray.500"
          >
            {alt}
          </Text>
        </Box>
      );
    }
  },

  blockquote: (props: ComponentDefaultProps) => {
    const children = props.children;
    return <Callout>{children}</Callout>;
  },

  // NOTE: match하면 code block, match하지 않으면 inline code
  code: (props: ComponentDefaultProps) => {
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
        customStyle={{ margin: "20px 0px", borderRadius: "20px" }}
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
  YouTubePlayer,
};

export default function ({ children }: PropsWithChildren) {
  return <MDXProvider components={customComponents as any}>{children}</MDXProvider>;
}
