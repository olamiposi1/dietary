import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame, Droplet, Activity, TrendingDown, Clock, Heart,
  Calendar, Check, Plus, MessageSquare, Sparkles, ShoppingBag,
  BookOpen, ChevronRight, Bell, Brain, ChevronLeft, RefreshCw,
  Search, Smile, ShieldAlert, Pill, Coffee, AlertCircle, Send
} from "lucide-react";

import type { HealthProfile } from "@/components/HealthProfileForm";

export default function PortalDashboard({ profile }: { profile: HealthProfile }) {
  // Navigation tabs within portal
  const [activeTab, setActiveTab] = useState<"overview" | "ai-features">("overview");

  // 1. Calorie state
  const [calories, setCalories] = useState<number>(0);
  const targetCalories = 2000;

  // 2. Water state
  const [water, setWater] = useState<number>(0);
  const targetWater = 2500;

  // 3. Blood sugar history
  const [glucose, setGlucose] = useState<{ time: string; value: number; label: string }[]>([]);
  const [newGlucose, setNewGlucose] = useState<string>("");

  // 4. Weight history
  const [weight, setWeight] = useState<number>(profile.weight ? parseFloat(profile.weight) : 0);

  // 5. Medication state (user-added)
  const [meds, setMeds] = useState<{ id: number; name: string; time: string; taken: boolean }[]>([]);
  const [newMedName, setNewMedName] = useState("");
  const [newMedTime, setNewMedTime] = useState("");

  // 6. Appointments (user-added)
  const [appointments, setAppointments] = useState<{ id: number; date: string; doctor: string; specialty: string; time: string }[]>([]);
  const [newApptDoctor, setNewApptDoctor] = useState("");
  const [newApptSpecialty, setNewApptSpecialty] = useState("");
  const [newApptDate, setNewApptDate] = useState("");
  const [newApptTime, setNewApptTime] = useState("");

  // Load saved tracking data on first load
  useEffect(() => {
    const saved = localStorage.getItem("dietary_tracking");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.calories !== undefined) setCalories(data.calories);
        if (data.water !== undefined) setWater(data.water);
        if (data.glucose) setGlucose(data.glucose);
        if (data.weight !== undefined) setWeight(data.weight);
        if (data.meds) setMeds(data.meds);
        if (data.appointments) setAppointments(data.appointments);
      } catch {
        // ignore corrupted data
      }
    }
  }, []);

  // Save tracking data whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "dietary_tracking",
      JSON.stringify({ calories, water, glucose, weight, meds, appointments })
    );
  }, [calories, water, glucose, weight, meds, appointments]);

  // 7. AI Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "ai", text: "Hello! I am your AI Nutrition Assistant. How can I help optimize your glycemic index or blood pressure threshold today?" },
  ]);

  // 8. AI Recipe Generator output
  const [generatedRecipe, setGeneratedRecipe] = useState<{ title: string, ingredients: string[], steps: string[] } | null>(null);
  const [generatingRecipe, setGeneratingRecipe] = useState(false);

  // 9. AI Grocery list
  const [groceryList, setGroceryList] = useState<string[]>([]);
  const [newGroceryItem, setNewGroceryItem] = useState("");
  const [generatingGrocery, setGeneratingGrocery] = useState(false);

  const generateGroceryList = async () => {
    setGeneratingGrocery(true);
    try {
      const res = await fetch("/api/grocery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conditions: profile.conditions,
          recipeTitle: generatedRecipe?.title || null,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.error || "Could not generate a grocery list right now.");
      } else {
        setGroceryList(data.items);
      }
    } catch {
      alert("Connection issue — please try again in a moment.");
    } finally {
      setGeneratingGrocery(false);
    }
  };

  // 10. AI Health Insights state
  const [currentInsight, setCurrentInsight] = useState<string>(
    "Click Refresh Insight to get your personalized AI health insight for today."
  );
  const [insightLoading, setInsightLoading] = useState(false);

  const generateInsight = async () => {
    setInsightLoading(true);
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conditions: profile.conditions,
          calories,
          targetCalories,
          water,
          targetWater,
          glucose,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setCurrentInsight(data.error || "Could not generate an insight right now.");
      } else {
        setCurrentInsight(data.insight);
      }
    } catch {
      setCurrentInsight("Connection issue — please try again in a moment.");
    } finally {
      setInsightLoading(false);
    }
  };

  // Handlers
  const handleAddGlucose = () => {
    const valNum = parseInt(newGlucose);
    if (!valNum || isNaN(valNum)) return;
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    setGlucose([...glucose, { time: "Custom Log", value: valNum, label: formattedTime }]);
    setNewGlucose("");
  };

  const toggleMedication = (id: number) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };
  const addMedication = () => {
    if (!newMedName.trim()) return;
    setMeds([...meds, { id: Date.now(), name: newMedName.trim(), time: newMedTime.trim() || "As needed", taken: false }]);
    setNewMedName("");
    setNewMedTime("");
  };

  const removeMedication = (id: number) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  const addAppointment = () => {
    if (!newApptDoctor.trim() || !newApptDate.trim()) return;
    setAppointments([...appointments, {
      id: Date.now(),
      doctor: newApptDoctor.trim(),
      specialty: newApptSpecialty.trim() || "General",
      date: newApptDate.trim(),
      time: newApptTime.trim() || "TBD",
    }]);
    setNewApptDoctor("");
    setNewApptSpecialty("");
    setNewApptDate("");
    setNewApptTime("");
  };

  const removeAppointment = (id: number) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const [chatLoading, setChatLoading] = useState(false);

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          conditions: profile.conditions,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setChatMessages(prev => [...prev, { sender: "ai", text: data.error || "Something went wrong. Please try again." }]);
      } else {
        setChatMessages(prev => [...prev, { sender: "ai", text: data.reply }]);
      }
    } catch {
      setChatMessages(prev => [...prev, { sender: "ai", text: "Connection issue — please try again in a moment." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const generateAIRecipe = async () => {
    setGeneratingRecipe(true);
    setGeneratedRecipe(null);

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conditions: profile.conditions,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Could not generate a recipe right now. Please try again.");
      } else {
        setGeneratedRecipe(data);
      }
    } catch {
      alert("Connection issue — please try again in a moment.");
    } finally {
      setGeneratingRecipe(false);
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen">

      {/* Dashboard Custom Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              Client Portal Area
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "overview"
                ? "bg-black text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
            >
              My Health Overview
            </button>
            <button
              onClick={() => setActiveTab("ai-features")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "ai-features"
                ? "bg-gradient-to-r from-zinc-900 to-zinc-950 text-[#4CAF50] border border-[#4CAF50]/20 shadow-md"
                : "bg-[#4CAF50]/10 text-[#4CAF50] hover:bg-[#4CAF50]/20"
                }`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>AI Health Suite</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Welcome Banner */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-tr from-zinc-900 to-zinc-950 p-8 md:p-12 text-white border border-zinc-800 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#4CAF50]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-extrabold text-[#4CAF50] uppercase tracking-wider w-fit mb-3">
                <Brain className="w-3.5 h-3.5" />
                <span>Personalized Therapeutic Area</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Welcome, {profile.name}!
              </h1>
              <p className="text-zinc-400 text-xs md:text-sm mt-1.5 max-w-xl">
                Your primary focus: <strong>{profile.conditions.join(" & ")}</strong>. Follow your daily guidelines below to stay on track.
              </p>
            </div>

            {/* Quick condition indicator summary box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shrink-0 w-full md:w-auto text-left">
              <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Active Conditions</span>
              <div className="space-y-1.5 mt-2">
                {profile.conditions.map((c) => (
                  <span key={c} className="block text-xs font-bold text-[#4CAF50]">• {c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Outer Tab Views container */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" ? (
            <motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* LEFT COLUMN: Biometrics & Trackers (7 cols on desktop) */}
              <div className="lg:col-span-7 space-y-8">

                {/* 1. Daily Calorie Tracker widget */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-black">Daily Calorie Balance</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">Energy intake threshold</p>

                    </div>
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    {/* Circle Indicator */}
                    <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="44" stroke="#F4F4F5" strokeWidth="6" fill="transparent" />
                        <circle
                          cx="56" cy="56" r="44"
                          stroke="#4CAF50" strokeWidth="6" fill="transparent"
                          strokeDasharray={2 * Math.PI * 44}
                          strokeDashoffset={2 * Math.PI * 44 - (calories / targetCalories) * 2 * Math.PI * 44}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-lg font-black text-black block">{calories}</span>
                        <span className="text-[8px] text-zinc-400 font-bold uppercase">/ {targetCalories} kcal</span>
                      </div>
                    </div>

                    {/* Micro Buttons */}
                    <div className="text-left space-y-2 flex-grow">
                      <p className="text-xs text-zinc-500">
                        You have consumed <strong>{Math.round((calories / targetCalories) * 100)}%</strong> of your clinical daily threshold.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setCalories(prev => Math.min(prev + 150, targetCalories + 400))}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black text-[10px] font-bold rounded-xl cursor-pointer"
                        >
                          + 150 kcal Snack
                        </button>
                        <button
                          onClick={() => setCalories(prev => Math.min(prev + 350, targetCalories + 400))}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black text-[10px] font-bold rounded-xl cursor-pointer"
                        >
                          + 350 kcal Meal
                        </button>
                        <button
                          onClick={() => setCalories(0)}
                          className="px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-400 text-[10px] font-bold rounded-xl cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Water Intake Tracker widget */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-black">Hydration Monitoring</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">Kidney clearance target: 2.5 Liters</p>
                    </div>
                    <Droplet className="w-5 h-5 text-blue-500 animate-bounce" />
                  </div>

                  <div className="flex items-center justify-between gap-6">
                    <div className="flex-grow">
                      <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((water / targetWater) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="block text-xs font-bold text-zinc-600 mt-2">
                        {water}ml / {targetWater}ml logged
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setWater(prev => Math.min(prev + 250, targetWater + 500))}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        + 250ml
                      </button>
                      <button
                        onClick={() => setWater(1000)}
                        className="px-2.5 py-2 bg-zinc-100 text-zinc-400 rounded-xl text-xs cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Blood Sugar Log widget */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-black">Blood Glucose Log</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">Target fast range: 70-130 mg/dL</p>
                    </div>
                    <Activity className="w-5 h-5 text-rose-500" />
                  </div>

                  {/* Sparkline list */}
                  <div className="grid grid-cols-4 gap-2 text-center my-4">
                    {glucose.map((g, idx) => (
                      <div key={idx} className="bg-zinc-50 p-2.5 rounded-2xl border border-zinc-100">
                        <span className="block text-[8px] font-bold text-zinc-400 uppercase truncate">{g.time}</span>
                        <span className="block text-sm font-black text-black mt-1">{g.value}</span>
                        <span className="block text-[7px] font-bold text-rose-500 uppercase tracking-widest">mg/dL</span>
                      </div>
                    ))}
                  </div>

                  {/* Form to log */}
                  <div className="flex items-stretch gap-2 mt-4 pt-4 border-t border-zinc-100">
                    <input
                      type="number"
                      value={newGlucose}
                      onChange={(e) => setNewGlucose(e.target.value)}
                      placeholder="e.g. 115"
                      className="flex-1 px-4 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#4CAF50]"
                    />
                    <button
                      onClick={handleAddGlucose}
                      className="px-4 bg-black hover:bg-zinc-800 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Log</span>
                    </button>
                  </div>
                </div>

                {/* 4. Weight Tracker widget */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">Weight Progress</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">Daily bio-impedance index</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="block text-lg font-black text-black">{weight} kg</span>
                      <span className="block text-[10px] text-zinc-400 uppercase tracking-widest">-2.3 kg this month</span>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setWeight(prev => parseFloat((prev - 0.2).toFixed(1)))}
                        className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-black font-bold flex items-center justify-center text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setWeight(prev => parseFloat((prev + 0.2).toFixed(1)))}
                        className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-black font-bold flex items-center justify-center text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Medication, Schedules, Recipes & Appointments (5 cols on desktop) */}
              <div className="lg:col-span-5 space-y-8">

                {/* 1. Medication Reminders */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-zinc-50 pb-3">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-black">Medication Reminders</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">Add your own prescriptions</p>
                    </div>
                    <Pill className="w-5 h-5 text-[#4CAF50]" />
                  </div>

                  <div className="space-y-3 mb-4">
                    {meds.length === 0 && (
                      <p className="text-xs text-zinc-400 italic">No medications added yet.</p>
                    )}
                    {meds.map((med) => (
                      <div
                        key={med.id}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${med.taken
                          ? "bg-zinc-50 border-zinc-200/60 opacity-60 line-through"
                          : "bg-white border-zinc-100 shadow-sm hover:border-[#4CAF50]/30"
                          }`}
                      >
                        <div
                          onClick={() => toggleMedication(med.id)}
                          className="flex items-center gap-3 cursor-pointer flex-grow"
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${med.taken ? "bg-[#4CAF50] border-[#4CAF50] text-white" : "border-zinc-300"
                            }`}>
                            {med.taken && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-black">{med.name}</span>
                            <span className="block text-[10px] text-zinc-400">{med.time}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMedication(med.id)}
                          className="text-zinc-300 hover:text-red-500 transition-colors px-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 pt-3 border-t border-zinc-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMedName}
                        onChange={(e) => setNewMedName(e.target.value)}
                        placeholder="Medication name"
                        className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#4CAF50]"
                      />
                      <input
                        type="text"
                        value={newMedTime}
                        onChange={(e) => setNewMedTime(e.target.value)}
                        placeholder="e.g. With breakfast"
                        className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#4CAF50]"
                      />
                    </div>
                    <button
                      onClick={addMedication}
                      className="px-4 py-2 bg-black hover:bg-zinc-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Medication</span>
                    </button>
                  </div>
                </div>

                {/* 2. Upcoming Appointments */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">Upcoming Appointments</h3>

                  <div className="space-y-3 mb-4">
                    {appointments.length === 0 && (
                      <p className="text-xs text-zinc-400 italic">No appointments added yet.</p>
                    )}
                    {appointments.map((appt) => (
                      <div key={appt.id} className="p-3.5 bg-zinc-50 border border-zinc-100 rounded-2xl text-left flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-zinc-100 text-zinc-600 shrink-0 mt-0.5">
                          <Calendar className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-grow">
                          <span className="block text-xs font-bold text-black">{appt.doctor}</span>
                          <span className="block text-[10px] text-zinc-500">{appt.specialty}</span>
                          <span className="block text-[9px] font-mono text-[#4CAF50] mt-1 bg-[#4CAF50]/10 w-fit px-1.5 py-0.5 rounded-full">
                            {appt.date} • {appt.time}
                          </span>
                        </div>
                        <button
                          onClick={() => removeAppointment(appt.id)}
                          className="text-zinc-300 hover:text-red-500 transition-colors px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 pt-3 border-t border-zinc-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newApptDoctor}
                        onChange={(e) => setNewApptDoctor(e.target.value)}
                        placeholder="Doctor name"
                        className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#4CAF50]"
                      />
                      <input
                        type="text"
                        value={newApptSpecialty}
                        onChange={(e) => setNewApptSpecialty(e.target.value)}
                        placeholder="Specialty"
                        className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#4CAF50]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newApptDate}
                        onChange={(e) => setNewApptDate(e.target.value)}
                        placeholder="e.g. Aug 05, 2026"
                        className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#4CAF50]"
                      />
                      <input
                        type="text"
                        value={newApptTime}
                        onChange={(e) => setNewApptTime(e.target.value)}
                        placeholder="e.g. 11:00 AM"
                        className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#4CAF50]"
                      />
                    </div>
                    <button
                      onClick={addAppointment}
                      className="px-4 py-2 bg-black hover:bg-zinc-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Appointment</span>
                    </button>
                  </div>
                </div>

                {/* 3. Recommended Recipes Placeholder & Preview list */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm text-left">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">Vetted Therapeutic Recipes</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-zinc-50 transition-colors">
                      <img
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"
                        alt="Recipe"
                        className="w-12 h-12 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="block text-xs font-bold text-black">Avocado & Quinoa Power Bowl</span>
                        <span className="block text-[10px] text-zinc-400 mt-0.5">320 kcal • Low Glycemic Index</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-zinc-50 transition-colors">
                      <img
                        src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100"
                        alt="Recipe"
                        className="w-12 h-12 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="block text-xs font-bold text-black">Crispy Baked Salmon Fillet</span>
                        <span className="block text-[10px] text-zinc-400 mt-0.5">450 kcal • Rich Omega-3 fats</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            /* AI FEATURES TAB */
            <motion.div
              key="ai-features-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >
              {/* Left Column: AI Health Insights & AI Chat (7 cols) */}
              <div className="lg:col-span-7 space-y-8">

                {/* 1. AI Health Insights */}
                <div className="bg-gradient-to-tr from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800 text-white shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#4CAF50] animate-spin" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#4CAF50]">
                      AI Health Insights
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed italic">
                    "{currentInsight}"
                  </p>

                  <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Calculated: 1 hour ago</span>
                    <button
                      onClick={generateInsight}
                      disabled={insightLoading}
                      className="text-xs text-[#4CAF50] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${insightLoading ? "animate-spin" : ""}`} />
                      <span>{insightLoading ? "Generating..." : "Refresh Insight"}</span>
                    </button>
                  </div>
                </div>

                {/* 2. AI Nutrition Assistant Chat */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[420px]">
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-[#4CAF50]" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-black uppercase tracking-wider">AI Nutrition Assistant</h3>
                          <p className="text-[9px] text-zinc-400">Vetted clinical responses</p>
                        </div>
                      </div>

                      <span className="text-[9px] bg-zinc-100 text-zinc-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        HIPAA Guarded
                      </span>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-4 max-h-[260px] overflow-y-auto p-2">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`p-3.5 rounded-2xl text-xs max-w-[80%] leading-relaxed ${msg.sender === "user"
                            ? "bg-[#4CAF50] text-black font-medium rounded-tr-none"
                            : "bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-tl-none"
                            }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="flex justify-start">
                          <div className="p-3.5 rounded-2xl text-xs bg-zinc-50 border border-zinc-100 text-zinc-400 rounded-tl-none">
                            Thinking...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Input area */}
                  <form onSubmit={handleSendChatMessage} className="flex items-stretch gap-2 mt-4 pt-4 border-t border-zinc-100">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about sodium intake, glycemic loads, or dinner recipes..."
                      className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#4CAF50]"
                    />
                    <button
                      type="submit"
                      className="px-4.5 bg-black hover:bg-zinc-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Ask AI</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

              </div>

              {/* Right Column: AI Recipe Generator & AI Grocery List Generator (5 cols) */}
              <div className="lg:col-span-5 space-y-8">

                {/* 1. AI Recipe Generator */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-3">AI Recipe Generator</h3>
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                    Instantly build a healthy, low-sodium dish based on your specific diagnostic parameters.
                  </p>

                  <button
                    onClick={generateAIRecipe}
                    disabled={generatingRecipe}
                    className="w-full py-3 bg-[#4CAF50] hover:bg-[#2E7D32] disabled:bg-zinc-100 text-black font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {generatingRecipe ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating Optimized Recipe...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-3.5 h-3.5" />
                        <span>Build Vetted Meal Recipe</span>
                      </>
                    )}
                  </button>

                  {generatedRecipe && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-left space-y-3"
                    >
                      <span className="text-[10px] bg-zinc-900 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Generated Recipe Output
                      </span>
                      <h4 className="text-xs font-extrabold text-black uppercase mt-1">
                        {generatedRecipe.title}
                      </h4>

                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-bold text-[#4CAF50] uppercase">Ingredients</span>
                        {generatedRecipe.ingredients.map((ing, i) => (
                          <span key={i} className="block text-[11px] text-zinc-500">• {ing}</span>
                        ))}
                      </div>

                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-bold text-[#4CAF50] uppercase">Steps</span>
                        {generatedRecipe.steps.map((st, i) => (
                          <span key={i} className="block text-[11px] text-zinc-500">{i + 1}. {st}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* 2. AI Grocery List Generator */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-black">AI Grocery List</h3>
                    <ShoppingBag className="w-4.5 h-4.5 text-zinc-400" />
                  </div>
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                    Vetted ingredients list corresponding directly to your diagnostic profile.
                  </p>
                  <button
                    onClick={generateGroceryList}
                    disabled={generatingGrocery}
                    className="w-full mb-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {generatingGrocery ? "Generating..." : "Generate AI Grocery List"}
                  </button>

                  <div className="space-y-2 max-h-[160px] overflow-y-auto p-1 border-b border-zinc-100 pb-3">
                    {groceryList.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs text-zinc-600 bg-zinc-50 px-3 py-2 rounded-xl">
                        <span>{item}</span>
                        <button
                          onClick={() => setGroceryList(groceryList.filter((_, i) => i !== index))}
                          className="text-zinc-300 hover:text-red-500 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-stretch gap-2 mt-4">
                    <input
                      type="text"
                      value={newGroceryItem}
                      onChange={(e) => setNewGroceryItem(e.target.value)}
                      placeholder="Add custom item..."
                      className="flex-1 px-4 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (!newGroceryItem.trim()) return;
                        setGroceryList([...groceryList, newGroceryItem.trim()]);
                        setNewGroceryItem("");
                      }}
                      className="px-4 bg-zinc-100 hover:bg-zinc-200 text-black font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

    </div>
  );
}
