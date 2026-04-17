"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export function EncryptedText({
  text,
  className,
  encryptedClassName,
  revealedClassName,
  revealDelayMs = 50,
  animateOn = "view",
}) {
  const [displayText, setDisplayText] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!hasStarted) return;

    let step = 0;
    const totalSteps = text.length;
    const intervalId = setInterval(() => {
      step++;
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < step) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(result);

      if (step >= totalSteps) {
        clearInterval(intervalId);
        setIsRevealed(true);
      }
    }, revealDelayMs);

    return () => clearInterval(intervalId);
  }, [hasStarted, text, revealDelayMs]);

  useEffect(() => {
    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            // Initialize with encrypted text
            let initial = "";
            for (let i = 0; i < text.length; i++) {
              initial += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            setDisplayText(initial);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    } else {
      setHasStarted(true);
      let initial = "";
      for (let i = 0; i < text.length; i++) {
        initial += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplayText(initial);
    }
  }, [animateOn, text]);

  return (
    <motion.span
      ref={ref}
      className={cn(
        "font-mono inline-block",
        className,
        isRevealed ? revealedClassName : encryptedClassName
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText || text}
    </motion.span>
  );
}
