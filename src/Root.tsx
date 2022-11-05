import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

import theme from "./chakra/theme";
import Footer from "./components/Footer";
import Header from "./components/Header";

interface RootProps {
  children: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      {children}
      <Footer />
    </ChakraProvider>
  );
};

export default Root;
