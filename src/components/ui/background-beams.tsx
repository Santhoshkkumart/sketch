"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }) => {
  const svgRef = useRef(null);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const generatePaths = () => {
      const newPaths = [];
      for (let i = 0; i < 20; i++) {
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() - 0.5) * 40;
        const controlX1 = startX + (Math.random() - 0.5) * 20;
        const controlX2 = endX + (Math.random() - 0.5) * 20;
        newPaths.push({
          d: `M${startX} 0 C ${controlX1} 33, ${controlX2} 66, ${endX} 100`,
          delay: Math.random() * 2,
          duration: 3 + Math.random() * 4,
        });
      }
      return newPaths;
    };
    setPaths(generatePaths());
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path.d}
            stroke="url(#beam-gradient)"
            strokeWidth="0.15"
            strokeOpacity="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
