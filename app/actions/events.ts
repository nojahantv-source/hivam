"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

type CreateLoanEventInput = {
  loanId: string;
  type: string;
  payload: Record<string, unknown>;
};

export async function createLoanEvent({
  loanId,
  type,
  payload,
}: CreateLoanEventInput) {
  const { data, error } = await supabaseAdmin
    .from("loan_events")
    .insert({
      loan_request_id: loanId,
      type,
      payload,
      created_by: "admin",
    })
    .select()
    .single();

  if (error) {
    console.error("Create Event Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath(`/admin/requests/${loanId}`);

  return {
    success: true,
    event: data,
  };
}