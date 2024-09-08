"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute w-full flex items-center justify-between p-4">
      <div>Logo</div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      <div
        className={`flex-col md:flex-row md:flex md:items-center md:gap-x-5 text-xl border-b-2 border-b-black md:border-none absolute md:relative bg-white md:bg-transparent top-16 md:top-auto right-0 md:right-auto w-full md:w-auto p-4 md:p-0 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <a href="" className="text-center py-2 md:py-0">
          Ideas
        </a>
        <a href="" className="text-center py-2 md:py-0">
          Projects
        </a>
        <a href="" className="text-center py-2 md:py-0">
          Submit
        </a>
        <Button className="text-xl px-4 py-5 rounded-2xl">Login</Button>
      </div>
    </div>
  );
}
