import { createClient } from "@/lib/supabase/server";
import { BRAND } from "@/lib/config/brand";

import AdminEventCreator from "@/components/AdminEventCreator";
import LoanTimeline from "@/components/LoanTimeline";

function money(value: number | null | undefined) {
  return Number(value ?? 0).toLocaleString("fa-IR");
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ✅ Next.js 16
  const supabase = await createClient();

  const { data: loan, error } = await supabase
    .from("loan_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !loan) {
    return (
      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-3xl p-10">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow">
            <h2 className="text-2xl font-bold text-red-600">
              پرونده پیدا نشد
            </h2>

            <p className="mt-5 text-slate-600">
              شناسه پرونده:
            </p>

            <code className="mt-3 block rounded-xl bg-white p-4 text-sm">
              {id}
            </code>

            {error && (
              <pre className="mt-6 overflow-auto rounded-xl bg-white p-4 text-xs">
                {JSON.stringify(error, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">

        <div className="rounded-3xl bg-white p-8 shadow">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

            <div>
              <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                CRM {BRAND.name}
              </span>

              <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
                {loan.full_name}
              </h1>

              <p className="mt-2 text-slate-500">
                {loan.mobile}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 px-6 py-5">
              <p className="text-sm text-slate-500">
                وضعیت پرونده
              </p>

              <p className="mt-3 text-lg font-bold">
                {loan.status}
              </p>
            </div>

          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">
              خودرو
            </p>

            <p className="mt-2 text-xl font-bold">
              {loan.brand}
            </p>

            <p className="text-slate-500">
              {loan.model}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">
              قیمت خودرو
            </p>

            <p className="mt-2 text-xl font-bold text-blue-700">
              {money(loan.price)}
            </p>

            <p className="text-xs text-slate-500">
              تومان
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">
              مبلغ تسهیلات
            </p>

            <p className="mt-2 text-xl font-bold text-green-700">
              {money(loan.loan)}
            </p>

            <p className="text-xs text-slate-500">
              تومان
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">
              بازپرداخت
            </p>

            <p className="mt-2 text-xl font-bold">
              {loan.months} ماه
            </p>
          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              ثبت فعالیت
            </h2>

            <p className="mt-2 text-slate-500">
              تماس، یادداشت، پیامک یا هر فعالیت مرتبط با این پرونده را ثبت کنید.
            </p>
          </div>

          <AdminEventCreator loanId={loan.id} />

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              تاریخچه فعالیت‌ها
            </h2>

            <p className="mt-2 text-slate-500">
              تمامی تغییرات، وضعیت‌ها و فعالیت‌های ثبت‌شده برای این پرونده.
            </p>
          </div>

          <LoanTimeline loanId={loan.id} />

        </div>

      </div>
    </main>
  );
}