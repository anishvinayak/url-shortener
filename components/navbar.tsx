"use client";

import { FaGithub } from "react-icons/fa";

import { Link2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-600 p-2">
            <Link2 className="h-5 w-5 text-white" />
          </div>

          <span className="text-lg font-bold text-white">
            SnapLink
          </span>
        </div>

        <a
          href="https://github.com/yourusername/snaplink"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-zinc-800 p-2 text-zinc-300 transition hover:border-blue-500 hover:text-white"
        >
          <FaGithub className="h-5 w-5" />
        </a>
      </div>
    </nav>
  );
}