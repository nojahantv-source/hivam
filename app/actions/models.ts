"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

/* =========================
   ADD MODEL
========================= */

export async function addModel(formData: FormData): Promise<void> {
  const brandId = formData.get("brand_id")?.toString().trim();
  const name = formData.get("name")?.toString().trim();

  if (!brandId || !name) {
    throw new Error("برند و نام مدل الزامی است");
  }

  const slug = slugify(name);

  const { error } = await supabaseAdmin
    .from("car_models")
    .insert({
      brand_id: brandId,
      name,
      slug,
      is_active: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/cars/models");
}

/* =========================
   UPDATE MODEL
========================= */

export async function updateModel(formData: FormData): Promise<void> {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString().trim();

  if (!id || !name) {
    throw new Error("اطلاعات ناقص است");
  }

  const slug = slugify(name);

  const { error } = await supabaseAdmin
    .from("car_models")
    .update({
      name,
      slug,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/cars/models");
}

/* =========================
   TOGGLE MODEL
========================= */

export async function toggleModel(
  id: string,
  current: boolean
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("car_models")
    .update({
      is_active: !current,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/cars/models");
}

/* =========================
   DELETE MODEL
========================= */

export async function deleteModel(
  id: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("car_models")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/cars/models");
}