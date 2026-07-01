"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import {
  createCar,
  updateCar,
} from "@/app/actions/cars";

import { supabase } from "@/lib/supabase";

type Brand = {
  id: string;
  name: string;
};

type Model = {
  id: string;
  name: string;
  brand_id: string;
};

type Trim = {
  id: string;
  name: string;
  model_id: string;
};

type Props = {
  mode?: "create" | "edit";

  initialData?: {
    id: string;

    brand_id: string;

    model_id: string;

    trim_id: string;

    year: number;

    mileage: number;

    color: string;

    price: number;

    description: string;
  };
};

export default function CarForm({
  mode = "create",
  initialData,
}: Props) {
  const formRef =
    useRef<HTMLFormElement>(null);

  const [pending, startTransition] =
    useTransition();

  const [message, setMessage] =
    useState("");

  const [brands, setBrands] = useState<
    Brand[]
  >([]);

  const [models, setModels] = useState<
    Model[]
  >([]);

  const [trims, setTrims] = useState<
    Trim[]
  >([]);

  const [brandId, setBrandId] =
    useState(
      initialData?.brand_id ?? ""
    );

  const [modelId, setModelId] =
    useState(
      initialData?.model_id ?? ""
    );

  const [trimId, setTrimId] =
    useState(
      initialData?.trim_id ?? ""
    );

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    if (brandId) {
      loadModels(brandId);
    } else {
      setModels([]);
    }
  }, [brandId]);

  useEffect(() => {
    if (modelId) {
      loadTrims(modelId);
    } else {
      setTrims([]);
    }
  }, [modelId]);

  async function loadBrands() {
    const { data } = await supabase
      .from("brands")
      .select("id,name")
      .eq("is_active", true)
      .order("name");

    setBrands(data ?? []);
  }

  async function loadModels(
    brand: string
  ) {
    const { data } = await supabase
      .from("car_models")
      .select("id,name,brand_id")
      .eq("brand_id", brand)
      .eq("is_active", true)
      .order("name");

    setModels(data ?? []);
  }

  async function loadTrims(
    model: string
  ) {
    const { data } = await supabase
      .from("car_trims")
      .select("id,name,model_id")
      .eq("model_id", model)
      .eq("is_active", true)
      .order("name");

    setTrims(data ?? []);
  }

  function submit(formData: FormData) {
    setMessage("");

    if (mode === "edit") {
      formData.append(
        "id",
        initialData!.id
      );
    }

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createCar(formData)
          : await updateCar(formData);

      if (!result.success) {
        setMessage(
          result.message ?? "خطا"
        );
        return;
      }

      setMessage(
        result.message ?? "ثبت شد."
      );

      if (mode === "create") {
        formRef.current?.reset();

        setBrandId("");
        setModelId("");
        setTrimId("");

        setModels([]);
        setTrims([]);
      }
    });
  }

  return (
    <form
      ref={formRef}
      action={submit}
      className="grid gap-6 md:grid-cols-2"
    >
      <div>
        <label className="mb-2 block text-sm font-semibold">
          برند
        </label>

        <select
          name="brand_id"
          required
          value={brandId}
          onChange={(e) => {
            setBrandId(e.target.value);
            setModelId("");
            setTrimId("");
          }}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">
            انتخاب برند
          </option>

          {brands.map((brand) => (
            <option
              key={brand.id}
              value={brand.id}
            >
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          مدل
        </label>

        <select
          name="model_id"
          required
          value={modelId}
          onChange={(e) => {
            setModelId(e.target.value);
            setTrimId("");
          }}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">
            انتخاب مدل
          </option>

          {models.map((model) => (
            <option
              key={model.id}
              value={model.id}
            >
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          تیپ
        </label>

        <select
          name="trim_id"
          value={trimId}
          onChange={(e) =>
            setTrimId(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">
            بدون تیپ
          </option>

          {trims.map((trim) => (
            <option
              key={trim.id}
              value={trim.id}
            >
              {trim.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          سال
        </label>

        <input
          name="year"
          type="number"
          required
          defaultValue={
            initialData?.year
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          کارکرد
        </label>

        <input
          name="mileage"
          type="number"
          defaultValue={
            initialData?.mileage ?? 0
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          رنگ
        </label>

        <input
          name="color"
          defaultValue={
            initialData?.color
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          قیمت (تومان)
        </label>

        <input
          name="price"
          type="number"
          required
          defaultValue={
            initialData?.price
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold">
          توضیحات
        </label>

        <textarea
          name="description"
          rows={5}
          defaultValue={
            initialData?.description
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {message && (
        <div className="md:col-span-2 rounded-xl bg-slate-100 p-4">
          {message}
        </div>
      )}

      <div className="md:col-span-2">
        <button
          disabled={pending}
          type="submit"
          className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700"
        >
          {pending
            ? "در حال ذخیره..."
            : mode === "create"
            ? "ثبت خودرو"
            : "ذخیره تغییرات"}
        </button>
      </div>
    </form>
  );
}