
"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createLoanNote(
  loanRequestId: number,
  note: string,
  noteType = "note"
) {
  const { error } = await supabaseAdmin
    .from("loan_notes")
    .insert({
      loan_request_id: loanRequestId,
      note,
      note_type: noteType,
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath(`/admin/requests/${loanRequestId}`);

  return {
    success: true,
  };
}

