import { supabaseAdmin } from "@/lib/supabase-admin";
import TrimRow from "./TrimRow";

type Trim = {
  id: string;
  name: string;
  slug: string | null;
  model_id: string;
  is_active: boolean;

  car_models: {
    id: string;
    name: string;

    brands: {
      name: string;
    }[];
  }[];
};

export default async function TrimTable() {
  const { data, error } = await supabaseAdmin
    .from("car_trims")
    .select(`
      id,
      name,
      slug,
      model_id,
      is_active,
      car_models (
        id,
        name,
        brands (
          name
        )
      )
    `)
    .order("name");

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
        <p className="font-bold">
          خطا در دریافت تیپ‌ها
        </p>

        <pre className="mt-3 text-xs">
          {error.message}
        </pre>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500">
        هنوز هیچ تیپی ثبت نشده است.
      </div>
    );
  }

  const trims = data as unknown as Trim[];

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
              وضعیت
            </th>

            <th className="px-6 py-4">
              عملیات
            </th>

          </tr>

        </thead>

        <tbody>

          {trims.map((trim) => (

            <TrimRow
              key={trim.id}
              trim={{
                id: trim.id,
                name: trim.name,
                slug: trim.slug ?? "",
                model_id: trim.model_id,

                model_name:
                  trim.car_models?.[0]?.name ?? "-",

                brand_name:
                  trim.car_models?.[0]?.brands?.[0]?.name ??
                  "-",

                is_active: trim.is_active,
              }}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}