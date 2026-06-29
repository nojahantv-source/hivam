
import { notFound } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase-admin";
import StatusBadge from "@/components/StatusBadge";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RequestPage({
  params,
}: Props) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("loan_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-5xl p-8">

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          <div className="mb-10 flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-extrabold">
                {data.full_name}
              </h1>

              <p className="mt-2 text-slate-500">
                درخواست شماره #{data.id}
              </p>

            </div>

            <StatusBadge status={data.status} />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Info
              title="شماره موبایل"
              value={data.mobile}
            />

            <Info
              title="برند خودرو"
              value={data.brand}
            />

            <Info
              title="مدل خودرو"
              value={data.model}
            />

            <Info
              title="قیمت خودرو"
              value={`${Number(data.price).toLocaleString("fa-IR")} تومان`}
            />

            <Info
              title="پیش پرداخت"
              value={`${Number(data.deposit).toLocaleString("fa-IR")} تومان`}
            />

            <Info
              title="مبلغ وام"
              value={`${Number(data.loan).toLocaleString("fa-IR")} تومان`}
            />

            <Info
              title="مدت بازپرداخت"
              value={`${data.months} ماه`}
            />

            <Info
              title="تاریخ ثبت"
              value={
                data.created_at
                  ? new Date(data.created_at).toLocaleDateString("fa-IR")
                  : "-"
              }
            />

          </div>

          {data.description && (
            <div className="mt-10">

              <h3 className="mb-3 text-lg font-bold">
                توضیحات متقاضی
              </h3>

              <div className="rounded-2xl bg-slate-50 p-6 leading-8">
                {data.description}
              </div>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

