import React from "react";
import { motion } from "framer-motion";

const PreLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#232323]">
      <div className="flex space-x-2">
        <motion.div
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
            repeatDelay: 0.1,
            repeatType: "loop",
          }}
        />
        <motion.div
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
            repeatDelay: 0.2,
            repeatType: "loop",
          }}
        />
        <motion.div
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
            repeatDelay: 0.3,
            repeatType: "loop",
          }}
        />
      </div>
    </div>
  );
};

export default PreLoader;
