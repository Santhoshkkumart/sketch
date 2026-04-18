import React from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { EncryptedText } from "../components/ui/encrypted-text";
import { EvervaultCard, Icon } from "../components/ui/evervault-card";

const departments = [
  {
    name: "R&D",
    description: "Research, prototyping, and emerging tech",
    skills: ["ML", "Prototyping", "Research"],
  },
  {
    name: "Design",
    description: "Visual identity, UI/UX, and motion design",
    skills: ["Figma", "Branding", "Motion"],
  },
  {
    name: "O & PR",
    description: "Operations, events, and public relations",
    skills: ["Events", "Outreach", "Communication"],
  },
  {
    name: "Marketing",
    description: "Growth strategy, content, and analytics",
    skills: ["Social Media", "Content", "Analytics"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Departments() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0e0e0e] pt-24 md:pt-32 pb-16 md:pb-20">
        {/* SECTION 1 — Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 mb-14 md:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
            <EncryptedText
              text="Our Departments"
              encryptedClassName="text-neutral-500"
              revealedClassName="text-white text-3xl sm:text-4xl md:text-6xl font-bold font-sans"
              revealDelayMs={50}
            />
          </h1>
        </motion.div>

        {/* SECTION 2 — Department Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {departments.map((dept) => (
            <motion.div
              key={dept.name}
              variants={cardVariants}
              className="border border-white/[0.2] flex flex-col items-start p-3 sm:p-4 relative min-h-[24rem] sm:min-h-[28rem] md:h-[30rem] rounded-xl group hover:border-white/[0.35] transition-colors duration-300"
            >
              <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -top-3 -left-3 text-white" />
              <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -bottom-3 -left-3 text-white" />
              <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -top-3 -right-3 text-white" />
              <Icon className="absolute h-5 w-5 sm:h-6 sm:w-6 -bottom-3 -right-3 text-white" />

              <EvervaultCard text={dept.name} />

              <h2 className="text-white mt-4 text-sm sm:text-base font-light">
                {dept.description}
              </h2>

              <div className="flex flex-wrap gap-2 mt-4">
                {dept.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs border border-white/20 text-neutral-400 rounded-full px-3 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
