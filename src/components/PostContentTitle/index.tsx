import { Heading, Box, Image, chakra, Badge } from '@chakra-ui/react';

interface Props {
  title: string;
  date: string;
  coverImage: string;
  category: string;
}

const Img = chakra(Image, {
  baseStyle: {
    width: '100%',
  },
});

const PostContentTitle = ({ title, date, category, coverImage }: Props) => {
  return (
    <Box
      as="article"
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="baseline"
    >
      <Heading as="h1" marginBottom="3">
        {title}
      </Heading>
      <Box display="flex" columnGap="10px">
        <Badge fontSize="14px">{date}</Badge>
        <Badge fontSize="14px">{category}</Badge>
      </Box>
      <Img
        draggable="false"
        objectFit="contain"
        src={coverImage}
        alt="cover image"
        marginTop="10"
        marginBottom="16"
      />
    </Box>
  );
};

export default PostContentTitle;
