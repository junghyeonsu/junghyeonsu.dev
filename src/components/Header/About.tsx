import { Text } from "@chakra-ui/react";

const Introduction = () => {
  return (
    <a href="https://hyeonsu-jung.vercel.app/" target="_blank" rel="noreferrer">
      <Text
        fontSize={14}
        fontStyle="italic"
        fontWeight={800}
        _hover={{
          textDecoration: "underline",
        }}
        padding={1}
        _active={{ bg: "transparent" }}
      >
        About
      </Text>
    </a>
  );
};

export default Introduction;
