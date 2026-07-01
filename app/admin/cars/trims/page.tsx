import Link from "next/link";
import { ArrowRight } from "lucide-react";

import TrimForm from "@/components/TrimForm";
import TrimTable from "@/components/TrimTable";
import AddTrimButton from "@/components/AddTrimButton";

export default function TrimsPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">

        {/* Header */}

        <section className="rounded-3xl bg-white p-10 shadow-sm">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <Link
                href="/admin/cars"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
              >
                <ArrowRight size={18} />
                بازگشت به مدیریت خودروها
              </Link>

              <span className="mt-5 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                مدیریت تیپ خودرو
              </span>

              <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
                تیپ‌های خودرو
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
                در این بخش می‌توانید تیپ‌های هر مدل خودرو را ایجاد،
                ویرایش، حذف و فعال یا غیرفعال کنید.
              </p>

            </div>

            <AddTrimButton />

          </div>

        </section>

        {/* Form */}

        <section
          id="trim-form"
          className="rounded-3xl bg-white p-10 shadow-sm"
        >

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-slate-900">
              افزودن تیپ جدید
            </h2>

            <p className="mt-2 text-slate-500">
              ابتدا مدل خودرو را انتخاب کرده و سپس نام تیپ را وارد کنید.
            </p>

          </div>

          <TrimForm />

        </section>

        {/* Table */}

        <section className="rounded-3xl bg-white shadow-sm">

          <div className="border-b px-8 py-6">

            <h2 className="text-2xl font-bold text-slate-900">
              لیست تیپ‌ها
            </h2>

            <p className="mt-2 text-slate-500">
              تمام تیپ‌های ثبت‌شده به همراه برند، مدل و وضعیت آن‌ها.
            </p>

          </div>

          <div className="p-6">

            <TrimTable />

          </div>

        </section>

      </div>
    </main>
  );
}