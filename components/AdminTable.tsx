import Link from "next/link";
import StatusSelect from "./StatusSelect";
import { supabaseAdmin } from "@/lib/supabase-admin";
import StatusBadge from "./StatusBadge";

function formatMoney(value: number) {
  return Number(value).toLocaleString("fa-IR");
}

export default async function AdminTable() {

  const { data, error } = await supabaseAdmin
    .from("loan_requests")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-8 text-red-600">
        خطا در دریافت اطلاعات
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-2xl bg-slate-50 p-12 text-center">

        <h3 className="text-xl font-bold">
          هنوز هیچ درخواستی ثبت نشده است.
        </h3>

        <p className="mt-3 text-slate-500">
          بعد از ثبت اولین درخواست، اطلاعات اینجا نمایش داده می‌شود.
        </p>

      </div>
    );
  }

  return (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="border-b bg-slate-50">

          <tr>

            <th className="px-6 py-5 text-right text-sm font-bold text-slate-700">
              متقاضی
            </th>

            <th className="px-6 py-5 text-right text-sm font-bold text-slate-700">
              موبایل
            </th>

            <th className="px-6 py-5 text-right text-sm font-bold text-slate-700">
              خودرو
            </th>

            <th className="px-6 py-5 text-right text-sm font-bold text-slate-700">
              مبلغ وام
            </th>

            <th className="px-6 py-5 text-right text-sm font-bold text-slate-700">
              بازپرداخت
            </th>

            <th className="px-6 py-5 text-right text-sm font-bold text-slate-700">
              وضعیت
            </th>

            <th className="px-6 py-5 text-right text-sm font-bold text-slate-700">
              تاریخ
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr
              key={item.id}
              className="border-b transition hover:bg-slate-50"
            >

           
              <td className="px-6 py-5">

                <div>

                  <Link
                     href={`/admin/requests/${item.id}`}
                     className="font-semibold text-slate-900 hover:text-blue-600"
                    >
                 {item.full_name}
                    </Link>

                  {item.description && (
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  )}

                </div>

              </td>

              <td className="px-6 py-5">

                <span dir="ltr" className="font-medium">
                  {item.mobile}
                </span>

              </td>

              <td className="px-6 py-5">

                <div>

                  <p className="font-semibold">
                    {item.brand}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.model}
                  </p>

                </div>

              </td>

              <td className="px-6 py-5">

                <span className="font-bold text-blue-700">

                  {formatMoney(item.loan)}

                </span>

                <span className="mr-2 text-xs text-slate-500">
                  تومان
                </span>

              </td>

              <td className="px-6 py-5">

                {item.months} ماه

              </td>

              <td className="px-6 py-5">

               <StatusSelect
                     id={item.id}
                     status={item.status}
                />

              </td>

              <td className="px-6 py-5 text-sm text-slate-500">

                {item.created_at
                  ? new Date(
                      item.created_at
                    ).toLocaleDateString("fa-IR")
                  : "-"}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

      
