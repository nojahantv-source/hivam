
"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type LoanRequest = {
  full_name: string;
  mobile: string;
  brand: string;
  model: string;
  price: number;
  deposit: number;
  loan: number;
  months: number;
  description?: string;
};

export async function createLoanRequest(data: LoanRequest) {
  try {
    const { error } = await supabase
      .from("loan_requests")
      .insert({
        ...data,
        status: "جدید",
      });

    if (error) throw error;

    return {
      success: true,
      message: "درخواست با موفقیت ثبت شد.",
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "خطا در ثبت درخواست.",
    };
  }
}