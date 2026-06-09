"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { BoardMember } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface BoardMembersGridProps {
  members: BoardMember[];
}

export default function BoardMembersGrid({ members }: BoardMembersGridProps) {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMember(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => setSelectedMember(member)}
            className="group overflow-hidden rounded-[32px] border border-gray-200/70 dark:border-white/10 bg-white dark:bg-slate-950 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.25)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#C9A227]/20"
          >
            <div className="relative h-[420px] overflow-hidden bg-slate-200">
              <Image
                src={mediaUrl(member.image)}
                alt={member.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
                  {member.title || "Board Member"}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{member.name}</h3>
              </div>
            </div>
            <div className="p-6 text-left">
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-300 line-clamp-3">
                {member.bio || "Click to view the full description."}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0a3d2e] dark:text-white transition group-hover:text-[#C9A227]">
                View Profile
                <span className="text-[#C9A227]">→</span>
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] bg-white text-slate-900 shadow-2xl dark:bg-slate-950 dark:text-white">
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-slate-900 shadow-md transition hover:bg-white focus:outline-none dark:bg-slate-900 dark:text-white"
              aria-label="Close member description"
            >
              ×
            </button>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_0.75fr]">
              <div className="relative min-h-[380px] bg-slate-200">
                <Image
                  src={mediaUrl(selectedMember.image)}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>
              <div className="p-8 sm:p-10">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
                  About
                </span>
                <h2 className="mt-4 text-3xl font-semibold text-midnight_text dark:text-white">
                  {selectedMember.name}
                </h2>
                <p className="mt-2 text-sm font-medium text-[#0a3d2e] dark:text-white/80">
                  {selectedMember.title || "Board Member"}
                </p>
                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <p>{selectedMember.bio || "No description is available for this member."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
