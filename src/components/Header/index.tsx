import { Box, Spacer, useColorMode } from "@chakra-ui/react";
import React from "react";

import RSS from "../RSS";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import About from "./About";
import Logo from "./Logo";

const Header = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      overflow="hidden"
      as="header"
      position="sticky"
      top="0"
      display="flex"
      paddingLeft={5}
      paddingRight={10}
      columnGap={4}
      zIndex="5"
      alignItems="center"
      width="100%"
      height="70px"
      shadow="md"
      backgroundColor={colorMode === "dark" ? "gray.800" : "white"}
    >
      <Logo />
      <Spacer />
      <About />
      <RSS />
      <ThemeToggler />
    </Box>
  );
};

export default Header;
