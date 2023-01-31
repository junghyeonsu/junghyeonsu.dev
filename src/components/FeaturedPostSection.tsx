import { Box, Flex, Heading } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import FeaturedPostCard from "./FeaturedPostCard";

interface FeaturedPostSectionProps {
  posts: GatsbyTypes.AllPostPageTemplateQuery["featuredPosts"]["nodes"];
}

const TIME_INTERVAL = 10000;

const FeaturedPostSection = ({ posts }: FeaturedPostSectionProps) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const intervalCallback = useCallback(() => {
    setFeaturedIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const moveNextFeatured = useCallback(() => {
    setFeaturedIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const movePrevFeatured = useCallback(() => {
    setFeaturedIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(intervalCallback, TIME_INTERVAL);
    }

    return () => clearInterval(intervalRef.current);
  }, [intervalCallback, isPaused]);

  return (
    <Box width="100%" maxWidth={{ base: "100%", md: "600px", lg: "100%" }}>
      <Flex width="100%" justifyContent="space-between" alignItems="flex-end">
        <Heading fontStyle="italic">Featured.</Heading>
        <Flex direction="column" justifyContent="center" alignItems="center" gap="8px">
          <Flex>
            <Box
              as="button"
              onClick={movePrevFeatured}
              cursor="pointer"
              _hover={{ color: "blue.500" }}
            >
              <LeftArrowIcon />
            </Box>

            {isPaused ? (
              <Box
                as="button"
                onClick={() => setIsPaused(false)}
                cursor="pointer"
                _hover={{ color: "blue.500" }}
              >
                <PlayIcon />
              </Box>
            ) : (
              <Box
                as="button"
                onClick={() => setIsPaused(true)}
                cursor="pointer"
                _hover={{ color: "blue.500" }}
              >
                <PauseIcon />
              </Box>
            )}

            <Box
              as="button"
              onClick={moveNextFeatured}
              cursor="pointer"
              _hover={{ color: "blue.500" }}
            >
              <RightArrowIcon />
            </Box>
          </Flex>
          <Flex gap="6px">
            {posts.map((post, index) =>
              index === featuredIndex ? (
                <Box
                  as="button"
                  key={post.frontmatter?.slug!}
                  w="8px"
                  h="8px"
                  borderRadius="50%"
                  bg="gray.900"
                  cursor="pointer"
                  onClick={() => setFeaturedIndex(index)}
                />
              ) : (
                <Box
                  as="button"
                  key={post.frontmatter?.slug!}
                  w="8px"
                  h="8px"
                  borderRadius="50%"
                  border="1px solid"
                  cursor="pointer"
                  onClick={() => setFeaturedIndex(index)}
                />
              ),
            )}
          </Flex>
        </Flex>
      </Flex>

      <Box pos="relative" height={{ base: "500px", md: "600px" }} marginTop="20px">
        <AnimatePresence>
          {posts.map((post, index) => {
            if (index === featuredIndex) {
              return (
                <motion.div
                  style={{ position: "absolute", top: 0, left: 0 }}
                  key={post.frontmatter?.slug!}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  <FeaturedPostCard
                    createdAt={post.frontmatter?.createdAt!}
                    description={post.frontmatter?.description!}
                    title={post.frontmatter?.title!}
                    slug={post.frontmatter?.slug!}
                    updatedAt={post.frontmatter?.updatedAt!}
                    tags={post.frontmatter?.tags!}
                    thumbnail={post.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                  />
                </motion.div>
              );
            }
          })}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

const LeftArrowIcon = () => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9999 12.0001V14.6701C17.9999 17.9801 15.6499 19.3401 12.7799 17.6801L10.4699 16.3401L8.15995 15.0001C5.28995 13.3401 5.28995 10.6301 8.15995 8.97005L10.4699 7.63005L12.7799 6.29005C15.6499 4.66005 17.9999 6.01005 17.9999 9.33005V12.0001Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const RightArrowIcon = () => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 11.9999V9.32992C6 6.01992 8.35 4.65992 11.22 6.31992L13.53 7.65992L15.84 8.99992C18.71 10.6599 18.71 13.3699 15.84 15.0299L13.53 16.3699L11.22 17.7099C8.35 19.3399 6 17.9899 6 14.6699V11.9999Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PauseIcon = () => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PlayIcon = () => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44712 2 1.96997 6.47715 1.96997 12C1.96997 17.5228 6.44712 22 11.97 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.73999 12.2299V10.5599C8.73999 8.47988 10.21 7.62988 12.01 8.66988L13.46 9.50988L14.91 10.3499C16.71 11.3899 16.71 13.0899 14.91 14.1299L13.46 14.9699L12.01 15.8099C10.21 16.8499 8.73999 15.9999 8.73999 13.9199V12.2299Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FeaturedPostSection;
