"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import SearchBox from "./SearchBox";
import StatusBadge from "./StatusBadge";
import StatusSelect from "./StatusSelect";

type LoanRequest = {
  id: string;
  full_name: string;
  mobile: string;
  brand: string;
  model: string;
  price: number;
  deposit: number;
  loan: number;
  months: number;
  status: string;
  description?: string;
  created_at: string;
};

type Props = {
  requests: LoanRequest[];
};

function formatMoney(value?: number) {
  return Number(value ?? 0).toLocaleString("fa-IR");
}

export default function AdminTableClient({
  requests,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return requests;

    return requests.filter((item) => {
      return (
        item.full_name?.toLowerCase().includes(q) ||
        item.mobile?.includes(q) ||
        item.brand?.toLowerCase().includes(q) ||
        item.model?.toLowerCase().includes(q)
      );
    });
  }, [search, requests]);

  return (
    <div>

      {/* Search */}

      <div className="border-b bg-white p-6">
        <SearchBox
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 border-b bg-slate-50">

            <tr className="text-sm font-bold text-slate-600">

              <th className="px-6 py-4 text-right">
                متقاضی
              </th>

              <th className="px-6 py-4 text-right">
                تماس
              </th>

              <th className="px-6 py-4 text-right">
                خودرو
              </th>

              <th className="px-6 py-4 text-right">
                مبلغ وام
              </th>

              <th className="px-6 py-4 text-right">
                بازپرداخت
              </th>

              <th className="px-6 py-4 text-right">
                وضعیت
              </th>

              <th className="px-6 py-4 text-right">
                ثبت
              </th>

              <th className="px-6 py-4 text-center">
                عملیات
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item.id}
                className="border-b transition hover:bg-slate-50"
              >

                {/* Applicant */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {item.full_name?.charAt(0)}
                    </div>

                    <div>

                      <Link
                        href={`/admin/requests/${item.id}`}
                        className="font-semibold text-slate-900 transition hover:text-blue-600"
                      >
                        {item.full_name}
                      </Link>

                      {item.description && (
                        <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                          {item.description}
                        </p>
                      )}

                    </div>

                  </div>

                </td>

                {/* Mobile */}

                <td className="px-6 py-5">

                  <span
                    dir="ltr"
                    className="font-medium"
                  >
                    {item.mobile}
                  </span>

                </td>

                {/* Car */}

                <td className="px-6 py-5">

                  <p className="font-semibold">
                    {item.brand}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.model}
                  </p>

                </td>

                {/* Loan */}

                <td className="px-6 py-5">

                  <span className="font-bold text-blue-700">
                    {formatMoney(item.loan)}
                  </span>

                  <span className="mr-1 text-xs text-slate-500">
                    تومان
                  </span>

                </td>

                {/* Months */}

                <td className="px-6 py-5">

                  {item.months} ماه

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <div className="space-y-2">

                    <StatusBadge
                      status={item.status}
                    />

                    <StatusSelect
                      id={item.id}
                      status={item.status}
                    />

                  </div>

                </td>

                {/* Date */}

                <td className="px-6 py-5 text-sm text-slate-500">

                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("fa-IR")
                    : "-"}

                </td>

                {/* Action */}

                <td className="px-6 py-5 text-center">

                  <Link
                    href={`/admin/requests/${item.id}`}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    مشاهده
                  </Link>

                </td>

              </tr>

            ))}

            {filtered.length === 0 && (

              <tr>

                <td
                  colSpan={8}
                  className="py-16 text-center text-slate-500"
                >
                  هیچ پرونده‌ای با این مشخصات پیدا نشد.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}