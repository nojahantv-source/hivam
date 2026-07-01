import Link from "next/link";
import {
  ArrowRight,
  Download,
  Upload,
  FileSpreadsheet,
} from "lucide-react";

import ImportCarsForm from "@/components/ImportCarsForm";

export default function ImportCarsPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">

        {/* Header */}

        <section className="rounded-3xl bg-white p-10 shadow-sm">

          <Link
            href="/admin/cars"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            <ArrowRight size={18} />
            بازگشت
          </Link>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            <FileSpreadsheet size={18} />

            ورود اطلاعات خودرو

          </div>

          <h1 className="mt-5 text-4xl font-extrabold text-slate-900">

            Import بانک اطلاعات خودرو

          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-500">

            با استفاده از فایل Excel می‌توانید هزاران برند،
            مدل و تیپ خودرو را تنها با چند کلیک وارد سیستم کنید.
            اطلاعات تکراری به صورت خودکار شناسایی خواهند شد.

          </p>

        </section>

        {/* Download Template */}

        <section className="rounded-3xl bg-white p-8 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">

                قالب فایل اکسل

              </h2>

              <p className="mt-2 text-slate-500">

                ابتدا فایل نمونه را دانلود کنید و اطلاعات خودروها
                را داخل آن وارد نمایید.

              </p>

            </div>

            <Link
              href="/templates/cars-template.xlsx"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              <Download size={18} />

              دانلود قالب

            </Link>

          </div>

        </section>

        {/* Upload */}

        <section className="rounded-3xl bg-white p-8 shadow-sm">

          <div className="mb-8">

            <h2 className="text-xl font-bold">

              بارگذاری فایل

            </h2>

            <p className="mt-2 text-slate-500">

              فقط فایل‌های Excel با فرمت xlsx مجاز هستند.

            </p>

          </div>

          <ImportCarsForm />

        </section>

      </div>

    </main>
  );
}