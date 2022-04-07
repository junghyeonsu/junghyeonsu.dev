import { Box, Heading, Text, Badge } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import type PostType from '../../types/post';

import useBreakPoint from '../../hooks/useBreakPoint';

interface Props {
  post: PostType;
}

const PostCard = ({ post }: Props) => {
  const { slug, title, date, coverImage, description } = post;
  const isLargerThan900 = useBreakPoint();

  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <Box
        padding="10px"
        as="article"
        width={isLargerThan900 ? '400px' : '100%'}
        boxShadow="sm"
        _hover={{ boxShadow: 'md', cursor: 'pointer' }}
        borderRadius={2}
      >
        <Box display="block" as="span" width="100%" borderRadius={2}>
          <Image src={coverImage} alt="cover image" width={400} height={240} layout="responsive" />
        </Box>
        <Box padding={2}>
          <Badge colorScheme="blue" fontSize={14}>
            {date}
          </Badge>
          <Heading marginTop={2} fontSize={24}>
            {title}
          </Heading>
          <Text fontSize={16} color={'gray.600'}>
            {description}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default PostCard;
