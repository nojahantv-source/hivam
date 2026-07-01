"use client";

import { useRef, useState, useTransition } from "react";
import { createBrand } from "@/app/actions/brands";

export default function BrandForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [pending, startTransition] = useTransition();

  const [message, setMessage] = useState<string>("");

  async function submit(formData: FormData) {
    setMessage("");

    startTransition(async () => {
      try {
        const result = await createBrand(formData);

        if (!result.success) {
          setMessage(result.message ?? "خطایی رخ داد.");
          return;
        }

        formRef.current?.reset();

        setMessage(result.message ?? "✅ برند با موفقیت ثبت شد.");
      } catch (err) {
        console.error(err);

        setMessage("خطا در ارتباط با سرور.");
      }
    });
  }

  return (
    <form
      ref={formRef}
      action={submit}
      className="space-y-6"
    >
      {/* Name */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          نام برند
        </label>

        <input
          name="name"
          required
          autoComplete="off"
          placeholder="مثلاً ایران خودرو"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Logo */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          لوگو (اختیاری)
        </label>

        <input
          name="logo"
          autoComplete="off"
          placeholder="/logos/ikco.svg"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <p className="mt-2 text-sm text-slate-500">
          فعلاً مسیر فایل لوگو را وارد کنید.
        </p>
      </div>

      {/* Message */}

      {message && (
        <div
          className={`rounded-2xl px-4 py-3 text-sm font-medium ${
            message.startsWith("✅")
              ? "border border-green-200 bg-green-50 text-green-700"
              : "border border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* Button */}

      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl bg-blue-600 px-8 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "در حال ثبت..." : "ثبت برند"}
      </button>
    </form>
  );
}