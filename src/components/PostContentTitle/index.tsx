import { Heading, Text, Box, Image, chakra } from '@chakra-ui/react';

interface Props {
  title: string;
  date: string;
  coverImage: string;
}

const Img = chakra(Image, {
  baseStyle: {
    width: '100%',
  },
});

const PostContentTitle = ({ title, date, coverImage }: Props) => {
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
      <Text opacity="0.7">{date}</Text>
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
