import Link from "next/link";

import ModelForm from "@/components/ModelForm";
import ModelTable from "@/components/ModelTable";

export default function ModelsPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">

        {/* Header */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              مدیریت خودروها
            </span>

            <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
              مدیریت مدل‌های خودرو
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500 leading-8">
              در این بخش می‌توانید مدل‌های هر برند را ایجاد، ویرایش،
              فعال یا غیرفعال کنید.
            </p>

          </div>

          <Link
            href="/admin/cars"
            className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold shadow-sm transition hover:bg-slate-50"
          >
            بازگشت
          </Link>

        </div>

        {/* Form */}

        <section className="rounded-3xl bg-white p-8 shadow-sm">

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-slate-900">
              افزودن مدل جدید
            </h2>

            <p className="mt-2 text-slate-500">
              ابتدا برند را انتخاب کنید سپس مدل جدید را ثبت نمایید.
            </p>

          </div>

          <ModelForm />

        </section>

        {/* Table */}

        <section className="rounded-3xl bg-white shadow-sm">

          <div className="border-b px-8 py-6">

            <h2 className="text-2xl font-bold text-slate-900">
              لیست مدل‌ها
            </h2>

            <p className="mt-2 text-slate-500">
              تمام مدل‌های ثبت‌شده در سامانه
            </p>

          </div>

          <div className="p-6">

            <ModelTable />

          </div>

        </section>

      </div>

    </main>
  );
}