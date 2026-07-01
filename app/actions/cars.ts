"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

/* =========================
   Create
========================= */

export async function createCar(formData: FormData) {
  const payload = {
    brand_id: formData.get("brand_id")?.toString(),
    model_id: formData.get("model_id")?.toString(),
    trim_id:
      formData.get("trim_id")?.toString() || null,

    year: Number(formData.get("year")),

    mileage: Number(
      formData.get("mileage") || 0
    ),

    color:
      formData.get("color")?.toString() || null,

    price: Number(formData.get("price")),

    description:
      formData.get("description")?.toString() ||
      null,

    is_active: true,
  };

  const { error } = await supabaseAdmin
    .from("cars")
    .insert(payload);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars");

  return {
    success: true,
    message: "خودرو با موفقیت ثبت شد.",
  };
}

/* =========================
   Update
========================= */

export async function updateCar(
  formData: FormData
) {
  const id = formData
    .get("id")
    ?.toString();

  if (!id) {
    return {
      success: false,
      message: "شناسه خودرو معتبر نیست.",
    };
  }

  const payload = {
    brand_id: formData.get("brand_id")?.toString(),
    model_id: formData.get("model_id")?.toString(),
    trim_id:
      formData.get("trim_id")?.toString() || null,

    year: Number(formData.get("year")),

    mileage: Number(
      formData.get("mileage") || 0
    ),

    color:
      formData.get("color")?.toString() || null,

    price: Number(formData.get("price")),

    description:
      formData.get("description")?.toString() ||
      null,

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin
    .from("cars")
    .update(payload)
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars");
  revalidatePath(`/admin/cars/edit/${id}`);

  return {
    success: true,
    message: "خودرو بروزرسانی شد.",
  };
}

/* =========================
   Toggle Status
========================= */

export async function toggleCar(
  id: string,
  current: boolean
) {
  const { error } = await supabaseAdmin
    .from("cars")
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

  revalidatePath("/admin/cars");

  return {
    success: true,
    message: "وضعیت بروزرسانی شد.",
  };
}

/* =========================
   Delete
========================= */

export async function deleteCar(id: string) {
  const { error } = await supabaseAdmin
    .from("cars")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/cars");

  return {
    success: true,
    message: "خودرو حذف شد.",
  };
}

/* =========================
   Get One Car
========================= */

export async function getCarById(
  id: string
) {
  const { data, error } =
    await supabaseAdmin
      .from("cars")
      .select(
        `
        *,
        brands(name),
        car_models(name),
        car_trims(name)
      `
      )
      .eq("id", id)
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}