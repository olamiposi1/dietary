import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame, Droplet, Dumbbell, Apple, LogIn, Activity,
  Calendar, Check, Plus, RefreshCw, Sparkles, TrendingDown,
  Clock, ShieldAlert, Heart, Settings, User, Bell
} from "lucide-react";

interface BloodSugarEntry {
  time: string;
  value: number;
}

export default function DashboardPreview() {
  // Real-time interactive state
  const [calories, setCalories] = useState<number>(1420);
  const calorieGoal = 2000;

  const [water, setWater] = useState<number>(1750); // ml
  const waterGoal = 2500; // ml

  const [protein, setProtein] = useState<number>(68); // g
  const proteinGoal = 100;

  const [carbs, setCarbs] = useState<number>(155); // g
  const carbsGoal = 220;

  const [fat, setFat] = useState<number>(48); // g
  const fatGoal = 70;

  const [bloodSugar, setBloodSugar] = useState<BloodSugarEntry[]>([
    { time: "08:00 AM", value: 95 },
    { time: "11:30 AM", value: 110 },
    { time: "02:00 PM", value: 105 },
    { time: "05:00 PM", value: 120 },
    { time: "08:00 PM", value: 115 },
  ]);

  const [schedule, setSchedule] = useState([
    { id: 1, meal: "Avocado Breakfast Bowl", time: "08:30 AM", done: true, calories: 320 },
    { id: 2, meal: "Garden Lentil Soup", time: "01:15 PM", done: true, calories: 280 },
    { id: 3, meal: "Greek Yogurt Parfait Snack", time: "04:30 PM", done: false, calories: 240 },
    { id: 4, meal: "Salmon with Asparagus", time: "07:30 PM", done: false, calories: 450 },
  ]);

  const [feedbackMsg, setFeedbackMsg] = useState<string>("");

  // Action Handlers
  const handleDrinkWater = () => {
    if (water >= waterGoal) {
      setWater(0); // Reset for interactive play
      showFeedback("Water tracker reset for the demo!");
      return;
    }
    setWater((prev) => Math.min(prev + 250, waterGoal));
    showFeedback("Logged 250ml Water Intake! 💧");
  };

  const handleLogSnack = () => {
    if (calories >= calorieGoal + 400) {
      // Reset demo
      setCalories(800);
      setProtein(35);
      setCarbs(90);
      setFat(25);
      showFeedback("Nutrition values reset for the demo!");
      return;
    }
    setCalories((prev) => prev + 180);
    setProtein((prev) => Math.min(prev + 12, proteinGoal));
    setCarbs((prev) => Math.min(prev + 20, carbsGoal));
    setFat((prev) => Math.min(prev + 5, fatGoal));
    showFeedback("Logged healthy high-protein snack! 🍎 (+180 kcal)");
  };

  const handleLogBloodSugar = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    // Simulating a realistic healthy blood sugar fluctuation (between 85 and 135 mg/dL)
    const randomVal = Math.floor(Math.random() * (135 - 85 + 1)) + 85;

    setBloodSugar((prev) => {
      const updated = [...prev, { time: formattedTime, value: randomVal }];
      if (updated.length > 6) updated.shift(); // Keep only last 6 entries
      return updated;
    });
    showFeedback(`Logged Blood Sugar: ${randomVal} mg/dL! 📊`);
  };

  const toggleScheduleMeal = (id: number) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedDone = !item.done;
          if (updatedDone) {
            // Add calories
            setCalories((c) => Math.min(c + item.calories, calorieGoal + 500));
          } else {
            // Subtract calories
            setCalories((c) => Math.max(c - item.calories, 0));
          }
          return { ...item, done: updatedDone };
        }
        return item;
      })
    );
  };

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg("");
    }, 3000);
  };

  // Helper calculation for SVG circles
  const calPercent = Math.min((calories / calorieGoal) * 100, 100);
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (calPercent / 100) * circumference;

  return (
    <section className="py-20 md:py-28 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-[#4CAF50] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Interactive Preview
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
              Daily Nutrition Dashboard
            </h2>
            <p className="text-zinc-500 mt-3 text-sm md:text-base leading-relaxed">
              Experience the client nutrition portal. Log your daily wellness habits, monitor metabolic trends, and watch your nutrition goals update in real-time.
            </p>
          </div>

          {/* Interactive Live Demo Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-zinc-100 shadow-sm">
            <button
              onClick={handleDrinkWater}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <Droplet className="w-3.5 h-3.5" />
              <span>Drink 250ml</span>
            </button>
            <button
              onClick={handleLogSnack}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#4CAF50] rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <Apple className="w-3.5 h-3.5" />
              <span>Log Healthy Snack</span>
            </button>
            <button
              onClick={handleLogBloodSugar}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Log Glucose</span>
            </button>
          </div>
        </div>

        {/* Action toast helper */}
        <AnimatePresence>
          {feedbackMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-8 p-3.5 bg-zinc-900 text-white rounded-2xl flex items-center justify-between text-xs font-bold shadow-lg max-w-md mx-auto"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4CAF50] animate-spin" />
                <span>{feedbackMsg}</span>
              </div>
              <button onClick={() => setFeedbackMsg("")} className="text-zinc-400 hover:text-white ml-2">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Giant Dashboard Container with natural shadows & elegant green borders */}
        <div className="relative w-full rounded-[2.5rem] bg-zinc-900 p-3 md:p-6 shadow-2xl border-4 border-zinc-950 overflow-hidden">

          {/* Subtle natural context gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#4CAF50]/5 opacity-40 pointer-events-none" />

          {/* Actual Dashboard Layout (Flex with Sidebar and Main content block) */}
          <div className="relative z-10 flex flex-col lg:flex-row rounded-[2rem] bg-zinc-50 border border-zinc-100 overflow-hidden shadow-inner">

            {/* Dashboard Sidebar - Styled beautifully like the reference layout */}
            <aside className="w-full lg:w-[80px] bg-zinc-900 flex flex-row lg:flex-col items-center justify-between lg:py-8 px-6 py-4 border-b lg:border-b-0 lg:border-r border-zinc-800 shrink-0">

              {/* Sidebar Logo */}
              <div className="w-10 h-10 bg-[#4CAF50] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-black font-sans">D</span>
              </div>

              {/* Sidebar Nav Icons */}
              <nav className="flex flex-row lg:flex-col items-center gap-5 md:gap-8 my-auto">
                <button aria-label="Dashboard" className="p-2.5 rounded-xl bg-[#4CAF50]/10 text-[#4CAF50] hover:scale-105 transition-all">
                  <Activity className="w-5 h-5" />
                </button>
                <button aria-label="Meals" className="p-2.5 rounded-xl text-zinc-500 hover:text-white transition-all hover:scale-105">
                  <Apple className="w-5 h-5" />
                </button>
                <button aria-label="Schedule" className="p-2.5 rounded-xl text-zinc-500 hover:text-white transition-all hover:scale-105">
                  <Calendar className="w-5 h-5" />
                </button>
                <button aria-label="Alerts" className="p-2.5 rounded-xl text-zinc-500 hover:text-white transition-all hover:scale-105">
                  <Heart className="w-5 h-5" />
                </button>
              </nav>

              {/* Settings / User Action */}
              <div className="hidden lg:flex flex-col items-center gap-4">
                <button aria-label="Settings" className="p-2.5 rounded-xl text-zinc-500 hover:text-white transition-all">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-full bg-[#4CAF50] border border-white/20 flex items-center justify-center text-black font-bold text-xs">
                  S
                </div>
              </div>

            </aside>

            {/* Main Workspace Section */}
            <main className="flex-1 p-6 md:p-8 xl:p-10 space-y-8 overflow-x-hidden">

              {/* Dashboard Inner Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 pb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black font-sans tracking-tight">
                    Hi Sarah!
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1">
                    Your personalized nutritional health dashboard is updated for today.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLogSnack}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#4CAF50]" />
                    <span>Add Meal</span>
                  </button>

                  <div className="relative p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:text-black cursor-pointer">
                    <Bell className="w-4.5 h-4.5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4CAF50] border-2 border-white" />
                  </div>

                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces"
                    alt="Sarah"
                    className="w-10 h-10 rounded-full border border-zinc-300 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Row 1: Key Metabolic Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* 1. Today's Calories Ring (Large Card) */}
                <div className="md:col-span-5 bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Today's Calories</span>
                    <div className="p-2 bg-orange-50 rounded-xl">
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>

                  {/* Circular Ring Graphic */}
                  <div className="flex items-center justify-around py-2 gap-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        {/* Background track circle */}
                        <circle
                          cx="64"
                          cy="64"
                          r={radius}
                          stroke="#F4F4F5"
                          strokeWidth={strokeWidth}
                          fill="transparent"
                        />
                        {/* Animated progress circle */}
                        <motion.circle
                          cx="64"
                          cy="64"
                          r={radius}
                          stroke="#4CAF50"
                          strokeWidth={strokeWidth}
                          fill="transparent"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Inner Text info */}
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-black leading-none">{calories}</span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">/ {calorieGoal}</span>
                      </div>
                    </div>

                    {/* Calorie Stats list */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                        <span className="text-xs text-zinc-500 font-medium">Logged ({Math.round(calPercent)}%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-100 border border-zinc-200" />
                        <span className="text-xs text-zinc-500 font-medium">Remaining ({calorieGoal - calories} kcal)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Status: Optimal</span>
                    <span className="text-xs font-extrabold text-[#4CAF50]">Active Diet</span>
                  </div>
                </div>

                {/* 2. Micro Macros & Water Progress Bars */}
                <div className="md:col-span-7 bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Nutritional Targets</span>
                      <span className="text-xs font-bold text-[#4CAF50] bg-emerald-50 px-2 py-0.5 rounded-full">Optimal Range</span>
                    </div>

                    {/* Progress sliders */}
                    <div className="space-y-4">
                      {/* Protein */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-black mb-1">
                          <span>Protein</span>
                          <span className="text-zinc-500">{protein}g / {proteinGoal}g</span>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#4CAF50] rounded-full"
                            animate={{ width: `${(protein / proteinGoal) * 100}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>

                      {/* Carbs */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-black mb-1">
                          <span>Carbohydrates</span>
                          <span className="text-zinc-500">{carbs}g / {carbsGoal}g</span>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            animate={{ width: `${(carbs / carbsGoal) * 100}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>

                      {/* Fat */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-black mb-1">
                          <span>Healthy Fats</span>
                          <span className="text-zinc-500">{fat}g / {fatGoal}g</span>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-pink-500 rounded-full"
                            animate={{ width: `${(fat / fatGoal) * 100}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Water intake integrated widget */}
                  <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Droplet className="w-5 h-5 text-blue-500 animate-bounce" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-black">Water Log</span>
                        <span className="text-[11px] text-zinc-500 font-medium">{water}ml / {waterGoal}ml</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => {
                          const limit = waterGoal / 10;
                          const active = water >= (i + 1) * limit;
                          return (
                            <div
                              key={i}
                              className={`w-2.5 h-6 rounded-full transition-all duration-300 ${active ? "bg-blue-500" : "bg-zinc-100"
                                }`}
                            />
                          );
                        })}
                      </div>
                      <button
                        onClick={handleDrinkWater}
                        className="p-1.5 rounded-lg border border-zinc-200 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                        title="Add Water Cup (+250ml)"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Row 2: Advanced Charts: Blood Sugar & Weight Progress & Meal Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* 1. Interactive Blood Sugar Sparkline / Chart */}
                <div className="md:col-span-7 bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Blood Sugar Log</span>
                      <span className="text-xs text-zinc-500 mt-0.5">Metabolic trend monitoring</span>
                    </div>

                    <span className="text-xs font-extrabold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Glucose Live</span>
                    </span>
                  </div>

                  {/* High fidelity interactive SVG line graph mapping blood sugar history */}
                  <div className="relative h-44 w-full flex items-end pt-4">

                    {/* SVG canvas */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="400" y2="30" stroke="#F4F4F5" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="75" x2="400" y2="75" stroke="#F4F4F5" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="120" x2="400" y2="120" stroke="#F4F4F5" strokeWidth="1" strokeDasharray="4 4" />

                      {/* Map bloodSugar points inside coordinates */}
                      {(() => {
                        const maxVal = 140;
                        const minVal = 70;
                        const span = maxVal - minVal;
                        const widthBetween = 400 / (bloodSugar.length - 1 || 1);

                        const coords = bloodSugar.map((item, idx) => {
                          const x = idx * widthBetween;
                          // calculate inverse percentage height
                          const ratio = (item.value - minVal) / span;
                          const y = 140 - (ratio * 110); // leave 30px padding on top/bottom
                          return { x, y, val: item.value, label: item.time };
                        });

                        const dPath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(" ");
                        const fillPath = `${dPath} L ${coords[coords.length - 1].x} 150 L ${coords[0].x} 150 Z`;

                        return (
                          <>
                            {/* Area Gradient Fill */}
                            <path d={fillPath} fill="url(#glucoseGradient)" opacity="0.12" />

                            {/* Line path */}
                            <path d={dPath} fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                            {/* Coordinate Dots & Hover tooltips */}
                            {coords.map((c, i) => (
                              <g key={i}>
                                <circle
                                  cx={c.x}
                                  cy={c.y}
                                  r="5"
                                  fill="#FFFFFF"
                                  stroke="#F43F5E"
                                  strokeWidth="2.5"
                                  className="cursor-pointer transition-transform duration-200 hover:scale-150"
                                />
                                <text
                                  x={c.x}
                                  y={c.y - 12}
                                  textAnchor="middle"
                                  className="text-[10px] font-extrabold fill-black font-mono bg-white"
                                >
                                  {c.val}
                                </text>
                                <text
                                  x={c.x}
                                  y="145"
                                  textAnchor="middle"
                                  className="text-[8px] font-bold fill-zinc-400 font-sans"
                                >
                                  {c.label.split(" ")[0]}
                                </text>
                              </g>
                            ))}

                            {/* SVG Defs for linear gradient */}
                            <defs>
                              <linearGradient id="glucoseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#F43F5E" />
                                <stop offset="100%" stopColor="#FFFFFF" />
                              </linearGradient>
                            </defs>
                          </>
                        );
                      })()}
                    </svg>

                  </div>

                  {/* Details label */}
                  <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
                    <span>Healthy Range: 80-130 mg/dL</span>
                    <button
                      onClick={handleLogBloodSugar}
                      className="text-[#4CAF50] hover:text-[#2E7D32] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Add Entry</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. Weight Loss Progress Sparkline / Goal & Upcoming meals list */}
                <div className="md:col-span-5 bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Meal Schedule</span>
                    <div className="p-2 bg-blue-50 rounded-xl">
                      <Clock className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>

                  {/* Schedule interactive checklist */}
                  <div className="space-y-3 flex-grow my-2">
                    {schedule.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleScheduleMeal(item.id)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${item.done
                            ? "bg-zinc-50 border-zinc-200/60 opacity-60 line-through"
                            : "bg-white border-zinc-100 shadow-sm hover:border-[#4CAF50]/30"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${item.done
                                ? "bg-[#4CAF50] border-[#4CAF50] text-white"
                                : "border-zinc-300 bg-white group-hover:border-[#4CAF50]"
                              }`}
                          >
                            {item.done && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-black leading-tight">
                              {item.meal}
                            </span>
                            <span className="text-[10px] text-zinc-400 mt-0.5">
                              {item.time} • {item.calories} kcal
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-zinc-400">
                          {item.done ? "Done" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Weight Progress sparkline */}
                  <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-emerald-500" />
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-black">Weight: 68.4 kg</span>
                        <span className="text-[10px] text-zinc-400">-2.3 kg this month</span>
                      </div>
                    </div>

                    <span className="text-[10px] bg-emerald-50 text-[#4CAF50] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      On Track
                    </span>
                  </div>

                </div>

              </div>

            </main>

          </div>

        </div>

      </div>
    </section>
  );
}
