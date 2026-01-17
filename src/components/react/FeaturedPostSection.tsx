import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import FeaturedPostCard from "./FeaturedPostCard";

interface FeaturedPost {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string | null;
  tags: string[];
  thumbnail?: string;
}

interface FeaturedPostSectionProps {
  posts: FeaturedPost[];
}

const TIME_INTERVAL = 10000;

const FeaturedPostSection = ({ posts }: FeaturedPostSectionProps) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

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
    <div className="w-full">
      <div className="w-full flex justify-between items-end">
        <h2 className="text-2xl font-bold italic">Featured.</h2>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex">
            <button
              type="button"
              onClick={movePrevFeatured}
              className="cursor-pointer hover:text-stone-500"
            >
              <LeftArrowIcon />
            </button>

            {isPaused ? (
              <button
                type="button"
                onClick={() => setIsPaused(false)}
                className="cursor-pointer hover:text-stone-500"
              >
                <PlayIcon />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsPaused(true)}
                className="cursor-pointer hover:text-stone-500"
              >
                <PauseIcon />
              </button>
            )}

            <button
              type="button"
              onClick={moveNextFeatured}
              className="cursor-pointer hover:text-stone-500"
            >
              <RightArrowIcon />
            </button>
          </div>
          <div className="flex gap-1.5">
            {posts.map((post, index) =>
              index === featuredIndex ? (
                <button
                  type="button"
                  key={post.slug}
                  className="w-2 h-2 rounded-full bg-current cursor-pointer"
                  onClick={() => setFeaturedIndex(index)}
                />
              ) : (
                <button
                  type="button"
                  key={post.slug}
                  className="w-2 h-2 rounded-full border border-current cursor-pointer"
                  onClick={() => setFeaturedIndex(index)}
                />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="relative h-[500px] md:h-[600px] mt-5">
        <AnimatePresence>
          {posts.map((post, index) => {
            if (index === featuredIndex) {
              return (
                <motion.div
                  style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
                  key={post.slug}
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
                    createdAt={post.createdAt}
                    description={post.description}
                    title={post.title}
                    slug={post.slug}
                    updatedAt={post.updatedAt}
                    tags={post.tags}
                    thumbnail={post.thumbnail}
                  />
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </div>
    </div>
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
