import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import HomeBackground from "../components/HomeBackground";
import SketchLine from "../components/SketchLine";
import { Spotlight } from "../components/ui/spotlight";
import { Typewriter } from "../components/ui/typewriter-text";
import { TextFlippingBoard } from "../components/ui/text-flipping-board";
import { useMediaQuery } from "../hooks/use-media-query";
import { usePrefersReducedMotion } from "../hooks/use-reduced-motion";

const MESSAGES = [
  "SKETCH IS A PLATFORM",
  "IDEAS BECOME SYSTEMS",
  "BUILD. SHIP. REPEAT.",
  "THIS IS NOT A CLUB.",
  "WHERE IDEAS MEET EXECUTION",
];

const FRAME_COUNT = 172;
const getFrameUrl = (index) =>
  `/hero-sequence/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

export default function Home() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [msgIdx, setMsgIdx] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = usePrefersReducedMotion();
  const useSequence = !isMobile && !prefersReducedMotion;

  // 1. Preload Images (Desktop Only)
  useEffect(() => {
    if (!useSequence) return;
    const loadedImages = [];
    let loadedCount = 0;
    for (let i = 1; i <= FRAME_COUNT; i += 1) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === FRAME_COUNT) setImages(loadedImages);
      };
      loadedImages.push(img);
    }
  }, [useSequence]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.0001,
  });

  // Mapped to start fading in earlier on desktop
  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.85, 0.95], [0, 1, 1, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.3, 0.5], [0.95, 1]);

  // 2. Canvas Rendering (Desktop Only)
  const render = useCallback(
    (index) => {
      if (!useSequence || images.length === 0 || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      const img = images[Math.floor(index)];
      if (img) {
        const canvas = canvasRef.current;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
      }
    },
    [images, useSequence]
  );

  useEffect(() => {
    if (!useSequence) return undefined;
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render(Math.floor(smoothProgress.get() * (FRAME_COUNT - 1)));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [render, smoothProgress, useSequence]);

  useEffect(() => {
    if (!useSequence) return undefined;
    const unsubscribe = smoothProgress.on("change", (v) => {
      render(Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(v * (FRAME_COUNT - 1)))));
    });
    return () => unsubscribe();
  }, [smoothProgress, render, useSequence]);

  const next = useCallback(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), []);
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, prefersReducedMotion]);

  return (
    <PageTransition>
      <HomeBackground />

      {/* DESKTOP HERO SECTION (LARGE SCREENS) */}
      {!isMobile && (
        <div ref={containerRef} className="relative h-[400vh] w-full z-10">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {useSequence && (
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0e0e0e] to-transparent z-20" />
          </div>
        </div>
      )}

      {/* DESKTOP CTA */}
      {!isMobile && (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 border-t border-white/5 z-20">
          <motion.div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              <Typewriter text="This is not a club. This is a platform." speed={70} />
            </h2>
            <div className="flex items-center justify-center gap-6 pt-6">
              <Link to="/join" className="group relative flex h-14 w-44 items-center justify-center overflow-hidden rounded-full bg-white text-black font-bold">
                Join Us
              </Link>
              <Link to="/projects" className="flex h-14 w-44 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white font-medium">
                View Projects
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      {/* MOBILE HERO SECTION (SMALL SCREENS) */}
      {isMobile && (
        <>
          <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <img 
              src="/hero_background.png" 
              alt="" 
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="relative z-10 w-full px-6">
              <SketchLine />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0e0e0e] to-transparent z-20" />
          </div>

          <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 py-32 border-t border-white/5">
            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                <Typewriter text="This is not a club. This is a platform." speed={70} />
              </h2>
              <p className="mx-auto max-sm text-base text-neutral-400">
                SKETCH - where ideas become systems. We are building the next generation of makers.
              </p>
              <div className="flex flex-col items-center justify-center gap-5 w-full pt-4">
                <Link to="/join" className="h-14 w-full max-w-[280px] flex items-center justify-center rounded-full bg-white text-black font-bold">
                  Join Us
                </Link>
                <Link to="/projects" className="h-14 w-full max-w-[280px] flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white font-medium">
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* COMMON MESSAGE SECTION (SECTION 3) */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-16 md:py-0 border-t border-white/5 z-20">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
        <TextFlippingBoard key={MESSAGES[msgIdx]} text={MESSAGES[msgIdx]} />
      </div>
    </PageTransition>
  );
}
