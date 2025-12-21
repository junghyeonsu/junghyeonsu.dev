import { motion } from "framer-motion";
import { ALL_POSTS_TAG_NAME, koreanTagNames } from "@/constants";

interface TagGroup {
  tag: string;
  tagPostCount: number;
}

interface TagsProps {
  currentTag: string;
  tagGroups: TagGroup[];
  allPostCount: number;
}

function convertSlugToTitle(slug: string): string {
  if (slug === ALL_POSTS_TAG_NAME) return "All Posts";
  return koreanTagNames[slug] || slug;
}

export default function Tags({ currentTag, tagGroups, allPostCount }: TagsProps) {
  const currentTagPostCount = tagGroups.find((group) => group.tag === currentTag)?.tagPostCount;

  return (
    <div className="mt-20 flex flex-col w-full items-center">
      {/* Title + Count */}
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          margin: "auto",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <h1
          className={`italic font-extrabold tracking-tight ${
            currentTag === ALL_POSTS_TAG_NAME
              ? "text-[40px] md:text-[60px]"
              : "text-[30px] md:text-[60px]"
          }`}
          style={{ letterSpacing: "-1.5px" }}
        >
          {convertSlugToTitle(currentTag)}.
        </h1>
        <span className="text-xs md:text-base italic text-gray-500 font-extralight">
          ({currentTag === ALL_POSTS_TAG_NAME ? allPostCount : currentTagPostCount})
        </span>
      </motion.div>

      {/* Tag List */}
      <nav className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-10 px-5 md:px-0 w-full max-w-[600px]">
        <a href="/">
          <div className="flex justify-center items-start">
            <span
              className={`text-sm md:text-lg hover:underline ${
                currentTag === ALL_POSTS_TAG_NAME ? "font-bold" : "font-normal"
              }`}
            >
              All Posts
            </span>
            <span
              className={`text-xs ${
                currentTag === ALL_POSTS_TAG_NAME ? "font-bold" : "font-light"
              }`}
            >
              ({allPostCount})
            </span>
          </div>
        </a>
        {tagGroups.map((group) => (
          <a key={group.tag} href={`/tags/${group.tag}`}>
            <div className="flex justify-center items-start">
              <span
                className={`text-sm md:text-lg hover:underline ${
                  currentTag === group.tag ? "font-bold" : "font-normal"
                }`}
              >
                {koreanTagNames[group.tag] || group.tag}
              </span>
              <span className={`text-xs ${currentTag === group.tag ? "font-bold" : "font-light"}`}>
                ({group.tagPostCount})
              </span>
            </div>
          </a>
        ))}
      </nav>
    </div>
  );
}
