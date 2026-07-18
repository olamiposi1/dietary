import React from "react";
import { motion } from "motion/react";

export default function HeroVisual() {
  // We can render a highly stylized, elegant vector 'R' with a custom leaf integration
  // to replicate the iconic Rivora Fresh 'R' in a gorgeous, modern plain color fashion.
  return (
    <div className="relative w-full flex items-center justify-center min-h-[350px] lg:min-h-[500px]">
      
      {/* Decorative clean circular accent behind the 'R' (keeping it plain and clean, no visual clutter) */}
      <div className="absolute w-[80%] aspect-square rounded-full bg-[#74C02A]/5 filter blur-3xl -z-10" />

      {/* Main Animated Graphic */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center p-4"
      >
        <motion.svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-[0_25px_40px_rgba(116,192,42,0.15)] filter"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Main Giant Letter 'R' body styled in clean organic lines */}
          <defs>
            <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#74C02A" />
              <stop offset="100%" stopColor="#8BE03C" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8BE03C" />
              <stop offset="100%" stopColor="#A4F152" />
            </linearGradient>
            <linearGradient id="stemGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5B9A1E" />
              <stop offset="100%" stopColor="#74C02A" />
            </linearGradient>
          </defs>

          {/* Giant Custom Letter R Path */}
          <path
            d="M 120 420 
               V 110 
               C 120 70, 160 50, 230 50 
               H 330 
               C 410 50, 460 95, 460 170 
               C 460 235, 410 275, 335 285 
               L 440 420 
               H 335 
               L 245 295 
               H 200 
               V 420 
               Z"
            fill="url(#rGrad)"
            className="transition-colors duration-300"
          />

          {/* Elegant Leaf Carving in the top bowl of R */}
          <path
            d="M 200 125
               H 320
               C 365 125, 385 145, 385 180
               C 385 215, 365 235, 320 235
               H 200
               Z"
            fill="#FFFFFF"
          />

          {/* Stylized leaf shape inside the R's counter cutout to reflect the reference brand logo */}
          <path
            d="M 230 180 
               C 230 150, 260 140, 290 140
               C 290 170, 260 220, 230 180 
               Z"
            fill="url(#leafGrad)"
          />

          {/* Accent Swoop inside R */}
          <path
            d="M 200 125 
               C 220 160, 210 210, 200 235
               V 125"
            fill="url(#stemGrad)"
          />

          {/* Floating Organic Accents (delicate geometric leaf vectors) */}
          <motion.path
            d="M 80 180 C 80 165, 100 160, 110 175 C 100 190, 90 190, 80 180 Z"
            fill="#74C02A"
            opacity="0.8"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          <motion.path
            d="M 410 90 C 425 90, 430 105, 420 115 C 405 110, 405 95, 410 90 Z"
            fill="#8BE03C"
            opacity="0.7"
            animate={{
              y: [0, 8, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.path
            d="M 140 370 C 130 380, 120 380, 125 365 C 135 355, 145 360, 140 370 Z"
            fill="#74C02A"
            opacity="0.6"
            animate={{
              y: [0, -6, 0],
              x: [0, 4, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </motion.svg>

        {/* Mini highlight tags next to R */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute top-[18%] left-[-5%] bg-white/95 backdrop-blur-sm border border-zinc-100 rounded-2xl p-3 shadow-xl flex items-center gap-2.5 cursor-pointer max-w-[150px]"
        >
          <span className="text-xl">🥗</span>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-black uppercase tracking-wider font-sans">Daily Meal</span>
            <span className="text-[10px] text-zinc-500">Custom Designed</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-[20%] right-[-5%] bg-white/95 backdrop-blur-sm border border-zinc-100 rounded-2xl p-3 shadow-xl flex items-center gap-2.5 cursor-pointer max-w-[150px]"
        >
          <span className="text-xl">📊</span>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-black uppercase tracking-wider font-sans">Diet Score</span>
            <span className="text-[10px] text-zinc-500">Track Progress</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
