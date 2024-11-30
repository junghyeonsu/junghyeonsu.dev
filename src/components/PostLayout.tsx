import { Box } from "@chakra-ui/react";
import React from "react";

import Footer from "./Footer";
import Header from "./header/Header";
import MDXProvider from "./mdx/MDXProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: LayoutProps) {
  return (
    <MDXProvider>
      <Header />
      <Box
        key={`${children}`}
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
