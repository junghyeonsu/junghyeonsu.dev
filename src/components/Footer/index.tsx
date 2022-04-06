import { Center } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Center as="footer" overflow="hidden" width="100%" height={100} fontSize={12}>
      Copyright {new Date().getFullYear()}. junghyeonsu all rights reserved.
    </Center>
  );
};

export default Footer;
