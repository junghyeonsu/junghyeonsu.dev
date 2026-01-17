import Callout from "./Callout";
import EvidenceCardAutoThumb from "./EvidenceCardAutoThumb.astro";
import EvidenceRail from "./EvidenceRail.astro";
import EvidenceRef from "./EvidenceRef";
import MdxLink from "./MdxLink";
import MdxParagraph from "./MdxParagraph.astro";
import ProjectSection from "./ProjectSection";
import WorkTimeline from "./WorkTimeline";
import XPost from "./XPost.astro";
import YouTubePlayer from "./YouTubePlayer";

export const mdxComponents = {
  Callout,
  EvidenceCard: EvidenceCardAutoThumb,
  EvidenceRail,
  EvidenceRef,
  ProjectSection,
  WorkTimeline,
  XPost,
  YouTubePlayer,
  a: MdxLink,
  p: MdxParagraph,
};

export {
  Callout,
  EvidenceCardAutoThumb as EvidenceCard,
  EvidenceRail,
  EvidenceRef,
  MdxParagraph,
  ProjectSection,
  WorkTimeline,
  XPost,
  YouTubePlayer,
};
