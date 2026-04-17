import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { Link } from "react-router-dom";
import {
  IconHome,
  IconUser,
  IconLayoutGrid,
  IconCode,
  IconPencil,
} from "@tabler/icons-react";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Departments",
    link: "/departments",
    icon: <IconLayoutGrid className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "/projects",
    icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Join Us",
    link: "/join",
    icon: <IconPencil className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default function Navbar() {
  return (
    <>
      {/* Fixed SKETCH logo */}
      <Link
        to="/"
        className="fixed top-6 left-8 z-[5001] text-white text-xl font-bold tracking-[0.3em] hover:opacity-80 transition-opacity"
      >
        SKETCH
      </Link>
      <FloatingNav navItems={navItems} />
    </>
  );
}
