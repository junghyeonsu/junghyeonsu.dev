import { Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";

const Logo = () => {
  return (
    <Link to="/">
      <Text
        fontSize={24}
        fontWeight="700"
        letterSpacing="-0.3px"
        fontStyle="italic"
        _hover={{
          textDecoration: "underline",
        }}
        padding={1}
        _active={{ bg: "transparent" }}
      >
        June.
      </Text>
    </Link>
  );
};

export default Logo;
