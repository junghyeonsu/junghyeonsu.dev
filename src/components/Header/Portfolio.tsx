import { Text, Tooltip } from "@chakra-ui/react";
import { Link } from "gatsby";

const Portfoilo = () => {
  return (
    <Link to="/portfolio">
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
    </Link>
  );
};

export default Portfoilo;
