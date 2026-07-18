import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Smartphone, Apple, Droplet, Activity, Download, 
  Sparkles, Calendar, Star, TrendingUp, Compass, Heart, Play
} from "lucide-react";

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState<"planner" | "tracker" | "dashboard">("planner");
  const [demoWater, setDemoWater] = useState<number>(1250);

  return (
    <section className="py-20 md:py-28 bg-zinc-950 text-white overflow-hidden relative">
      
      {/* Background decoration flares */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#74C02A]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: CSS iPhone / Phone Mockup showcasing the Interactive UI */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Soft decorative ring behind the mockup */}
            <div className="absolute inset-0 m-auto w-[360px] h-[360px] bg-gradient-to-tr from-[#74C02A]/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", damping: 20 }}
              className="relative w-[300px] h-[610px] rounded-[3.2rem] bg-zinc-900 p-3.5 shadow-2xl border-[6px] border-zinc-800 flex flex-col justify-between overflow-hidden"
            >
              
              {/* Phone Camera Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-40 flex items-center justify-center">
                <div className="w-12 h-1 bg-black rounded-full mb-1.5" />
                <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full ml-3 mb-1.5" />
              </div>

              {/* Phone Inner Content Canvas */}
              <div className="relative flex-1 w-full h-full bg-zinc-50 rounded-[2.5rem] p-4 text-black flex flex-col justify-between overflow-hidden">
                
                {/* Simulated App Header */}
                <div className="pt-5 pb-3 border-b border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 bg-[#74C02A] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold font-sans">D</span>
                    </div>
                    <span className="text-xs font-extrabold tracking-tight">Dietary Go</span>
                  </div>
                  
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => setActiveTab("planner")}
                      className={`text-[9px] font-extrabold px-2 py-1 rounded-full transition-all ${
                        activeTab === "planner" ? "bg-black text-white" : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      Plan
                    </button>
                    <button 
                      onClick={() => setActiveTab("tracker")}
                      className={`text-[9px] font-extrabold px-2 py-1 rounded-full transition-all ${
                        activeTab === "tracker" ? "bg-black text-white" : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      Water
                    </button>
                    <button 
                      onClick={() => setActiveTab("dashboard")}
                      className={`text-[9px] font-extrabold px-2 py-1 rounded-full transition-all ${
                        activeTab === "dashboard" ? "bg-black text-white" : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      Dash
                    </button>
                  </div>
                </div>

                {/* Main mini-view screen based on tab selection */}
                <div className="flex-1 py-4 flex flex-col justify-start overflow-hidden">
                  
                  {activeTab === "planner" && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-3 text-left"
                    >
                      <span className="text-[10px] font-bold text-[#74C02A] uppercase tracking-wider">Today's Meal Plan</span>
                      
                      <div className="p-3 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center gap-2.5">
                        <img 
                          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80" 
                          alt="Bowl" 
                          className="w-10 h-10 object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-extrabold text-black truncate">Avocado Breakfast Bowl</h4>
                          <span className="block text-[8px] text-zinc-400 font-medium">08:30 AM • 320 kcal</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center gap-2.5">
                        <img 
                          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=100&q=80" 
                          alt="Soup" 
                          className="w-10 h-10 object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-extrabold text-black truncate">Garden Lentil Soup</h4>
                          <span className="block text-[8px] text-zinc-400 font-medium">01:15 PM • 280 kcal</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center gap-2.5">
                        <img 
                          src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100&q=80" 
                          alt="Salmon" 
                          className="w-10 h-10 object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-extrabold text-black truncate">Herb-Crusted Salmon</h4>
                          <span className="block text-[8px] text-zinc-400 font-medium">07:30 PM • 450 kcal</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "tracker" && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 text-center py-4"
                    >
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block">Fluid Intake tracker</span>
                      
                      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-20" />
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex flex-col items-center justify-center text-white shadow-md">
                          <Droplet className="w-5 h-5 mb-0.5 animate-bounce" />
                          <span className="text-[11px] font-extrabold leading-none">{demoWater}ml</span>
                          <span className="text-[7px] font-bold uppercase mt-1">Goal: 2.5L</span>
                        </div>
                      </div>

                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setDemoWater((w) => Math.min(w + 250, 2500))}
                          className="px-3 py-1.5 bg-blue-500 text-white text-[9px] font-bold rounded-xl cursor-pointer hover:bg-blue-600 transition-colors"
                        >
                          + 250ml Cup
                        </button>
                        <button 
                          onClick={() => setDemoWater(500)}
                          className="px-3 py-1.5 bg-zinc-200 text-zinc-600 text-[9px] font-bold rounded-xl cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "dashboard" && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-3.5 text-left"
                    >
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Metabolic Summary</span>
                      
                      {/* Calorie Progress bar */}
                      <div className="p-3 bg-white border border-zinc-100 rounded-2xl shadow-sm">
                        <div className="flex justify-between text-[8px] font-extrabold text-black mb-1">
                          <span>Today's Energy</span>
                          <span>1,420 / 2,000 kcal</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#74C02A] rounded-full w-[71%]" />
                        </div>
                      </div>

                      {/* Blood Sugar Mini metric */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-2.5 bg-rose-50 rounded-xl">
                          <span className="block text-[7px] font-bold text-rose-500 uppercase tracking-wider">Glucose</span>
                          <span className="block text-xs font-black text-black mt-1">98 mg/dL</span>
                          <span className="block text-[6px] text-zinc-400 uppercase font-bold tracking-wider mt-0.5">Stable</span>
                        </div>
                        <div className="p-2.5 bg-emerald-50 rounded-xl">
                          <span className="block text-[7px] font-bold text-emerald-500 uppercase tracking-wider">Active Day</span>
                          <span className="block text-xs font-black text-black mt-1">11,250 steps</span>
                          <span className="block text-[6px] text-zinc-400 uppercase font-bold tracking-wider mt-0.5">Met</span>
                        </div>
                      </div>

                      {/* Weight goals */}
                      <div className="p-2.5 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[9px] font-bold text-black">Weight Indicator</span>
                        </div>
                        <span className="text-[9px] font-extrabold text-black">68.4 kg</span>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Simulated App Navigation bar */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-around text-zinc-400">
                  <Compass className="w-4.5 h-4.5 text-[#74C02A]" />
                  <Calendar className="w-4.5 h-4.5" />
                  <Activity className="w-4.5 h-4.5" />
                  <Heart className="w-4.5 h-4.5" />
                </div>

              </div>
            </motion.div>
          </div>

          {/* Right Side: Copy & App Store Download buttons */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-1 bg-[#74C02A] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#74C02A]">
                Always Connected
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Take Your Nutrition Anywhere
            </h2>
            
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
              Access your personalized clinical meal plans, update your metabolic trackers in seconds, and stay securely connected to your therapeutic dietary health goals anytime, anywhere.
            </p>

            {/* Bullets */}
            <ul className="space-y-3 pt-2 text-zinc-300">
              <li className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#74C02A]" />
                <span>Instant notifications for custom medication and water reminders.</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#74C02A]" />
                <span>Syncs directly with Apple Health, Fitbit, and continuous glucose monitors.</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#74C02A]" />
                <span>HIPAA-compliant client-doctor chat portal always active in your pocket.</span>
              </li>
            </ul>

            {/* Store Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              
              {/* App Store button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-zinc-100 text-black px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-3 shadow-md cursor-pointer transition-all"
              >
                <Smartphone className="w-5 h-5 text-black" />
                <div className="text-left leading-tight">
                  <span className="block text-[9px] text-zinc-500 font-normal">Download on the</span>
                  <span className="block text-sm font-extrabold">App Store</span>
                </div>
              </motion.button>

              {/* Google Play button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-3 shadow-md cursor-pointer transition-all"
              >
                <Play className="w-5 h-5 text-white fill-white" />
                <div className="text-left leading-tight">
                  <span className="block text-[9px] text-zinc-400 font-normal">GET IT ON</span>
                  <span className="block text-sm font-extrabold font-sans">Google Play</span>
                </div>
              </motion.button>

            </div>

            {/* Stats Badge */}
            <div className="flex items-center gap-2 pt-6">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                ].map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-zinc-950 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                Rated <strong className="text-white">4.9/5 stars</strong> by over 10,000+ happy patient reviews.
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
