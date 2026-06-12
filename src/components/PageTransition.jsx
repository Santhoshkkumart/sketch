import React from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/use-reduced-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

const reducedMotionTransition = {
  duration: 0.15,
  ease: "easeOut",
};

export default function PageTransition({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedMotionVariants : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={
        prefersReducedMotion ? reducedMotionTransition : pageTransition
      }
    >
      {children}
    </motion.div>
  );
}
