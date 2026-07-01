"use client";

import { Plus } from "lucide-react";

export default function AddTrimButton() {
  return (
    <button
      onClick={() =>
        document
          .getElementById("trim-form")
          ?.scrollIntoView({
            behavior: "smooth",
          })
      }
      className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-md transition hover:bg-blue-700"
    >
      <Plus size={18} />
      افزودن تیپ
    </button>
  );
}