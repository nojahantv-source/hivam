"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  updateCar,
  deleteCar,
  toggleCar,
} from "@/app/actions/cars";

type Props = {
  car: {
    id: string;

    brand_id: string;
    brand_name: string;

    model_id: string;
    model_name: string;

    trim_id: string;
    trim_name: string;

    year: number;

    mileage: number;

    color: string;

    price: number;

    description: string;

    is_active: boolean;
  };
};

export default function CarRow({
  car,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [editing, setEditing] =
    useState(false);

  const [active, setActive] = useState(
    car.is_active
  );

  const [year, setYear] = useState(
    car.year
  );

  const [mileage, setMileage] =
    useState(car.mileage);

  const [color, setColor] =
    useState(car.color);

  const [price, setPrice] =
    useState(car.price);

  const [description, setDescription] =
    useState(car.description);

  const [message, setMessage] =
    useState("");

  function save() {
    setMessage("");

    const formData = new FormData();

    formData.append("id", car.id);
    formData.append("brand_id", car.brand_id);
    formData.append("model_id", car.model_id);
    formData.append("trim_id", car.trim_id);

    formData.append(
      "year",
      String(year)
    );

    formData.append(
      "mileage",
      String(mileage)
    );

    formData.append("color", color);

    formData.append(
      "price",
      String(price)
    );

    formData.append(
      "description",
      description
    );

    startTransition(async () => {
      const result =
        await updateCar(formData);

      if (!result.success) {
        setMessage(
          result.message ?? "خطا"
        );
        return;
      }

      setEditing(false);

      router.refresh();
    });
  }

  function changeStatus() {
    setMessage("");

    startTransition(async () => {
      const result =
        await toggleCar(
          car.id,
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
        "این خودرو حذف شود؟"
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteCar(car.id);

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

      <td className="px-6 py-5">
        {car.brand_name}
      </td>

      <td className="px-6 py-5">
        {car.model_name}
      </td>

      <td className="px-6 py-5">
        {car.trim_name || "-"}
      </td>

      <td className="px-6 py-5">

        {editing ? (
          <input
            type="number"
            value={year}
            onChange={(e) =>
              setYear(
                Number(e.target.value)
              )
            }
            className="w-24 rounded-xl border px-3 py-2"
          />
        ) : (
          year.toLocaleString("fa-IR")
        )}

      </td>

      <td className="px-6 py-5">

        {editing ? (
          <input
            type="number"
            value={mileage}
            onChange={(e) =>
              setMileage(
                Number(e.target.value)
              )
            }
            className="w-32 rounded-xl border px-3 py-2"
          />
        ) : (
          mileage.toLocaleString("fa-IR")
        )}

      </td>

      <td className="px-6 py-5">

        {editing ? (
          <input
            value={color}
            onChange={(e) =>
              setColor(
                e.target.value
              )
            }
            className="rounded-xl border px-3 py-2"
          />
        ) : (
          color
        )}

      </td>

      <td className="px-6 py-5 font-bold">

        {editing ? (
          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(
                Number(e.target.value)
              )
            }
            className="w-40 rounded-xl border px-3 py-2"
          />
        ) : (
          `${price.toLocaleString(
            "fa-IR"
          )} تومان`
        )}

      </td>

      <td className="px-6 py-5">

        <button
          disabled={pending}
          onClick={changeStatus}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {active
            ? "فعال"
            : "غیرفعال"}
        </button>

      </td>

      <td className="px-6 py-5">

        <div className="flex gap-2">

          {editing ? (
            <>
              <button
                disabled={pending}
                onClick={save}
                className="rounded-xl bg-green-600 px-4 py-2 text-white"
              >
                ذخیره
              </button>

              <button
                onClick={() =>
                  setEditing(false)
                }
                className="rounded-xl bg-slate-200 px-4 py-2"
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
                className="rounded-xl bg-blue-600 px-4 py-2 text-white"
              >
                ویرایش
              </button>

              <button
                disabled={pending}
                onClick={remove}
                className="rounded-xl bg-red-600 px-4 py-2 text-white"
              >
                حذف
              </button>
            </>
          )}

        </div>

        {message && (
          <p className="mt-2 text-xs text-red-500">
            {message}
          </p>
        )}

      </td>

    </tr>
  );
}