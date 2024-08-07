import { Box, Text, Tooltip } from "@chakra-ui/react";
import { Link } from "gatsby";

const Portfoilo = () => {
  return (
    <Link to="/portfolio">
      <Box pos="relative">
        <Text
          pos="absolute"
          fontStyle="italic"
          whiteSpace="nowrap"
          top="-10px"
          left="-10px"
          fontSize={10}
          fontWeight={800}
        >
          {/* 내일까지는 꼭 */}
          {`${new Date().getMonth() + 1}월 안에는 꼭...`}
        </Text>
        <Tooltip label="Coming Soon!">
          <Text
            as="del"
            fontSize={14}
            fontStyle="italic"
            fontWeight={800}
            padding={1}
            _active={{ bg: "transparent" }}
          >
            Portfolio
          </Text>
        </Tooltip>
      </Box>
    </Link>
  );
};

export default Portfoilo;
