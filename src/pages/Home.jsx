import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { Spotlight } from "../components/ui/spotlight";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { TextFlippingBoard } from "../components/ui/text-flipping-board";

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

// Configuration for the image sequence
const FRAME_COUNT = 240; 
const getFrameUrl = (index) => `/hero-sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

export default function Home() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [msgIdx, setMsgIdx] = useState(0);

  // 1. Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // 2. Scroll and Spring for smoothness
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.0001,
  });

  // 3. Render logic
  const render = useCallback((index) => {
    if (images.length === 0 || !canvasRef.current) return;
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
        0, 0, img.width, img.height,
        centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
      );
    }
  }, [images]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const currentFrame = Math.floor(smoothProgress.get() * (FRAME_COUNT - 1));
        render(currentFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [render, smoothProgress]);

  // Sync scroll to canvas
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(v * (FRAME_COUNT - 1)))
      );
      render(frameIndex);
    });
    return () => unsubscribe();
  }, [smoothProgress, render]);

  // Flipping board message rotation
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
      {/* SECTION 1 — Image Sequence Hero */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0e0e0e]">
          <canvas
            ref={canvasRef}
            className="h-full w-full object-cover"
          />
          
          {/* Dark gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
          

        </div>
      </div>

      {/* SECTION 2 — CTA with Spotlight */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0e0e0e]">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center justify-center px-4"
        >
          <TypewriterEffectSmooth words={words} />

          <p className="text-neutral-400 text-base md:text-lg mt-4 mb-8 text-center">
            SKETCH — where ideas become systems.
          </p>

          <Link
            to="/join"
            className="border border-white/30 bg-transparent text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide"
          >
            Join Us
          </Link>
        </motion.div>
      </div>

      {/* SECTION 3 — Flipping Board */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 md:py-32 bg-[#0e0e0e] px-4"
      >
        <TextFlippingBoard text={MESSAGES[msgIdx]} />
      </motion.div>
    </PageTransition>
  );
}
