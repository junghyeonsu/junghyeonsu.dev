// https://medium.com/next-generation-web/create-a-dark-mode-toggle-micro-interaction-like-a-pro-279305e9c2
import { motion } from "framer-motion";
import React from "react";

const FRAMER_TRANSITION = {
  type: "spring",
  stiffness: 200,
  damping: 10,
};

const SunIcon = () => {
  const raysVariants = {
    initial: { rotate: 45 },
    animate: { rotate: 0, FRAMER_TRANSITION },
  };

  const coreVariants = {
    initial: { scale: 1.5 },
    animate: { scale: 1, FRAMER_TRANSITION },
  };

  const whileTap = { scale: 0.95, rotate: 15 };

  return (
    <motion.svg
      key="sun"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileTap={whileTap}
      // Centers the rotation anchor point vertically & horizontally
      style={{ originX: "50%", originY: "50%" }}
    >
      <motion.circle
        cx="11.9998"
        cy="11.9998"
        r="5.75375"
        fill="currentColor"
        initial="initial"
        animate="animate"
        variants={coreVariants}
      />
      <motion.g initial="initial" animate="animate" variants={raysVariants}>
        <circle
          cx="3.08982"
          cy="6.85502"
          r="1.71143"
          transform="rotate(-60 3.08982 6.85502)"
          fill="currentColor"
        />
        <circle
          cx="3.0903"
          cy="17.1436"
          r="1.71143"
          transform="rotate(-120 3.0903 17.1436)"
          fill="currentColor"
        />
        <circle cx="12" cy="22.2881" r="1.71143" fill="currentColor" />
        <circle
          cx="20.9101"
          cy="17.1436"
          r="1.71143"
          transform="rotate(-60 20.9101 17.1436)"
          fill="currentColor"
        />
        <circle
          cx="20.9101"
          cy="6.8555"
          r="1.71143"
          transform="rotate(-120 20.9101 6.8555)"
          fill="currentColor"
        />
        <circle cx="12" cy="1.71143" r="1.71143" fill="currentColor" />
      </motion.g>
    </motion.svg>
  );
};

export default SunIcon;
