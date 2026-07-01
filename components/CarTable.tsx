import { supabaseAdmin } from "@/lib/supabase-admin";
import CarRow from "./CarRow";

type Car = {
  id: string;
  year: number;
  mileage: number;
  color: string | null;
  price: number;
  description: string | null;
  is_active: boolean;
  created_at: string;

  brands: {
    id: string;
    name: string;
  }[];

  car_models: {
    id: string;
    name: string;
  }[];

  car_trims: {
    id: string;
    name: string;
  }[] | null;
};

export default async function CarTable() {
  const { data, error } = await supabaseAdmin
    .from("cars")
    .select(`
      *,
      brands(id,name),
      car_models(id,name),
      car_trims(id,name)
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-red-600">
        <p className="font-bold">
          خطا در دریافت خودروها
        </p>

        <pre className="mt-2 text-xs">
          {error.message}
        </pre>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="p-12 text-center text-slate-500">
        هنوز خودرویی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-50">

          <tr className="text-right text-sm font-semibold text-slate-600">

            <th className="px-6 py-4">
              برند
            </th>

            <th className="px-6 py-4">
              مدل
            </th>

            <th className="px-6 py-4">
              تیپ
            </th>

            <th className="px-6 py-4">
              سال
            </th>

            <th className="px-6 py-4">
              کارکرد
            </th>

            <th className="px-6 py-4">
              رنگ
            </th>

            <th className="px-6 py-4">
              قیمت
            </th>

            <th className="px-6 py-4">
              وضعیت
            </th>

            <th className="px-6 py-4">
              عملیات
            </th>

          </tr>

        </thead>

        <tbody>

          {(data as Car[]).map((car) => (

            <CarRow
              key={car.id}
              car={{
                id: car.id,
                brand_id: car.brands?.[0]?.id ?? "",
                brand_name:
                  car.brands?.[0]?.name ?? "-",

                model_id:
                  car.car_models?.[0]?.id ?? "",
                model_name:
                  car.car_models?.[0]?.name ?? "-",

                trim_id:
                  car.car_trims?.[0]?.id ?? "",

                trim_name:
                  car.car_trims?.[0]?.name ??
                  "-",

                year: car.year,

                mileage: car.mileage,

                color: car.color ?? "",

                price: car.price,

                description:
                  car.description ?? "",

                is_active:
                  car.is_active,
              }}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}