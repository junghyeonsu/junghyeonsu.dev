import { Center, Flex } from "@chakra-ui/react";
import { Link } from "gatsby";

interface PagenationProps {
  pageCount: number;
  currentPage: number;
}

const Pagenation = ({ pageCount, currentPage }: PagenationProps) => {
  return (
    <Flex gap="10px">
      {Array.from({ length: pageCount }).map((_, i) => (
        <Link key={i} to={i === 0 ? "/" : `/${i + 1}`}>
          <Center
            width="30px"
            height="30px"
            borderRadius="50%"
            fontWeight="bold"
            border={i + 1 === currentPage ? "2px solid" : "none"}
            _hover={{
              backgroundColor: "gray.50",
            }}
          >
            {i + 1}
          </Center>
        </Link>
      ))}
    </Flex>
  );
};

export default Pagenation;
