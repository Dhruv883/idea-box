"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileDropdown } from "./ProfileDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();

  return (
    <div className="absolute z-20 w-full flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.png" width={200} height={200} alt="Logo" />
      </Link>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      <div
        className={`flex-col md:flex-row md:flex md:items-center md:gap-x-8 text-xl border-b-2 border-b-black md:border-none absolute md:relative bg-black md:bg-transparent top-16 md:top-auto right-0 md:right-auto w-full md:w-auto p-4 md:p-0 text-white  ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <a href="/ideas" className="text-center py-2 md:py-0">
          Ideas
        </a>
        <a href="/projects" className="text-center py-2 md:py-0">
          Projects
        </a>
        <a href="/submit" className="text-center py-2 md:py-0">
          Submit
        </a>
        {data && data.user ? (
          <ProfileDropdown />
        ) : (
          <Link
            href="/login"
            className="rounded-2xl flex justify-center mt-3 md:mt-0"
          >
            <Button className="text-xl px-4 py-5 rounded-xl">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
