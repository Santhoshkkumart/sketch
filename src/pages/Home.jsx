import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { Spotlight } from "../components/ui/spotlight";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { TextFlippingBoard } from "../components/ui/text-flipping-board";
import { useMediaQuery } from "../hooks/use-media-query";
import heroPoster from "../assets/hero.png";

const MESSAGES = [
  "SKETCH IS A PLATFORM",
  "IDEAS BECOME SYSTEMS",
  "BUILD. SHIP. REPEAT.",
  "THIS IS NOT A CLUB.",
  "WHERE IDEAS MEET EXECUTION",
];

const words = [
  { text: "This" },
  { text: "is" },
  { text: "not" },
  { text: "a" },
  { text: "club." },
  { text: "This" },
  { text: "is" },
  { text: "a" },
  {
    text: "platform.",
    className: "text-[#e8e8e0]",
  },
];

const FRAME_COUNT = 240;
const getFrameUrl = (index) =>
  `/hero-sequence/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

export default function Home() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [msgIdx, setMsgIdx] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const useSequence = !isMobile && !prefersReducedMotion;

  useEffect(() => {
    if (!useSequence) {
      return;
    }

    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i += 1) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
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
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShiftX,
          centerShiftY,
          img.width * ratio,
          img.height * ratio
        );
      }
    },
    [images, useSequence]
  );

  useEffect(() => {
    if (!useSequence) {
      return undefined;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const currentFrame = Math.floor(
          smoothProgress.get() * (FRAME_COUNT - 1)
        );
        render(currentFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [render, smoothProgress, useSequence]);

  useEffect(() => {
    if (!useSequence) {
      return undefined;
    }

    const unsubscribe = smoothProgress.on("change", (v) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(v * (FRAME_COUNT - 1)))
      );
      render(frameIndex);
    });

    return () => unsubscribe();
  }, [smoothProgress, render, useSequence]);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    []
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative h-[150vh] sm:h-[180vh] md:h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0e0e0e]">
          {useSequence ? (
            <canvas ref={canvasRef} className="h-full w-full object-cover" />
          ) : (
            <img
              src={heroPoster}
              alt="SKETCH hero"
              className="h-full w-full object-cover"
              loading="eager"
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-48 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
        </div>
      </div>

      <div className="relative min-h-[72vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#0e0e0e] px-4 py-16 md:py-0">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center justify-center max-w-4xl text-center"
        >
          <TypewriterEffectSmooth words={words} />

          <p className="mt-4 mb-8 max-w-2xl px-2 text-center text-sm text-neutral-400 sm:text-base md:text-lg">
            SKETCH - where ideas become systems.
          </p>

          <Link
            to="/join"
            className="rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-black sm:px-8"
          >
            Join Us
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#0e0e0e] px-4 py-12 md:py-32"
      >
        {isMobile ? (
          <div className="mx-auto grid max-w-xl gap-3">
            {MESSAGES.map((message, index) => (
              <div
                key={message}
                className={`rounded-2xl border px-4 py-4 text-center text-sm font-semibold tracking-[0.18em] transition-colors ${
                  index === msgIdx
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-neutral-500"
                }`}
              >
                {message}
              </div>
            ))}
          </div>
        ) : (
          <TextFlippingBoard text={MESSAGES[msgIdx]} />
        )}
      </motion.div>
    </PageTransition>
  );
}
