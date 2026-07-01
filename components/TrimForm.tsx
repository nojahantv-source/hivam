"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { createTrim } from "@/app/actions/trims";
import { createClient } from "@/lib/supabase/client";

type Model = {
  id: string;
  name: string;
  brand_id: string;
  brands: {
    name: string;
  } | null;
};

export default function TrimForm() {
  const supabase = createClient();

  const formRef = useRef<HTMLFormElement>(null);

  const [pending, startTransition] = useTransition();

  const [models, setModels] = useState<Model[]>([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadModels() {
      const { data } = await supabase
        .from("car_models")
        .select(`
          id,
          name,
          brand_id,
          brands(name)
        `)
        .eq("is_active", true)
        .order("name");

      setModels((data ?? []) as Model[]);
    }

    loadModels();
  }, []);

  function submit(formData: FormData) {
    setMessage("");

    startTransition(async () => {
      const result = await createTrim(formData);

      setMessage(result.message);

      if (result.success) {
        formRef.current?.reset();
      }
    });
  }

  return (
    <form
      ref={formRef}
      action={submit}
      className="space-y-6"
    >
      {/* Model */}

      <div>
        <label className="mb-2 block text-sm font-semibold">
          مدل خودرو
        </label>

        <select
          name="model_id"
          required
          className="w-full rounded-2xl border px-4 py-3"
        >
          <option value="">
            انتخاب مدل...
          </option>

          {models.map((model) => (
            <option
              key={model.id}
              value={model.id}
            >
              {model.brands?.name} — {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* Trim */}

      <div>
        <label className="mb-2 block text-sm font-semibold">
          نام تیپ
        </label>

        <input
          name="name"
          required
          placeholder="مثلاً ELX"
          className="w-full rounded-2xl border px-4 py-3"
        />
      </div>

      {/* Message */}

      {message && (
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            message.includes("موفق")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* Button */}

      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending
          ? "در حال ثبت..."
          : "ثبت تیپ"}
      </button>
    </form>
  );
}