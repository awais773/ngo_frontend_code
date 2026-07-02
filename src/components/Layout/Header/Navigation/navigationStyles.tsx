export const navLinkBaseClass =
  "relative text-[14px] font-semibold px-3.5 py-2 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-darkprimary dark:hover:text-secondary hover:bg-darkprimary/8 dark:hover:bg-secondary/10";

export const navLinkClass = `${navLinkBaseClass} flex w-full items-center justify-between gap-1.5`;

export const navSubmenuPanelClass =
  "mt-1 w-full rounded-xl border border-gray-200 bg-white py-3 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-darkmode";

export const navSubmenuLinkClass =
  "block px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-150 hover:bg-gradient-to-r hover:from-darkprimary/10 hover:to-secondary/10 hover:pl-5 hover:text-darkprimary dark:text-gray-300 dark:hover:text-secondary border-l-2 border-transparent hover:border-l-secondary";

export const navChevronClass = (open: boolean) =>
  `shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`;

export function NavChevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className={navChevronClass(open)}
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="m6 9l6 6l6-6"
      />
    </svg>
  );
}
