"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  deleteBrand,
  toggleBrand,
  updateBrand,
} from "@/app/actions/brands";

type Props = {
  brand: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    is_active: boolean;
  };

  modelsCount: number;
};

export default function BrandRow({
  brand,
  modelsCount,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [editing, setEditing] =
    useState(false);

  const [active, setActive] = useState(
    brand.is_active
  );

  const [brandName, setBrandName] =
    useState(brand.name);

  const [logo, setLogo] = useState(
    brand.logo ?? ""
  );

  const [name, setName] = useState(
    brand.name
  );

  const [message, setMessage] =
    useState("");

  function save() {
    setMessage("");

    const formData = new FormData();

    formData.append("id", brand.id);
    formData.append("name", name);
    formData.append("logo", logo);

    startTransition(async () => {
      const result =
        await updateBrand(formData);

      if (!result.success) {
        setMessage(
          result.message ?? "خطایی رخ داد."
        );
        return;
      }

      setBrandName(name);

      setEditing(false);

      router.refresh();
    });
  }

  function changeStatus() {
    setMessage("");

    startTransition(async () => {
      const result =
        await toggleBrand(
          brand.id,
          active
        );

      if (!result.success) {
        setMessage(
          result.message ?? "خطا"
        );
        return;
      }

      setActive(!active);

      router.refresh();
    });
  }

  function remove() {
    if (
      !window.confirm(
        `آیا برند "${brandName}" حذف شود؟`
      )
    ) {
      return;
    }

    setMessage("");

    startTransition(async () => {
      const result =
        await deleteBrand(brand.id);

      if (!result.success) {
        setMessage(
          result.message ?? "خطا"
        );
        return;
      }

      router.refresh();
    });
  }

  return (
    <tr className="border-t transition hover:bg-slate-50">

      {/* Brand */}

      <td className="px-6 py-5">

        {editing ? (
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        ) : (
          <div>
            <p className="font-semibold text-slate-900">
              {brandName}
            </p>

            {message && (
              <p className="mt-1 text-xs text-red-500">
                {message}
              </p>
            )}
          </div>
        )}

      </td>

      {/* Slug */}

      <td className="px-6 py-5">

        <code className="rounded-lg bg-slate-100 px-3 py-2 text-xs">

          {brand.slug}

        </code>

      </td>

      {/* Logo */}

      <td className="px-6 py-5">

        {editing ? (
          <input
            value={logo}
            onChange={(e) =>
              setLogo(e.target.value)
            }
            placeholder="/logos/bmw.svg"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        ) : (
          <span className="text-sm text-slate-500">
            {logo || "-"}
          </span>
        )}

      </td>

      {/* Models */}

      <td className="px-6 py-5 text-center font-bold">

        {modelsCount.toLocaleString("fa-IR")}

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <button
          disabled={pending}
          onClick={changeStatus}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            active
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {pending
            ? "..."
            : active
            ? "فعال"
            : "غیرفعال"}
        </button>

      </td>

      {/* Actions */}

      <td className="px-6 py-5">

        <div className="flex gap-2">

          {editing ? (
            <>
              <button
                disabled={pending}
                onClick={save}
                className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                ذخیره
              </button>

              <button
                disabled={pending}
                onClick={() => {
                  setEditing(false);

                  setName(brandName);

                  setLogo(
                    brand.logo ?? ""
                  );

                  setMessage("");
                }}
                className="rounded-xl bg-slate-200 px-4 py-2 text-sm"
              >
                انصراف
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  setEditing(true)
                }
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                ویرایش
              </button>

              <button
                disabled={pending}
                onClick={remove}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                حذف
              </button>
            </>
          )}

        </div>

      </td>

    </tr>
  );
}