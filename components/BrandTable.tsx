import { supabaseAdmin } from "@/lib/supabase-admin";
import BrandRow from "./BrandRow";

type Brand = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  is_active: boolean;
  created_at: string;
};

type ModelCountRow = {
  brand_id: string;
};

export default async function BrandTable() {
  // ======================
  // Brands Query
  // ======================
  const { data: brands, error: brandsError } = await supabaseAdmin
    .from("brands")
    .select("id, name, slug, logo, is_active, created_at")
    .order("name");

  if (brandsError) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-red-600">
        <p className="font-bold">خطا در دریافت برندها</p>
        <pre className="mt-2 text-xs opacity-70">
          {brandsError.message}
        </pre>
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        هنوز هیچ برندی ثبت نشده است
      </div>
    );
  }

  // ======================
  // Models Count Query
  // ======================
  const { data: models } = await supabaseAdmin
    .from("car_models")
    .select("brand_id");

  const modelCountMap = new Map<string, number>();

  (models as ModelCountRow[] | null)?.forEach((m) => {
    modelCountMap.set(
      m.brand_id,
      (modelCountMap.get(m.brand_id) ?? 0) + 1
    );
  });

  // ======================
  // UI
  // ======================
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">

        <thead className="bg-slate-50">
          <tr className="text-right text-sm font-semibold text-slate-600">
            <th className="px-6 py-4">برند</th>
            <th className="px-6 py-4">اسلاگ</th>
            <th className="px-6 py-4">لوگو</th>
            <th className="px-6 py-4">مدل‌ها</th>
            <th className="px-6 py-4">وضعیت</th>
            <th className="px-6 py-4">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {brands.map((brand: Brand) => (
            <BrandRow
              key={brand.id}
              brand={{
                id: brand.id,
                name: brand.name,
                slug: brand.slug,
                logo: brand.logo,
                is_active: brand.is_active,
              }}
              modelsCount={modelCountMap.get(brand.id) ?? 0}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
}