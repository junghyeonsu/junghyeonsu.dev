import { Center } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Center as="footer" overflow="hidden" width="100%" height={100} fontSize={12}>
      © {new Date().getFullYear()}. junghyeonsu all rights reserved.
    </Center>
  );
};

export default Footer;
