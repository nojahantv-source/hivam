import { supabaseAdmin } from "@/lib/supabase-admin";

import AdminTableClient from "./AdminTableClient";

export default async function AdminTable() {
  const { data, error } = await supabaseAdmin
    .from("loan_requests")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

        <h3 className="text-lg font-bold text-red-600">
          خطا در دریافت اطلاعات
        </h3>

        <p className="mt-3 text-sm text-red-500">
          ارتباط با پایگاه داده برقرار نشد.
        </p>

        <pre className="mt-5 overflow-auto rounded-xl bg-white p-4 text-xs text-slate-600">
          {error.message}
        </pre>

      </div>
    );
  }

  const requests = data ?? [];

  if (requests.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">

        <h3 className="text-xl font-bold text-slate-700">
          هنوز درخواستی ثبت نشده است
        </h3>

        <p className="mt-3 text-slate-500">
          پس از ثبت اولین درخواست، اطلاعات در این بخش نمایش داده خواهد شد.
        </p>

      </div>
    );
  }

  return (
    <div>

      <div className="flex flex-col gap-2 border-b bg-slate-50 px-8 py-5 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm text-slate-500">
            مجموع درخواست‌های ثبت‌شده
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {requests.length.toLocaleString("fa-IR")}
          </p>

        </div>

        <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          آخرین بروزرسانی بر اساس تاریخ ثبت
        </div>

      </div>

      <AdminTableClient requests={requests} />

    </div>
  );
}