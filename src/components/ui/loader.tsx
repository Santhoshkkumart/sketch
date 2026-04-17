"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LoaderOne({ className }) {
  const bars = Array.from({ length: 5 });

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-white rounded-full"
          initial={{ height: 12 }}
          animate={{
            height: [12, 28, 12],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
