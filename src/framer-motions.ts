export const fadeInFromLeft = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 20,
  },
};
