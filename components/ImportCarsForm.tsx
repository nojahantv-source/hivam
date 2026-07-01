"use client";

import { useRef, useState, useTransition } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { importCars } from "@/app/actions/importCars";

export default function ImportCarsForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [pending, startTransition] = useTransition();

  const [fileName, setFileName] = useState("");

  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setMessage("");

    startTransition(async () => {
      const result = await importCars(formData);

      if (!result.success) {
        setMessage(result.message ?? "خطا در ورود اطلاعات");
        return;
      }

      setMessage(result.message ?? "عملیات با موفقیت انجام شد.");

      setFileName("");

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    });
  }

  return (
    <form
      action={submit}
      className="space-y-8"
    >
      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-12">

        <div className="flex flex-col items-center gap-5">

          <div className="rounded-full bg-blue-100 p-5">

            <Upload
              size={34}
              className="text-blue-600"
            />

          </div>

          <div className="text-center">

            <h3 className="text-xl font-bold">

              انتخاب فایل Excel

            </h3>

            <p className="mt-2 text-slate-500">

              فقط فایل‌های
              <span className="mx-1 font-semibold">
                xlsx
              </span>
              مجاز هستند.

            </p>

          </div>

          <input
            ref={inputRef}
            type="file"
            name="file"
            accept=".xlsx"
            required
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            onChange={(e) => {
              const file =
                e.target.files?.[0];

              setFileName(file?.name ?? "");
            }}
          />

          {fileName && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-green-700">

              <FileSpreadsheet size={18} />

              <span className="font-medium">

                {fileName}

              </span>

            </div>
          )}

        </div>

      </div>

      {message && (
        <div
          className={`rounded-2xl p-4 font-medium ${
            message.includes("موفق")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Upload size={18} />

        {pending
          ? "در حال پردازش..."
          : "بارگذاری فایل"}
      </button>
    </form>
  );
}