// NOTE: blog-development -> BLOG DEVELOPMENT
export const convertSlugToTitle = (slug: string) => {
  return slug
    .split("-")
    .map((i) => i.toUpperCase())
    .join(" ");
};

// NOTE: jsx,1-3&5-6,7-9 -> added line is 1 to 3 and 5 to 6, removed line is 7 to 9
export const parseSyntaxHighlighterClassName = (className: string) => {
  const [, addLineString, removeLineString] = className?.split(",");

  // addLines: [[1, 3], [5, 6]]
  const addLines = addLineString?.split("&")?.map((line) => line.split("-").map(Number));

  // removeLines: [[7, 9]]
  const removeLines = removeLineString?.split("&")?.map((line) => line.split("-").map(Number));

  return {
    addLines: platArrayWithNumberInBetween(addLines),
    removeLines: platArrayWithNumberInBetween(removeLines),
  };
};

// NOTE: [[1, 3], [5, 6]] -> [1, 2, 3, 5, 6]
const platArrayWithNumberInBetween = (array: number[][]): number[] | undefined => {
  return array?.flatMap(([start, end]) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i),
  );
};
