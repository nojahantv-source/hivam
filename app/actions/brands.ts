"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

/* =========================================
   CREATE
========================================= */

export async function createBrand(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const logo = String(formData.get("logo") ?? "").trim();

  if (!name) {
    return {
      success: false,
      message: "نام برند الزامی است.",
    };
  }

  const slug = slugify(name);

  const { error } = await supabaseAdmin
    .from("brands")
    .insert({
      name,
      slug,
      logo: logo || null,
      is_active: true,
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars");
  revalidatePath("/admin/cars/brands");

  return {
    success: true,
  };
}

/* =========================================
   UPDATE
========================================= */

export async function updateBrand(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  const name = String(formData.get("name") ?? "").trim();

  const logo = String(formData.get("logo") ?? "").trim();

  if (!id || !name) {
    return {
      success: false,
      message: "اطلاعات ناقص است.",
    };
  }

  const slug = slugify(name);

  const { error } = await supabaseAdmin
    .from("brands")
    .update({
      name,
      slug,
      logo: logo || null,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars");
  revalidatePath("/admin/cars/brands");

  return {
    success: true,
  };
}

/* =========================================
   DELETE
========================================= */

export async function deleteBrand(id: string) {
  const { count } = await supabaseAdmin
    .from("car_models")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("brand_id", id);

  if ((count ?? 0) > 0) {
    return {
      success: false,
      message:
        "ابتدا مدل‌های این برند را حذف کنید.",
    };
  }

  const { error } = await supabaseAdmin
    .from("brands")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars");
  revalidatePath("/admin/cars/brands");

  return {
    success: true,
  };
}

/* =========================================
   TOGGLE ACTIVE
========================================= */

export async function toggleBrand(
  id: string,
  active: boolean
) {
  const { error } = await supabaseAdmin
    .from("brands")
    .update({
      is_active: !active,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars");
  revalidatePath("/admin/cars/brands");

  return {
    success: true,
  };
}