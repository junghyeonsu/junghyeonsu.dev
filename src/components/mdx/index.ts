import Callout from "./Callout";
import MdxParagraph from "./MdxParagraph.astro";
import YouTubePlayer from "./YouTubePlayer";

export const mdxComponents = {
  Callout,
  YouTubePlayer,
  p: MdxParagraph,
};

export { Callout, MdxParagraph, YouTubePlayer };
