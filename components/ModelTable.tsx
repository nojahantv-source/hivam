import { supabaseAdmin } from "@/lib/supabase-admin";
import ModelRow from "./ModelRow";

type Model = {
  id: string;
  name: string;
  slug: string;
  brand_id: string;
  is_active: boolean;
  created_at: string;

  brands: {
    id: string;
    name: string;
  } | null;
};

export default async function ModelTable() {
  const { data, error } = await supabaseAdmin
    .from("car_models")
    .select(`
      id,
      name,
      slug,
      brand_id,
      is_active,
      created_at,
      brands (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-red-600">
        {error.message}
      </div>
    );
  }

  const models = (data ?? []) as any[];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">

        <thead>
          <tr>
            <th>برند</th>
            <th>مدل</th>
            <th>اسلاگ</th>
            <th>تیپ</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>

        <tbody>
          {models.map((model) => {
            const brand = Array.isArray(model.brands)
              ? model.brands[0]
              : model.brands;

            return (
              <ModelRow
                key={model.id}
                model={{
                  id: model.id,
                  name: model.name,
                  slug: model.slug,
                  brand_id: model.brand_id,
                  brand_name: brand?.name ?? "-",
                  is_active: model.is_active,
                }}
                trimsCount={0}
              />
            );
          })}
        </tbody>

      </table>
    </div>
  );
}