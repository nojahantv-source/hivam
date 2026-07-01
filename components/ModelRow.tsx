"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  updateModel,
  deleteModel,
  toggleModel,
} from "@/app/actions/models";

type Props = {
  model: {
    id: string;
    name: string;
    slug: string;
    brand_id: string;
    brand_name: string;
    is_active: boolean;
  };

  trimsCount: number;
};

export default function ModelRow({
  model,
  trimsCount,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(model.name);

  const [isActive, setIsActive] =
    useState(model.is_active);

  const [error, setError] =
    useState("");

  /* =========================
     UPDATE MODEL
  ========================= */

  function save() {
    setError("");

    const formData = new FormData();
    formData.append("id", model.id);
    formData.append("name", name);

    startTransition(async () => {
      try {
        await updateModel(formData);

        setEditing(false);
        router.refresh();
      } catch (e: any) {
        setError(
          e?.message || "خطا در ذخیره"
        );
      }
    });
  }

  /* =========================
     TOGGLE STATUS
  ========================= */

  function toggleStatus() {
    setError("");

    startTransition(async () => {
      try {
        await toggleModel(
          model.id,
          isActive
        );

        setIsActive(!isActive);
        router.refresh();
      } catch (e: any) {
        setError(e?.message || "خطا");
      }
    });
  }

  /* =========================
     DELETE MODEL
  ========================= */

  function remove() {
    if (
      !confirm(
        `مدل "${model.name}" حذف شود؟`
      )
    ) {
      return;
    }

    setError("");

    startTransition(async () => {
      try {
        await deleteModel(model.id);
        router.refresh();
      } catch (e: any) {
        setError(e?.message || "خطا در حذف");
      }
    });
  }

  return (
    <tr className="border-t transition hover:bg-slate-50">

      {/* BRAND */}

      <td className="px-6 py-5 text-slate-500">
        {model.brand_name}
      </td>

      {/* MODEL */}

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
              {model.name}
            </p>

            {error && (
              <p className="mt-1 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
        )}

      </td>

      {/* SLUG */}

      <td className="px-6 py-5">
        <code className="rounded bg-slate-100 px-3 py-2 text-xs">
          {model.slug}
        </code>
      </td>

      {/* TRIMS COUNT */}

      <td className="px-6 py-5 text-center font-bold">
        {trimsCount.toLocaleString("fa-IR")}
      </td>

      {/* STATUS */}

      <td className="px-6 py-5">

        <button
          disabled={pending}
          onClick={toggleStatus}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            isActive
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {pending
            ? "..."
            : isActive
            ? "فعال"
            : "غیرفعال"}
        </button>

      </td>

      {/* ACTIONS */}

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
                  setName(model.name);
                  setError("");
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