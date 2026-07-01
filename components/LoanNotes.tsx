"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Note = {
  id: string;
  loan_request_id: string;
  note: string;
  note_type: string;
  created_at: string;
};

export default function LoanNotes({ loanId }: { loanId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchNotes = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("loan_request_id", loanId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotes(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (loanId) fetchNotes();
  }, [loanId]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "system":
        return "bg-blue-100 text-blue-700";
      case "admin":
        return "bg-green-100 text-green-700";
      case "status":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Timeline پرونده</h3>

      <div className="relative border-l border-gray-200 pl-4 space-y-6">
        {notes.map((note) => (
          <div key={note.id} className="relative">
            <div className="absolute -left-2 top-1.5 w-3 h-3 rounded-full bg-blue-500"></div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded ${getTypeColor(
                    note.note_type
                  )}`}
                >
                  {note.note_type}
                </span>

                <span className="text-xs text-gray-400">
                  {new Date(note.created_at).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-gray-700 leading-6">
                {note.note}
              </p>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="text-sm text-gray-400">هیچ یادداشتی ثبت نشده</p>
        )}
      </div>
    </div>
  );
}