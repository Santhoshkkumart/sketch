import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:gap-12 md:text-left">
          <div className="flex flex-col items-center md:col-span-2 md:items-start">
            <h2 className="mb-4 text-lg font-bold tracking-[0.22em] text-white sm:text-xl md:text-2xl sm:tracking-[0.3em]">
              SKETCH
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-500">
              A college club that runs like a platform. Where ideas meet
              execution, and students become builders.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">
              Pages
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Departments", path: "/departments" },
                { name: "Projects", path: "/projects" },
                { name: "Join Us", path: "/join" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-500 transition-colors duration-200 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">
              Departments
            </h3>
            <ul className="space-y-3">
              {["R&D", "Design", "O & PR", "Marketing"].map((dept) => (
                <li key={dept}>
                  <span className="text-sm text-neutral-500">{dept}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-center md:mt-16 md:flex-row md:items-center md:text-left sm:pt-8">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} SKETCH. All rights reserved.
          </p>
          <p className="text-xs text-neutral-700">
            Built with passion. Shipped with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
