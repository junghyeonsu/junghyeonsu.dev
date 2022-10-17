import { Badge, Box, chakra, Heading, Image } from '@chakra-ui/react';

interface Props {
  title: string;
  date: string;
  coverImage: string;
  category: string;
  readingTime: number;
}

const Img = chakra(Image, {
  baseStyle: {
    width: '100%',
  },
});

const PostContentTitle = ({ title, date, category, coverImage, readingTime }: Props) => {
  return (
    <Box
      as="article"
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="baseline"
    >
      <Heading as="h1" marginBottom="3" fontWeight={900}>
        {title}
      </Heading>
      <Box display="flex" columnGap="10px" rowGap="10px" flexWrap="wrap">
        <Badge fontSize="14px">{date}</Badge>
        <Badge fontSize="14px">{category}</Badge>
        <Badge fontSize="14px">{`${readingTime} minutes`}</Badge>
      </Box>
      <Img
        priority
        draggable="false"
        objectFit="contain"
        src={coverImage}
        alt="cover image"
        marginTop="10"
        marginBottom="10"
      />
    </Box>
  );
};

export default PostContentTitle;
