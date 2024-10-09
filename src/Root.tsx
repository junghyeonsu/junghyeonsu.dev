import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

import theme from "./chakra/theme";
import MousePointerContainer from "./components/MousePointer";

interface RootProps {
  children: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <MousePointerContainer />
      {children}
    </ChakraProvider>
  );
};

export default Root;
