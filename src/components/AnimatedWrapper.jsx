import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedWrapper({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animate only once when in view

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
