import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BrandForm from "@/components/BrandForm";
import BrandTable from "@/components/BrandTable";
import AddBrandButton from "@/components/AddBrandButton";

export default function BrandsPage() {
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
                مدیریت برندها
              </span>

              <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
                برندهای خودرو
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
                در این بخش می‌توانید برندهای خودرو را ایجاد، ویرایش،
                فعال یا غیرفعال کنید و مدل‌های هر برند را مدیریت نمایید.
              </p>

            </div>

            <AddBrandButton />

          </div>
        </section>

        {/* Form */}

        <section
          id="brand-form"
          className="rounded-3xl bg-white p-10 shadow-sm"
        >

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-slate-900">
              افزودن برند جدید
            </h2>

            <p className="mt-2 text-slate-500">
              اطلاعات برند را وارد کرده و ثبت کنید.
            </p>

          </div>

          <BrandForm />

        </section>

        {/* Table */}

        <section className="rounded-3xl bg-white shadow-sm">

          <div className="border-b px-8 py-6">

            <h2 className="text-2xl font-bold text-slate-900">
              لیست برندها
            </h2>

            <p className="mt-2 text-slate-500">
              برندهای ثبت‌شده به همراه تعداد مدل‌ها و وضعیت فعال بودن.
            </p>

          </div>

          <div className="p-6">

            <BrandTable />

          </div>

        </section>

      </div>
    </main>
  );
}