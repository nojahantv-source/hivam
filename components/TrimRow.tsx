"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  updateTrim,
  deleteTrim,
  toggleTrim,
} from "@/app/actions/trims";

type Props = {
  trim: {
    id: string;
    name: string;
    slug: string;
    model_id: string;
    model_name: string;
    brand_name: string;
    is_active: boolean;
  };
};

export default function TrimRow({
  trim,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [editing, setEditing] =
    useState(false);

  const [trimName, setTrimName] =
    useState(trim.name);

  const [name, setName] =
    useState(trim.name);

  const [active, setActive] =
    useState(trim.is_active);

  const [message, setMessage] =
    useState("");

  function save() {
    setMessage("");

    const formData = new FormData();

    formData.append("id", trim.id);
    formData.append("name", name);

    startTransition(async () => {
      const result =
        await updateTrim(formData);

      if (!result.success) {
        setMessage(
          result.message ?? "خطا در ذخیره"
        );
        return;
      }

      setTrimName(name);

      setEditing(false);

      router.refresh();
    });
  }

  function changeStatus() {
    setMessage("");

    startTransition(async () => {
      const result =
        await toggleTrim(
          trim.id,
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
        `تیپ "${trimName}" حذف شود؟`
      )
    ) {
      return;
    }

    setMessage("");

    startTransition(async () => {
      const result =
        await deleteTrim(trim.id);

      if (!result.success) {
        setMessage(
          result.message ?? "خطا در حذف"
        );
        return;
      }

      router.refresh();
    });
  }

  return (
    <tr className="border-t transition hover:bg-slate-50">

      {/* Brand */}

      <td className="px-6 py-5 text-slate-500">
        {trim.brand_name}
      </td>

      {/* Model */}

      <td className="px-6 py-5">
        {trim.model_name}
      </td>

      {/* Trim */}

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
              {trimName}
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
          {trim.slug}
        </code>

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
                  setName(trimName);
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