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
  const [displayText, setDisplayText] = useState(text);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setDisplayText(text);
    setIsRevealed(false);
    setHasStarted(animateOn !== "view");
  }, [text, animateOn]);

  useEffect(() => {
    if (!hasStarted || isRevealed) return;

    let step = 0;
    const totalSteps = text.length;
    if (totalSteps === 0) {
      setIsRevealed(true);
      return;
    }

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
        setDisplayText(text);
        setIsRevealed(true);
      }
    }, revealDelayMs);

    return () => {
      clearInterval(intervalId);
      setDisplayText(text);
    };
  }, [hasStarted, isRevealed, text, revealDelayMs]);

  useEffect(() => {
    if (hasStarted || isRevealed) return;

    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
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
  }, [animateOn, hasStarted, isRevealed, text]);

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
