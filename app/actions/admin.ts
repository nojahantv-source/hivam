
"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updateLoanStatus(
  id: number,
  status: string
) {
  const { error } = await supabaseAdmin
    .from("loan_requests")
    .update({ status })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
  };
}

