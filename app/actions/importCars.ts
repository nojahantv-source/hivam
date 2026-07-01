"use server";

import * as XLSX from "xlsx";
import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase-admin";

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function importCars(
  formData: FormData
) {
  try {
    const file = formData.get("file") as File | null;

    if (!file) {
      return {
        success: false,
        message: "فایلی انتخاب نشده است.",
      };
    }

    const bytes = await file.arrayBuffer();

    const workbook = XLSX.read(bytes);

    const sheet =
      workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json<{
      Brand: string;
      Model: string;
      Trim: string;
    }>(sheet);

    let newBrands = 0;
    let newModels = 0;
    let newTrims = 0;

    for (const row of rows) {
      const brandName = row.Brand?.trim();

      const modelName = row.Model?.trim();

      const trimName = row.Trim?.trim();

      if (
        !brandName ||
        !modelName ||
        !trimName
      ) {
        continue;
      }

      //----------------------------------
      // BRAND
      //----------------------------------

      let { data: brand } =
        await supabaseAdmin
          .from("brands")
          .select("id")
          .eq("name", brandName)
          .maybeSingle();

      if (!brand) {
        const { data } =
          await supabaseAdmin
            .from("brands")
            .insert({
              name: brandName,
              slug: slugify(brandName),
              is_active: true,
            })
            .select("id")
            .single();

        brand = data;

        newBrands++;
      }

      //----------------------------------
      // MODEL
      //----------------------------------

      let { data: model } =
        await supabaseAdmin
          .from("car_models")
          .select("id")
          .eq("brand_id", brand.id)
          .eq("name", modelName)
          .maybeSingle();

      if (!model) {
        const { data } =
          await supabaseAdmin
            .from("car_models")
            .insert({
              brand_id: brand.id,
              name: modelName,
              slug: slugify(modelName),
              is_active: true,
            })
            .select("id")
            .single();

        model = data;

        newModels++;
      }

      //----------------------------------
      // TRIM
      //----------------------------------

      const { data: trim } =
        await supabaseAdmin
          .from("car_trims")
          .select("id")
          .eq("model_id", model.id)
          .eq("name", trimName)
          .maybeSingle();

      if (!trim) {
        await supabaseAdmin
          .from("car_trims")
          .insert({
            model_id: model.id,
            name: trimName,
            is_active: true,
          });

        newTrims++;
      }
    }

    revalidatePath("/admin/cars");
    revalidatePath("/admin/cars/brands");
    revalidatePath("/admin/cars/models");
    revalidatePath("/admin/cars/trims");

    return {
      success: true,
      message:
        `عملیات با موفقیت انجام شد.
برند جدید: ${newBrands}
مدل جدید: ${newModels}
تیپ جدید: ${newTrims}`,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "خطا در پردازش فایل Excel.",
    };
  }
}