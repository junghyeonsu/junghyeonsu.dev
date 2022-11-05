import { Button, useColorMode } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";

const Logo = () => {
  const { colorMode } = useColorMode();
  return (
    <Link to="/">
      <Button
        variant="unstyled"
        fontSize={14}
        _hover={{
          bg: colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200",
        }}
        padding={1}
        _active={{ bg: "transparent" }}
      >
        junghyeonsu.dev
      </Button>
    </Link>
  );
};

export default Logo;
