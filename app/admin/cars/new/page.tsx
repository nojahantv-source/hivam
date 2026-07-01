import Link from "next/link";
import { ArrowRight, CarFront, Plus } from "lucide-react";

import CarForm from "@/components/CarForm";

export default function NewCarPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-6xl space-y-10 px-6 py-10">

        {/* Header */}

        <section className="rounded-3xl bg-white p-10 shadow-sm">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <Link
                href="/admin/cars"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
              >
                <ArrowRight size={18} />
                بازگشت به لیست خودروها
              </Link>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                <CarFront size={18} />

                ثبت خودرو

              </div>

              <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
                افزودن خودرو
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
                مشخصات خودرو را وارد کرده و آن را در سامانه ثبت کنید.
              </p>

            </div>

            <div className="hidden lg:flex">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">

                <Plus size={28} />

              </div>

            </div>

          </div>

        </section>

        {/* Form */}

        <section className="rounded-3xl bg-white p-10 shadow-sm">

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-slate-900">
              اطلاعات خودرو
            </h2>

            <p className="mt-2 text-slate-500">
              برند، مدل، تیپ، سال ساخت، قیمت و سایر اطلاعات را وارد کنید.
            </p>

          </div>

          <CarForm />

        </section>

      </div>

    </main>
  );
}