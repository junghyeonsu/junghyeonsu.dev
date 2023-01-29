import { Box, Heading } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import FeaturedPostCard from "./FeaturedPostCard";

interface FeaturedPostSectionProps {
  posts: GatsbyTypes.AllPostPageTemplateQuery["featuredPosts"]["nodes"];
}

const FeaturedPostSection = ({ posts }: FeaturedPostSectionProps) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setFeaturedIndex((prev) => (prev + 1) % posts.length),
      10000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Box width="100%" maxWidth={{ base: "100%", md: "600px", lg: "100%" }}>
      <Heading fontStyle="italic">Featured.</Heading>

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

export default FeaturedPostSection;
