import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { api, BoardMember } from "@/lib/api";
import BoardMembersGrid from "@/components/BoardMembers/BoardMembersGrid";

export const metadata: Metadata = { title: "Board Members" };

export default async function BoardMembersPage() {
  let members: BoardMember[] = [];
  try {
    members = await api.boardMembers();
  } catch {
    members = [];
  }

  return (
    <>
      <HeroSub title="Our Team" />
      <section className="pt-20 pb-24 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-end">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#C9A227]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#7e620b]">
                Leadership Team
              </span>
              <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-midnight_text dark:text-white">
                Meet the people powering our mission.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300">
                Our board members bring decades of experience, community trust, and strategic vision to every project we deliver. They are committed to transparency, service, and measurable impact.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[32px] bg-white/80 dark:bg-slate-900/80 border border-gray-200/70 dark:border-white/10 p-6 shadow-xl backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.28em] font-semibold text-[#C9A227]">Members</p>
                <p className="mt-4 text-3xl font-semibold text-midnight_text dark:text-white">{members.length}</p>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">Dedicated board members who guide and support our work across programs and causes.</p>
              </div>
              <div className="rounded-[32px] bg-white/80 dark:bg-slate-900/80 border border-gray-200/70 dark:border-white/10 p-6 shadow-xl backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.28em] font-semibold text-[#C9A227]">Impact</p>
                <p className="mt-4 text-3xl font-semibold text-midnight_text dark:text-white">Community-first</p>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">Built around values of trust, service and leadership for every community member we serve.</p>
              </div>
            </div>
          </div>

          {members.length > 0 ? (
            <BoardMembersGrid members={members} />
          ) : (
            <div className="mt-16">
              <p className="text-center text-gray-500">Board members will appear here once added in admin.</p>
            </div>
          )}

          {members.length === 0 && (
            <p className="mt-12 text-center text-gray-500">Board members will appear here once added in admin.</p>
          )}
        </div>
      </section>
    </>
  );
}
