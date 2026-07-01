"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminNote({ loanId }: { loanId: string }) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const addNote = async () => {
    if (!note.trim()) return;

    setLoading(true);

    await supabase.from("notes").insert({
      loan_request_id: loanId,
      note: note,
      note_type: "admin",
    });

    setNote("");
    setLoading(false);

    // اگر بخوای real-time بعداً اضافه می‌کنیم
    window.location.reload();
  };

  return (
    <div className="space-y-3">
      <textarea
        className="w-full border rounded p-3 text-sm"
        placeholder="یادداشت جدید بنویس..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={addNote}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded text-sm"
      >
        {loading ? "در حال ثبت..." : "ثبت یادداشت"}
      </button>
    </div>
  );
}