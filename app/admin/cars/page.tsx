import Link from "next/link";
import { ArrowRight, Car, Plus } from "lucide-react";

import CarTable from "@/components/CarTable";

export default function CarsPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">

        {/* Header */}

        <section className="rounded-3xl bg-white p-10 shadow-sm">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
              >
                <ArrowRight size={18} />
                بازگشت به پنل مدیریت
              </Link>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                <Car size={18} />

                مدیریت خودروها

              </div>

              <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
                خودروهای ثبت شده
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
                در این بخش می‌توانید خودروهای ثبت‌شده را مشاهده، ویرایش،
                حذف و وضعیت آن‌ها را مدیریت کنید.
              </p>

            </div>

            <Link
              href="/admin/cars/new"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow transition hover:bg-blue-700"
            >
              <Plus size={20} />
              افزودن خودرو
            </Link>

          </div>

        </section>

        {/* Table */}

        <section className="rounded-3xl bg-white shadow-sm">

          <div className="border-b px-8 py-6">

            <h2 className="text-2xl font-bold text-slate-900">
              لیست خودروها
            </h2>

            <p className="mt-2 text-slate-500">
              تمام خودروهای ثبت‌شده در سامانه.
            </p>

          </div>

          <div className="p-6">

            <CarTable />

          </div>

        </section>

      </div>

    </main>
  );
}