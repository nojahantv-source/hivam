import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Pencil } from "lucide-react";

import CarForm from "@/components/CarForm";
import { getCarById } from "@/app/actions/cars";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCarPage({
  params,
}: Props) {
  const { id } = await params;

  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-6xl space-y-10 px-6 py-10">

        {/* Header */}

        <section className="rounded-3xl bg-white p-10 shadow-sm">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <Link
                href="/admin/cars"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
              >
                <ArrowRight size={18} />
                بازگشت به لیست خودروها
              </Link>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

                <Pencil size={18} />

                ویرایش خودرو

              </div>

              <h1 className="mt-5 text-4xl font-extrabold text-slate-900">

                {car.brands?.name ?? "-"}{" "}
                {car.car_models?.name ?? ""}

              </h1>

              <p className="mt-4 text-slate-500">

                اطلاعات خودرو را ویرایش کنید.

              </p>

            </div>

          </div>

        </section>

        {/* Form */}

        <section className="rounded-3xl bg-white p-10 shadow-sm">

          <div className="mb-8">

            <h2 className="text-2xl font-bold">

              مشخصات خودرو

            </h2>

            <p className="mt-2 text-slate-500">

              تغییرات موردنظر را اعمال کرده و ذخیره کنید.

            </p>

          </div>

          <CarForm
            mode="edit"
            initialData={{
              id: car.id,

              brand_id: car.brand_id,

              model_id: car.model_id,

              trim_id: car.trim_id ?? "",

              year: car.year,

              mileage: car.mileage,

              color: car.color ?? "",

              price: car.price,

              description:
                car.description ?? "",
            }}
          />

        </section>

      </div>

    </main>
  );
}