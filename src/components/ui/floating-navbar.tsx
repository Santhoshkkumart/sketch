"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export const FloatingNav = ({ navItems, className }) => {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY < 50);
      
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed z-[5000] flex w-[calc(100%-1.5rem)] max-w-none items-center justify-center gap-3 rounded-2xl border border-white/[0.15] bg-black/85 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-md left-3 right-3 bottom-3 md:bottom-auto md:top-6 md:left-1/2 md:right-auto md:w-auto md:max-w-fit md:-translate-x-1/2 md:rounded-full md:px-8",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            to={navItem.link}
            className={cn(
              "relative flex items-center gap-2 text-neutral-400 transition-colors duration-200 min-w-0 touch-manipulation",
              location.pathname === navItem.link && "text-white"
            )}
          >
            <span className="block md:hidden">{navItem.icon}</span>
            <span className="hidden md:block text-sm hover:text-white">
              {navItem.name}
            </span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
