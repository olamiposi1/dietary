import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  condition: string;
  review: string;
  avatar: string;
  rating: number;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const list: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Jenkins",
      condition: "Type 2 Diabetes",
      review: "Since using Dietary, I've found it much easier to choose meals that fit my diabetes management plan. My blood glucose spikes have leveled out incredibly over the past three months.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
      rating: 5,
    },
    {
      id: 2,
      name: "Arthur Pendelton",
      condition: "Hypertension / Cardiovascular",
      review: "I was struggling to keep my daily sodium intake below 1,500mg until I subscribed to Dietary. The automated meal card thresholds do all the difficult calculations for me.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
      rating: 5,
    },
    {
      id: 3,
      name: "Maria Velasquez",
      condition: "Chronic Kidney Disease (Stage 3)",
      review: "Managing potassium and phosphorus levels is a complete nightmare. Dietary's customized renal meal plans have given me my confidence back, and my nephrologist is highly impressed.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
      rating: 5,
    },
    {
      id: 4,
      name: "Jameson Reynolds",
      condition: "General Cardiac Health",
      review: "The custom interactive health portal makes tracking heart wellness feel natural instead of a chore. I can visualize my macros, log water, and generate healthy grocery lists in seconds.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
      rating: 5,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 bg-zinc-50 border border-zinc-100 rounded-full px-4 py-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#74C02A]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              User Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight mt-1">
            Real Reviews, Real Outcomes
          </h2>
          <p className="text-zinc-500 mt-3 text-sm md:text-base">
            See how Dietary is empowering thousands of individuals to manage their complex chronic conditions through premium nutrition.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto px-4 md:px-12">
          
          <div className="absolute top-12 left-0 text-zinc-100 pointer-events-none hidden md:block">
            <Quote className="w-24 h-24 transform -scale-x-100" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="relative bg-zinc-50 border border-zinc-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm text-left flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Profile Avatar Frame */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={list[currentIndex].avatar}
                    alt={list[currentIndex].name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#74C02A] text-white p-1.5 rounded-xl shadow-md">
                  <Star className="w-4 h-4 fill-white text-[#74C02A]" />
                </div>
              </div>

              {/* Review Text block */}
              <div className="flex-grow space-y-4">
                
                {/* Star rating */}
                <div className="flex gap-0.5">
                  {[...Array(list[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-[#74C02A] text-[#74C02A]" />
                  ))}
                </div>

                <p className="text-base md:text-lg text-black font-medium leading-relaxed font-sans italic">
                  "{list[currentIndex].review}"
                </p>

                {/* Patient Signature */}
                <div>
                  <h4 className="text-base font-bold text-black font-sans leading-none">
                    {list[currentIndex].name}
                  </h4>
                  <span className="inline-block text-xs font-bold text-[#74C02A] bg-[#74C02A]/10 px-2.5 py-0.5 rounded-full mt-2 uppercase tracking-wide">
                    {list[currentIndex].condition}
                  </span>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Buttons */}
          <div className="flex items-center justify-between mt-8">
            {/* Pagination Indicators */}
            <div className="flex gap-2">
              {list.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-[#74C02A]" : "w-2.5 bg-zinc-200"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Triggers */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-zinc-200 bg-white hover:bg-[#74C02A]/10 hover:border-[#74C02A]/30 text-black flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-zinc-200 bg-white hover:bg-[#74C02A]/10 hover:border-[#74C02A]/30 text-black flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
