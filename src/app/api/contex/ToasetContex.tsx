"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

export default function ToasterContext() {
  return <Toaster position="top-right" toastOptions={{ duration: 4000 }} />;
}
