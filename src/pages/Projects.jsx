import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import LazyImage from "../components/LazyImage";
import { EncryptedText } from "../components/ui/encrypted-text";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "../components/ui/3d-card";
import { usePrefersReducedMotion } from "../hooks/use-reduced-motion";
import { useScrollHover } from "../hooks/use-scroll-hover";

const projects = [
  {
    title: "Brand Identity System",
    dept: "Design",
    desc: "Complete visual language and brand guidelines for SKETCH.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500",
  },
  {
    title: "Internal Task Manager",
    dept: "R&D",
    desc: "A productivity tool built in-house for club operations.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
  },
  {
    title: "Freshers Campaign",
    dept: "Marketing",
    desc: "Social media onboarding campaign for new recruits.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500",
  },
  {
    title: "Club OS Dashboard",
    dept: "R&D",
    desc: "Internal ops dashboard for tracking club performance.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
  },
  {
    title: "Event Identity Pack",
    dept: "Design",
    desc: "Visual kit and motion assets for club events.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
  },
  {
    title: "Growth Analytics",
    dept: "Marketing",
    desc: "Member growth tracking and engagement reporting system.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
  },
];

const filters = ["All", "R&D", "Design", "O&PR", "Marketing"];

function ProjectCard({ project, prefersReducedMotion, cardMotion, cardTransition }) {
  const cardRef = useRef(null);
  const isAutoHovered = useScrollHover(cardRef);

  return (
    <motion.div
      ref={cardRef}
      key={project.title}
      layout={!prefersReducedMotion}
      {...cardMotion}
      transition={cardTransition}
    >
      <CardContainer containerClassName="py-2" isHovered={isAutoHovered}>
        <CardBody className="bg-[#111111] relative group/card border border-white/[0.1] w-full h-auto rounded-xl p-5 sm:p-6 hover:border-white/[0.2] transition-colors">
          <CardItem
            translateZ="50"
            className="text-lg font-bold text-white"
          >
            {project.title}
          </CardItem>

          <CardItem
            translateZ="60"
            className="mt-2"
          >
            <span className="text-xs border border-[#e8e8e0]/30 text-[#e8e8e0] rounded-full px-3 py-1">
              {project.dept}
            </span>
          </CardItem>

          <CardItem translateZ="100" className="w-full mt-4">
            <LazyImage
              src={project.image}
              alt={project.title}
              className="h-44 w-full object-cover rounded-xl sm:h-48 group-hover/card:shadow-xl"
            />
          </CardItem>

          <CardItem
            translateZ="40"
            className="mt-4"
          >
            <p className="text-neutral-400 text-sm leading-relaxed">
              {project.desc}
            </p>
          </CardItem>

          <div className="flex justify-end mt-6">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal text-white hover:text-[#e8e8e0] transition-colors"
            >
              View →
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const prefersReducedMotion = usePrefersReducedMotion();

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.dept === activeFilter);

  const cardMotion = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
      };

  const cardTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.3 };

  const sectionMotion = prefersReducedMotion
    ? { initial: false, whileInView: { opacity: 1 }, transition: { duration: 0.15 } }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20">
        {/* SECTION 1 — Heading */}
        <motion.div
          {...sectionMotion}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 mb-10 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
            <EncryptedText
              text="What We Build"
              encryptedClassName="text-neutral-500"
              revealedClassName="text-white text-3xl sm:text-4xl md:text-6xl font-bold font-sans"
              revealDelayMs={50}
            />
          </h1>
        </motion.div>

        {/* SECTION 2 — Filter Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { duration: 0.5, delay: 0.2 }
          }
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 flex gap-3 overflow-x-auto px-4 pb-2 sm:px-6 md:mb-16 md:flex-wrap md:pb-0"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-300 sm:px-5 ${
                activeFilter === filter
                  ? "border-white text-white"
                  : "border-white/20 text-neutral-500 hover:border-white/40 hover:text-neutral-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* SECTION 3 — Project Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  prefersReducedMotion={prefersReducedMotion}
                  cardMotion={cardMotion}
                  cardTransition={cardTransition}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
