import { Flex } from "@chakra-ui/react";
import ReactPlayer, { type ReactPlayerProps } from "react-player";

export default function YouTubePlayer(props: ReactPlayerProps) {
  return (
    <Flex justifyContent="center" my={12}>
      <ReactPlayer style={{ borderRadius: "20px", overflow: "hidden" }} controls pip {...props} />
    </Flex>
  );
}
