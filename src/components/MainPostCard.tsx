import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import type { IGatsbyImageData } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";
import { useMemo } from "react";

import { koreanTagNames } from "../constants";

interface PostCardProps {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  tags: readonly (string | null)[];
  thumbnail: IGatsbyImageData;
}

const MainPostCard = ({
  createdAt,
  description,
  slug,
  tags,
  thumbnail,
  title,
  updatedAt,
}: PostCardProps) => {
  const diffMs = useMemo(() => new Date().getTime() - new Date(createdAt).getTime(), [createdAt]);
  const isNewPost = useMemo(() => Math.floor(diffMs / (1000 * 60 * 60 * 24)) <= 10, [diffMs]);

  return (
    <Link to={`/posts/${slug}`}>
      <Box
        as="article"
        transition="box-shadow 0.25s ease"
        position="relative"
        _hover={{ boxShadow: "lg", cursor: "pointer" }}
        borderRadius="6px"
        overflow="hidden"
        width={{ base: "100%", md: "100%" }}
      >
        {/* Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundColor={"blackAlpha.500"}
          zIndex={1}
        />

        {/* Image */}
        <Box
          display="block"
          as="span"
          width="100%"
          height={{ base: "100%", md: "340px" }}
          borderRadius={2}
        >
          <GatsbyImage
            objectFit="cover"
            style={{ height: "100%" }}
            image={thumbnail}
            alt={`${slug} cover image`}
          />
        </Box>

        {/* Title */}
        <Flex
          position="absolute"
          bottom="30px"
          margin="10px"
          left={0}
          direction="column"
          alignItems="start"
          zIndex={2}
        >
          <Heading fontSize={24} fontWeight="800" noOfLines={1} color={"white"}>
            {title}
          </Heading>
          <Text fontSize={16} color="white" noOfLines={2}>
            {description}
          </Text>
        </Flex>

        {/* Date + Tag + isNew? */}
        <Flex
          position="absolute"
          left={0}
          bottom={0}
          direction="column"
          justifyContent="space-between"
          padding={2}
          zIndex={2}
        >
          <Box display="flex" columnGap="10px">
            <Badge fontSize={14}>{updatedAt ? `${updatedAt} (updated)` : createdAt}</Badge>
            {tags?.map((tag) => (
              <Badge key={tag} fontSize={14}>
                {koreanTagNames[tag!]}
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

export default MainPostCard;
