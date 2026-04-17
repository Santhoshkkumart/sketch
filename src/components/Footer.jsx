import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-white text-2xl font-bold tracking-[0.3em] mb-4">
              SKETCH
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
              A college club that runs like a platform. Where ideas meet
              execution, and students become builders.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
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
                    className="text-neutral-500 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              Departments
            </h3>
            <ul className="space-y-3">
              {["R&D", "Design", "O & PR", "Marketing"].map((dept) => (
                <li key={dept}>
                  <span className="text-neutral-500 text-sm">{dept}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} SKETCH. All rights reserved.
          </p>
          <p className="text-neutral-700 text-xs">
            Built with passion. Shipped with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
