"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createCRMEvent({
  loanId,
  type,
  payload,
}: {
  loanId: string;
  type: string;
  payload: any;
}) {
  const { error } = await supabaseAdmin
    .from("loan_events")
    .insert({
      loan_request_id: loanId,
      type,
      payload,
      created_by: "admin",
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath(`/admin/requests/${loanId}`);

  return {
    success: true,
  };
}