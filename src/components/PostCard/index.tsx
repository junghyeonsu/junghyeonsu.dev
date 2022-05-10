import { useMemo } from 'react';
import { Box, Heading, Text, Badge, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import type PostType from '../../types/post';

import useMediaQuery from '../../hooks/useMediaQuery';

interface Props {
  post: PostType;
}

const PostCard = ({ post }: Props) => {
  const { slug, title, date, category, coverImage, description } = post;
  const { colorMode } = useColorMode();
  const mediaQuery = useMediaQuery();

  const isDarkMode = useMemo(() => colorMode === 'dark', [colorMode]);
  const diffMs = useMemo(() => new Date().getTime() - new Date(date).getTime(), [date]);
  const isNewPost = useMemo(() => Math.floor(diffMs / (1000 * 60 * 60 * 24)) <= 10, [diffMs]);

  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]" passHref>
      <Box
        margin={mediaQuery?.isLargerThan900 ? '20px' : '20px 0px'}
        as="article"
        width={mediaQuery?.isLargerThan900 ? '400px' : '100%'}
        boxShadow="sm"
        transition="box-shadow 0.25s ease"
        _hover={{ boxShadow: 'md', cursor: 'pointer' }}
        borderRadius={2}
      >
        <Box
          css={{
            '&:hover': {
              img: {
                transform: 'scale(1.09)',
              },
            },
          }}
          display="block"
          as="span"
          width="100%"
          borderRadius={2}
        >
          <Image
            style={{ transition: 'all 0.3s ease' }}
            placeholder="blur"
            blurDataURL="https://via.placeholder.com/400x240"
            src={coverImage}
            alt={`${slug} cover image`}
            width={400}
            height={240}
            layout="responsive"
          />
        </Box>
        <Box padding={2}>
          <Box display="flex" columnGap="10px">
            <Badge fontSize={14}>{date}</Badge>
            <Badge fontSize={14}>{category}</Badge>
            {isNewPost && (
              <Badge fontSize={14} colorScheme="green">
                new
              </Badge>
            )}
          </Box>
          <Heading marginTop={2} fontSize={24}>
            {title}
          </Heading>
          <Text fontSize={16} color={isDarkMode ? 'whiteAlpha.600' : 'gray.600'} isTruncated>
            {description}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default PostCard;
