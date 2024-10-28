"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PreLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#232323]">
      <div className="flex space-x-2">
        {[0.1, 0.2, 0.3].map((delay, index) => (
          <motion.div
            key={index}
            className="w-2 h-10 bg-[#0db078]"
            initial={{ scaleY: 0.75, opacity: 0.5 }}
            animate={{
              scaleY: [0.75, 1, 0.75],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: delay,
              repeatType: "loop",
            }}
          />
        ))}
      </div>
    </div>
  );
}
