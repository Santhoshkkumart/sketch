import React from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { EncryptedText } from "../components/ui/encrypted-text";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { Timeline } from "../components/ui/timeline";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/draggable-card";
import { useMediaQuery } from "../hooks/use-media-query";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
};

const valueItems = [
  {
    title: "Collaborate",
    description: "Work across departments, share ideas, and build together.",
    link: "#",
  },
  {
    title: "Build",
    description: "Ship real projects. Turn concepts into systems.",
    link: "#",
  },
  {
    title: "Grow",
    description: "Develop skills, find your domain, and grow with the club.",
    link: "#",
  },
];

const timelineData = [
  {
    title: "Day One",
    content:
      "SKETCH was founded with one question: what if a college club ran like a startup?",
  },
  {
    title: "First Cohort",
    content:
      "20 members. 4 departments. One shared mission to build something real.",
  },
  {
    title: "First Shipped",
    content:
      "Our first internal project went live. Design met engineering met marketing.",
  },
  {
    title: "Scaling Up",
    content:
      "New members. Bigger projects. SKETCH is becoming the platform we always imagined.",
  },
];

const teamMembers = [
  {
    name: "Alex Rivera",
    role: "President",
    color: "bg-gradient-to-br from-violet-600 to-indigo-800",
    className: "absolute top-10 left-[15%] rotate-[-5deg]",
  },
  {
    name: "Sam Chen",
    role: "Design Lead",
    color: "bg-gradient-to-br from-pink-500 to-rose-700",
    className: "absolute top-40 left-[25%] rotate-[-7deg]",
  },
  {
    name: "Jordan Kim",
    role: "R&D Lead",
    color: "bg-gradient-to-br from-blue-500 to-cyan-700",
    className: "absolute top-5 left-[40%] rotate-[8deg]",
  },
  {
    name: "Taylor Okafor",
    role: "Marketing Head",
    color: "bg-gradient-to-br from-amber-500 to-orange-700",
    className: "absolute top-32 left-[55%] rotate-[10deg]",
  },
  {
    name: "Morgan Patel",
    role: "Ops Lead",
    color: "bg-gradient-to-br from-emerald-500 to-teal-700",
    className: "absolute top-20 right-[30%] rotate-[2deg]",
  },
  {
    name: "Casey Nguyen",
    role: "Dev Lead",
    color: "bg-gradient-to-br from-red-500 to-rose-800",
    className: "absolute top-24 left-[45%] rotate-[-7deg]",
  },
];

export default function About() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0e0e0e] pt-24 md:pt-32 pb-16 md:pb-20">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
          <h1 className="mb-6 text-3xl font-bold sm:text-4xl md:text-6xl">
            <EncryptedText
              text="We started with an idea."
              encryptedClassName="text-neutral-500"
              revealedClassName="text-white text-3xl font-bold font-sans sm:text-4xl md:text-6xl"
              revealDelayMs={50}
            />
          </h1>
        </motion.div>

        <motion.div {...fadeInUp} className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
          <p className="text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg">
            SKETCH is a college club that runs like a platform. We believe ideas
            deserve more than just conversations - they deserve execution. Across
            four departments, we research, design, operate, and grow. This is
            where students become builders.
          </p>
          <div className="divider mt-10 md:mt-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.15 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16 px-4 sm:px-6 md:mb-20"
        >
          <HoverEffect items={valueItems} />
        </motion.div>

        <motion.div {...fadeInUp} className="mb-16 md:mb-20">
          <Timeline data={timelineData} />
        </motion.div>

        <motion.div {...fadeInUp} className="relative">
          {isMobile ? (
            <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
              <p className="mb-6 select-none text-center text-2xl font-black text-neutral-800">
                The people behind the platform.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className={`${member.color} flex min-h-[16rem] flex-col items-center justify-center rounded-2xl p-6`}
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                      <span className="text-2xl font-bold text-white/80">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="mb-1 text-center text-lg font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-center text-sm text-white/70">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <DraggableCardContainer className="relative flex min-h-[600px] w-full items-center justify-center overflow-clip md:min-h-screen">
              <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 select-none text-center text-2xl font-black text-neutral-800 md:text-4xl">
                The people behind the platform.
              </p>
              {teamMembers.map((member) => (
                <DraggableCardBody key={member.name} className={member.className}>
                  <div
                    className={`${member.color} flex h-72 w-64 flex-col items-center justify-center rounded-xl p-6 md:h-80 md:w-80`}
                  >
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                      <span className="text-3xl font-bold text-white/80">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="mb-1 text-center text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-center text-sm text-white/70">
                      {member.role}
                    </p>
                  </div>
                </DraggableCardBody>
              ))}
            </DraggableCardContainer>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
