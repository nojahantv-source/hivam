import { supabaseAdmin } from "@/lib/supabase-admin";
import { addModel } from "@/app/actions/models";

export default async function ModelForm() {
  const { data: brands, error } = await supabaseAdmin
    .from("brands")
    .select("id, name")
    .eq("is_active", true)
    .order("name");

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-red-600">
        {error.message}
      </div>
    );
  }

  return (
    <form
      action={addModel}
      className="grid gap-6 md:grid-cols-3"
    >
      {/* Brand */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          برند
        </label>

        <select
          name="brand_id"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        >
          <option value="">
            انتخاب برند...
          </option>

          {brands?.map((brand) => (
            <option
              key={brand.id}
              value={brand.id}
            >
              {brand.name}
            </option>
          ))}
        </select>

      </div>

      {/* Model */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          نام مدل
        </label>

        <input
          name="name"
          required
          placeholder="مثلاً X5"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />

      </div>

      {/* Submit */}

      <div className="flex items-end">

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          افزودن مدل
        </button>

      </div>

    </form>
  );
}