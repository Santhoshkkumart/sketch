import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IconHome,
  IconUser,
  IconLayoutGrid,
  IconCode,
  IconPencil,
} from "@tabler/icons-react";
import { SimpleHeader } from "./ui/simple-header";

const navItems = [
  { path: "/", label: "Home", icon: <IconHome className="h-5 w-5" /> },
  { path: "/about", label: "About", icon: <IconUser className="h-5 w-5" /> },
  { path: "/departments", label: "Departments", icon: <IconLayoutGrid className="h-5 w-5" /> },
  { path: "/projects", label: "Projects", icon: <IconCode className="h-5 w-5" /> },
  { path: "/join", label: "Join", icon: <IconPencil className="h-5 w-5" /> },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      {/* DESKTOP NAVBAR (SimpleHeader for Large Screens) */}
      <div className="hidden lg:block">
        <SimpleHeader />
      </div>

      {/* MOBILE NAVBAR (Small Screens Only) */}
      <div className="lg:hidden">
        {/* Mobile Header (Logo) */}
        <div className="fixed top-0 left-0 right-0 z-[5001] flex items-center px-6 py-6 bg-gradient-to-b from-[#0e0e0e] to-transparent pointer-events-none">
          <Link
            to="/"
            className="text-white text-base font-bold tracking-[0.22em] pointer-events-auto"
          >
            SKETCH
          </Link>
        </div>

        {/* Bottom Navigation Dock */}
        <div className="fixed bottom-0 left-1/2 z-[5000] w-full max-w-sm -translate-x-1/2 px-4 pb-6 pt-2 bg-gradient-to-t from-[#0e0e0e] to-transparent pointer-events-none">
          <div className="mx-auto flex h-16 w-full items-center justify-around rounded-2xl border border-white/[0.08] bg-black/80 px-2 shadow-2xl backdrop-blur-lg pointer-events-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center gap-1 px-3 py-1"
                >
                  <div
                    className={`transition-colors duration-300 ${
                      isActive ? "text-white" : "text-neutral-500"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors duration-300 ${
                      isActive ? "text-white" : "text-neutral-500"
                    }`}
                  >
                    {item.label === "Departments" ? "Depts" : item.label === "Join" ? "Join" : item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 h-1 w-1 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
