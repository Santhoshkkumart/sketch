import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeBackground from "./components/HomeBackground";
import { LoaderOne } from "./components/ui/loader";

import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Projects from "./pages/Projects";
import Join from "./pages/Join";

const HERO_FRAME_COUNT = 240;
const getHeroFrameUrl = (index) =>
  `/hero-sequence/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

function preloadHeroSequence() {
  if (
    typeof window === "undefined" ||
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return Promise.resolve();
  }

  let settled = 0;
  return new Promise((resolve) => {
    for (let i = 1; i <= HERO_FRAME_COUNT; i += 1) {
      const img = new Image();
      img.onload = img.onerror = () => {
        settled += 1;
        if (settled === HERO_FRAME_COUNT) resolve();
      };
      img.src = getHeroFrameUrl(i);
    }
  });
}

// Scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Initial loader
  useEffect(() => {
    let cancelled = false;
    const minimumLoader = new Promise((resolve) => setTimeout(resolve, 1500));

    Promise.all([minimumLoader, preloadHeroSequence()]).then(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0e0e0e] flex items-center justify-center z-[9999]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-white text-3xl font-bold tracking-[0.4em]">
            SKETCH
          </h1>
          <LoaderOne />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Background layer — MUST be outside the main content wrapper */}
      <HomeBackground />

      <div className="dark min-h-screen relative z-10">
        <ScrollToTop />
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}

export default App;
