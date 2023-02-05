import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import type { IGatsbyImageData } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";
import { useMemo, useState } from "react";

import { koreanTagNames } from "../constants";

interface FeaturedPostCardProps {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  tags: readonly (string | null)[];
  thumbnail: IGatsbyImageData;
}

const FeaturedPostCard = ({
  createdAt,
  description,
  slug,
  tags,
  thumbnail,
  title,
  updatedAt,
}: FeaturedPostCardProps) => {
  const diffMs = useMemo(() => new Date().getTime() - new Date(createdAt).getTime(), [createdAt]);
  const isNewPost = useMemo(() => Math.floor(diffMs / (1000 * 60 * 60 * 24)) <= 10, [diffMs]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/posts/${slug}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        as="article"
        transition="all 0.25s ease"
        position="relative"
        _hover={{ boxShadow: "lg", cursor: "pointer" }}
        borderRadius="20px"
        overflow="hidden"
        width="100%"
        height={{ base: "100%", sm: "380px", md: "480px" }}
        isolation="isolate"
      >
        {/* Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height={{ base: "100%", sm: "380px", md: "480px" }}
          backgroundColor={"blackAlpha.600"}
          zIndex={2}
          transition="opacity 0.25s ease"
          opacity={isHovered ? 1 : 0}
        >
          {/* Title */}
          <Flex
            position="absolute"
            bottom={0}
            left={0}
            margin="20px"
            direction="column"
            alignItems="start"
          >
            <Text fontSize={16} color="white" noOfLines={2}>
              {description}
            </Text>
          </Flex>

          {/* Right Top Arrow Icon */}
          <Center
            position="absolute"
            top={0}
            right={0}
            margin="20px"
            backgroundColor="white"
            borderRadius="50%"
            width="40px"
            height="40px"
          >
            <svg
              fill="#000000"
              width="30px"
              height="30px"
              viewBox="-6 -6.5 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
            >
              <path d="M7.828 2.414H2.243a1 1 0 1 1 0-2h8a.997.997 0 0 1 1 1v8a1 1 0 0 1-2 0V3.828l-6.779 6.779A1 1 0 0 1 1.05 9.192l6.778-6.778z" />
            </svg>
          </Center>

          {/* Tags */}
          <Flex position="absolute" direction="column" left={0} top={0} margin="20px" gap="10px">
            {tags?.map((tag) => (
              <Box
                key={tag}
                border="white 2px solid"
                borderRadius="20px"
                color="white"
                padding="10px"
                fontSize="14px"
                fontWeight="800"
                width="fit-content"
              >
                {koreanTagNames[tag!] || tag}
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Image */}
        <Box display="block" as="span" width="100%" height="100%" borderRadius={2}>
          <GatsbyImage
            objectFit="cover"
            style={{ height: "100%" }}
            image={thumbnail}
            alt={`${slug} cover image`}
          />
        </Box>
      </Box>

      {/* title + tags */}
      <Flex direction="column" alignItems="start">
        <Flex gap="10px" marginTop="16px">
          <Box
            color="black.900"
            borderColor="black.900"
            border="3px solid"
            borderRadius="20px"
            padding="8px"
            fontSize="14px"
            fontWeight="800"
            width="fit-content"
          >
            {updatedAt ? `${updatedAt} (updated)` : createdAt}
          </Box>
          <Box
            color="black.900"
            borderColor="black.900"
            border="3px solid"
            borderRadius="20px"
            padding="8px"
            fontSize="14px"
            fontWeight="800"
            width="fit-content"
          >
            FEATURED POST
          </Box>

          {/* New Tag */}
          {isNewPost && (
            <Box
              color="black.900"
              borderColor="black.900"
              border="3px solid"
              borderRadius="20px"
              padding="8px"
              fontSize="14px"
              fontWeight="800"
              width="fit-content"
              zIndex={1}
            >
              NEW POST
            </Box>
          )}
        </Flex>
        <Heading marginTop="10px" fontSize="24px" fontWeight="700">
          {title}
        </Heading>
      </Flex>
    </Link>
  );
};

export default FeaturedPostCard;
