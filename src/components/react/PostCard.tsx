import { useMemo, useState } from "react";
import { koreanTagNames } from "@/constants";

interface PostCardProps {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt?: string | null;
  tags: string[];
  thumbnail?: string;
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
  const diffMs = useMemo(
    () => Date.now() - new Date(createdAt.replace(/\//g, "-")).getTime(),
    [createdAt],
  );
  const isNewPost = useMemo(() => Math.floor(diffMs / (1000 * 60 * 60 * 24)) <= 10, [diffMs]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={`/posts/${slug}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        className="transition-all duration-300 ease-in-out relative hover:shadow-lg cursor-pointer rounded-[20px] overflow-hidden w-full h-full sm:h-[280px] md:h-[316px]"
        style={{ isolation: "isolate" }}
      >
        {/* Overlay */}
        <div
          className={`absolute top-0 left-0 w-full h-full sm:h-[280px] md:h-[316px] bg-black/60 z-[2] transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Description */}
          <div className="absolute bottom-0 left-0 m-5 flex flex-col items-start">
            <p className="text-base text-white line-clamp-2">{description}</p>
          </div>

          {/* Right Top Arrow Icon */}
          <div className="absolute top-0 right-0 m-5 bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <svg
              fill="#000000"
              width="30px"
              height="30px"
              viewBox="-6 -6.5 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
            >
              <path d="M7.828 2.414H2.243a1 1 0 1 1 0-2h8a.997.997 0 0 1 1 1v8a1 1 0 0 1-2 0V3.828l-6.779 6.779A1 1 0 0 1 1.05 9.192l6.778-6.778z" />
            </svg>
          </div>

          {/* Tags */}
          <div className="absolute flex flex-col left-0 top-0 m-5 gap-2.5">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="border-2 border-white rounded-[20px] text-white px-2.5 py-2.5 text-sm font-extrabold w-fit"
              >
                {koreanTagNames[tag] || tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <span className="block w-full h-full rounded-sm">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`${slug} cover image`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </span>
      </article>

      {/* title + tags + new Post */}
      <div className="flex flex-col items-start">
        <div className="flex gap-2.5 mt-4">
          <span className="text-current border-current border-[3px] rounded-[20px] px-2 py-2 text-sm font-extrabold w-fit">
            {updatedAt ? `${updatedAt} (updated)` : createdAt}
          </span>

          {/* New Tag */}
          {isNewPost && (
            <span className="text-current border-current border-[3px] rounded-[20px] px-2 py-2 text-sm font-extrabold w-fit z-[1]">
              NEW POST
            </span>
          )}
        </div>
        <h2 className="mt-2.5 text-2xl font-bold">{title}</h2>
      </div>
    </a>
  );
};

export default PostCard;
