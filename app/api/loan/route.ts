import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { error } = await supabase
      .from("loan_requests")
      .insert({
        full_name: body.full_name,
        mobile: body.mobile,
        brand: body.brand,
        model: body.model,
        price: body.price,
        deposit: body.deposit,
        loan: body.loan,
        months: body.months,
        description: body.description,
        status: "جدید",
      });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "درخواست با موفقیت ثبت شد.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "خطا در ثبت اطلاعات",
      },
      { status: 500 }
    );
  }
}