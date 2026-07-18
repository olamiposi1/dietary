"use client";

import { useState } from "react";
import { Heart, ArrowRight } from "lucide-react";

export interface HealthProfile {
    name: string;
    age: string;
    weight: string;
    conditions: string[];
    allergies: string;
    goals: string;
}

const CONDITION_OPTIONS = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Kidney Disease",
    "Weight Management",
    "General Wellness",
];

export default function HealthProfileForm({
    onComplete,
}: {
    onComplete: (profile: HealthProfile) => void;
}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [conditions, setConditions] = useState<string[]>([]);
    const [allergies, setAllergies] = useState("");
    const [goals, setGoals] = useState("");

    const toggleCondition = (c: string) => {
        setConditions((prev) =>
            prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || conditions.length === 0) return;
        onComplete({ name, age, weight, conditions, allergies, goals });
    };

    return (
        <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center px-6 py-12">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white border border-zinc-200/60 rounded-[2rem] shadow-sm p-8 md:p-10 space-y-6"
            >
                <div className="flex items-center gap-2 text-[#4CAF50]">
                    <Heart className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Create Your Health Profile</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A]">
                    Tell us about your health, so our AI can actually help.
                </h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-zinc-600 mb-1.5">Your name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Emmanuel"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#4CAF50]"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-zinc-600 mb-1.5">Age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="e.g. 29"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#4CAF50]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-600 mb-1.5">Weight (kg)</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="e.g. 70"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#4CAF50]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-600 mb-2">Health condition(s)</label>
                        <div className="flex flex-wrap gap-2">
                            {CONDITION_OPTIONS.map((c) => (
                                <button
                                    type="button"
                                    key={c}
                                    onClick={() => toggleCondition(c)}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${conditions.includes(c)
                                            ? "bg-[#4CAF50] border-[#4CAF50] text-black"
                                            : "bg-white border-zinc-200 text-zinc-600 hover:border-[#4CAF50]/40"
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-600 mb-1.5">Allergies (optional)</label>
                        <input
                            type="text"
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                            placeholder="e.g. peanuts, shellfish"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#4CAF50]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-600 mb-1.5">Health goals (optional)</label>
                        <input
                            type="text"
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="e.g. lower blood sugar, lose weight"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#4CAF50]"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3.5 bg-[#4CAF50] hover:bg-[#2E7D32] text-black font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
                >
                    <span>Start My Health Journey</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}