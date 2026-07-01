"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updateLoanStatus(
  id: string,
  status: string
) {
  // وضعیت فعلی پرونده
  const { data: loan, error: loanError } = await supabaseAdmin
    .from("loan_requests")
    .select("status")
    .eq("id", id)
    .single();

  if (loanError || !loan) {
    return {
      success: false,
      message: loanError?.message ?? "پرونده پیدا نشد",
    };
  }

  // اگر وضعیت تغییری نکرده باشد
  if (loan.status === status) {
    return {
      success: true,
    };
  }

  // بروزرسانی وضعیت
  const { error: updateError } = await supabaseAdmin
    .from("loan_requests")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return {
      success: false,
      message: updateError.message,
    };
  }

  // ثبت Event
  const { error: eventError } = await supabaseAdmin
    .from("loan_events")
    .insert({
      loan_request_id: id,
      type: "STATUS_CHANGED",
      created_by: "admin",
      payload: {
        from: loan.status,
        to: status,
      },
    });

  if (eventError) {
    console.error("Create status event:", eventError);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/requests/${id}`);

  return {
    success: true,
  };
}

export async function saveAdminNote(
  id: string,
  note: string
) {
  const { error } = await supabaseAdmin
    .from("loan_requests")
    .update({
      admin_note: note,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/requests/${id}`);

  return {
    success: true,
  };
}