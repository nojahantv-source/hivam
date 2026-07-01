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
   Add Trim
========================= */

export async function createTrim(formData: FormData) {
  const modelId = formData.get("model_id")?.toString().trim();
  const name = formData.get("name")?.toString().trim();

  if (!modelId || !name) {
    return {
      success: false,
      message: "مدل و نام تیپ الزامی است.",
    };
  }

  const slug = slugify(name);

  const { error } = await supabaseAdmin
    .from("car_trims")
    .insert({
      model_id: modelId,
      name,
      slug,
      is_active: true,
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars/trims");

  return {
    success: true,
    message: "تیپ با موفقیت ثبت شد.",
  };
}

/* =========================
   Update Trim
========================= */

export async function updateTrim(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString().trim();

  if (!id || !name) {
    return {
      success: false,
      message: "اطلاعات ناقص است.",
    };
  }

  const slug = slugify(name);

  const { error } = await supabaseAdmin
    .from("car_trims")
    .update({
      name,
      slug,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars/trims");

  return {
    success: true,
    message: "تیپ بروزرسانی شد.",
  };
}

/* =========================
   Toggle Trim
========================= */

export async function toggleTrim(
  id: string,
  current: boolean
) {
  const { error } = await supabaseAdmin
    .from("car_trims")
    .update({
      is_active: !current,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars/trims");

  return {
    success: true,
    message: "وضعیت بروزرسانی شد.",
  };
}

/* =========================
   Delete Trim
========================= */

export async function deleteTrim(id: string) {
  const { error } = await supabaseAdmin
    .from("car_trims")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars/trims");

  return {
      success: true,
      message: "تیپ حذف شد.",
  };
}