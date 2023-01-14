import { Box, Center, Flex, Text, Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { IGatsbyImageData } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";

interface ProfileProps {
  image: IGatsbyImageData;
}

interface IconBoxProps {
  children: React.ReactNode;
  isManaged?: boolean;
}

const IconBox = ({ children, isManaged = false }: IconBoxProps) => {
  return (
    <Center
      w="26px"
      h="26px"
      borderRadius="50%"
      position="relative"
      transition="all 0.2s"
      _hover={{
        backgroundColor: "gray.200",
        cursor: "pointer",
      }}
      _dark={{
        _hover: {
          backgroundColor: "gray.600",
        },
      }}
    >
      {children}
      <Box
        position="absolute"
        borderRadius="50%"
        bottom={0}
        right={0}
        w="8px"
        h="8px"
        backgroundColor={isManaged ? "green.400" : "gray.400"}
      />
    </Center>
  );
};

const Profile = ({ image }: ProfileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <Flex marginTop="80px" direction="column" justifyContent="center" alignItems="center">
        <Flex
          justifyContent="center"
          alignItems="end"
          w="120px"
          h="120px"
          pos="relative"
          overflow="hidden"
          backgroundColor="blue.50"
          objectFit="cover"
          boxShadow="0 0 0 5px #1A365D"
          borderRadius="50%"
          isolation="isolate"
          _dark={{
            backgroundColor: "blue.100",
            boxShadow: "0 0 0 5px #ffffff",
          }}
        >
          <Box borderRadius="50%" transform="translateX(10px)" w="100px">
            <GatsbyImage draggable={false} image={image} alt="profile" />
          </Box>
        </Flex>

        <Box marginTop="20px">
          <Text fontWeight="medium" fontSize="16px">
            정현수.
          </Text>
        </Box>

        <Flex direction="column" marginTop="6px">
          {/* Managed */}
          <Flex gap="6px" alignItems="center">
            <Box borderRadius="50%" w="8px" h="8px" backgroundColor="green.400" />
            <Text fontSize="10px" color="green.500">
              Currently Managed
            </Text>
          </Flex>

          {/* Currently not managed */}
          <Flex gap="6px" alignItems="center">
            <Box borderRadius="50%" w="8px" h="8px" backgroundColor="gray.400" />
            <Text fontSize="10px" color="gray.500">
              Currently not managed
            </Text>
          </Flex>
        </Flex>

        <Flex gap="10px" marginTop="10px" alignItems="center">
          {/* Github */}
          <Tooltip label="Github">
            <a href="https://github.com/junghyeonsu" target="_blank">
              <IconBox isManaged>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path
                    fill="currentColor"
                    d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"
                  ></path>
                </svg>
              </IconBox>
            </a>
          </Tooltip>

          {/* Instagram */}
          <Tooltip label="Instagram">
            <a href="https://www.instagram.com/front_june/" target="_blank">
              <IconBox isManaged>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                  ></path>
                </svg>
              </IconBox>
            </a>
          </Tooltip>

          {/* Linkedin */}
          <Tooltip label="Linkedin">
            <a href="https://www.linkedin.com/in/hyeonsu-jung-5483911a5/" target="_blank">
              <IconBox isManaged>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                  ></path>
                </svg>
              </IconBox>
            </a>
          </Tooltip>

          {/* Careerly */}
          <Tooltip label="Careerly">
            <a
              href="https://careerly.co.kr/profiles/562464?from=newsfeed&location=gnb"
              target="_blank"
            >
              <IconBox isManaged>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 102 102"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M90.2366 51C90.2366 54.9344 87.0464 58.1238 83.1127 58.1238C79.1768 58.1238 75.9889 54.9344 75.9889 51C75.9889 47.0657 79.1768 43.8762 83.1127 43.8762C87.0464 43.8762 90.2366 47.0657 90.2366 51Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M46.5281 70.6842C35.4139 70.6842 26.4214 61.4288 26.8554 50.2223C27.2612 39.7429 35.9504 31.3625 46.4395 31.316C50.55 31.2979 54.3734 32.5458 57.5413 34.6916C59.3287 35.9022 61.7413 34.6364 61.7413 32.4778V22.2935C61.7413 21.2294 61.1144 20.2618 60.139 19.8354C55.9717 18.0128 51.3686 17.0002 46.5287 17C27.7301 16.9996 12.5635 32.1282 12.5223 50.9235C12.4807 69.7365 27.7216 85 46.5281 85C51.3706 85 55.9757 83.9865 60.145 82.1621C61.1178 81.7365 61.7413 80.769 61.7413 79.7072V69.5224C61.7413 67.3634 59.3282 66.0982 57.5404 67.309C54.3953 69.439 50.6043 70.6842 46.5281 70.6842Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </IconBox>
            </a>
          </Tooltip>

          {/* Mail */}
          <Tooltip label="jung660317@naver.com">
            <a href="mailto:jung660317@naver.com" target="_blank">
              <IconBox isManaged>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
                  />
                </svg>
              </IconBox>
            </a>
          </Tooltip>

          {/* Velog */}
          <Tooltip label="Velog">
            <a href="https://velog.io/@junghyeonsu" target="_blank">
              <IconBox>
                <svg width="18" height="18" viewBox="0 0 192 192" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 0H168C181.255 0 192 10.7451 192 24V168C192 181.255 181.255 192 168 192H24C10.7451 192 0 181.255 0 168V24C0 10.7451 10.7451 0 24 0ZM49 57.9199V65.48H67L80.6799 142.52L98.5 141.26C116.02 119.06 127.84 102.44 133.96 91.3999C140.2 80.24 143.32 70.9399 143.32 63.5C143.32 59.0601 142 55.7 139.36 53.4199C136.84 51.1399 133.66 50 129.82 50C122.62 50 116.62 53.0601 111.82 59.1799C116.5 62.3 119.68 64.8799 121.36 66.9199C123.16 68.8401 124.06 71.4199 124.06 74.6599C124.06 80.0601 122.44 86.1799 119.2 93.02C116.08 99.8601 112.66 105.92 108.94 111.2C106.54 114.56 103.48 118.7 99.76 123.62L88.0601 57.2C87.1001 52.3999 84.1001 50 79.0601 50C76.78 50 72.3999 50.96 65.9199 52.8799C59.4399 54.6799 53.8 56.3601 49 57.9199Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </IconBox>
            </a>
          </Tooltip>

          {/* Tistory */}
          <Tooltip label="Tistory">
            <a href="https://junghyeonsu.tistory.com/" target="_blank">
              <IconBox>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 12 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.54016 1.98V15H5.40016C5.09349 15 4.85349 14.92 4.68016 14.76C4.52016 14.5867 4.44016 14.36 4.44016 14.08V1.98H3.36016C2.61349 1.98 2.03349 2.10667 1.62016 2.36C1.22016 2.61333 0.99349 3.09333 0.940156 3.8H0.560156V0.96H11.4202V3.8H11.0602C10.9935 3.09333 10.7535 2.61333 10.3402 2.36C9.94016 2.10667 9.36682 1.98 8.62016 1.98H7.54016Z"
                    fill="currentColor"
                  />
                </svg>
              </IconBox>
            </a>
          </Tooltip>

          {/* Youtube */}
          <Tooltip label="Youtube">
            <a href="https://www.youtube.com/channel/UCkC6sYPPSvpnRprmp2GcXZw" target="_blank">
              <IconBox>
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="YouTubeIcon"
                >
                  <path
                    fill="currentColor"
                    d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"
                  ></path>
                </svg>
              </IconBox>
            </a>
          </Tooltip>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default Profile;
