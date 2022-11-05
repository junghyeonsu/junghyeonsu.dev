import { Badge, Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "gatsby";
import type { IGatsbyImageData } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useMemo } from "react";

interface PostCardProps {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  tags: readonly (string | null)[];
  thumbnail: IGatsbyImageData;
}

const PostCard = ({
  createdAt,
  description,
  slug,
  tags,
  thumbnail,
  title,
  updatedAt,
}: PostCardProps) => {
  const { colorMode } = useColorMode();

  const isDarkMode = useMemo(() => colorMode === "dark", [colorMode]);
  const diffMs = useMemo(() => new Date().getTime() - new Date(createdAt).getTime(), [createdAt]);
  const isNewPost = useMemo(() => Math.floor(diffMs / (1000 * 60 * 60 * 24)) <= 10, [diffMs]);

  return (
    <Link to={`/posts/${slug}`}>
      <Box
        as="article"
        boxShadow="md"
        transition="box-shadow 0.25s ease"
        _hover={{ boxShadow: "lg", cursor: "pointer" }}
        borderRadius="6px"
        overflow="hidden"
      >
        <Box
          display="block"
          as="span"
          width="100%"
          height={{ base: "100%", md: "240px" }}
          borderRadius={2}
        >
          <GatsbyImage
            objectFit="cover"
            style={{ height: "100%" }}
            image={thumbnail}
            alt={`${slug} cover image`}
          />
        </Box>
        <Flex direction="column" justifyContent="space-between" minH={130} padding={2}>
          <Flex direction="column">
            <Heading marginTop={2} fontSize={24} noOfLines={1}>
              {title}
            </Heading>

            <Text fontSize={16} color={isDarkMode ? "whiteAlpha.600" : "gray.600"} noOfLines={2}>
              {description}
            </Text>
          </Flex>

          <Box display="flex" columnGap="10px">
            <Badge fontSize={14}>{updatedAt ? `${updatedAt} (updated)` : createdAt}</Badge>
            {tags?.map((tag) => (
              <Badge key={tag} fontSize={14}>
                {tag}
              </Badge>
            ))}
            {isNewPost && (
              <Badge fontSize={14} colorScheme="green">
                new
              </Badge>
            )}
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default PostCard;
