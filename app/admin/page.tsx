import AdminStats from "@/components/AdminStats";
import AdminTable from "@/components/AdminTable";

import { BRAND } from "@/lib/config/brand";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              پنل مدیریت {BRAND.name}
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900">
              داشبورد مدیریت درخواست‌ها
            </h1>

            <p className="mt-3 max-w-2xl leading-8 text-slate-500">
              مدیریت پرونده‌های خرید اقساطی خودرو، بررسی وضعیت متقاضیان،
              ثبت فعالیت‌ها، پیگیری مراحل تأمین مالی و مدیریت کامل فرآیند
              درخواست‌ها.
            </p>

          </div>

          {/* Status Card */}

          <div className="rounded-3xl border border-green-200 bg-green-50 px-8 py-6 shadow-sm">

            <p className="text-sm text-slate-500">
              وضعیت سامانه
            </p>

            <p className="mt-2 flex items-center gap-2 text-xl font-bold text-green-600">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              آنلاین
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {BRAND.domain}
            </p>

          </div>

        </div>

        {/* Stats */}

        <AdminStats />

        {/* Requests */}

        <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

          <div className="border-b px-8 py-6">

            <h2 className="text-2xl font-bold text-slate-900">
              لیست درخواست‌ها
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              تمامی درخواست‌های ثبت‌شده در سامانه {BRAND.name}
            </p>

          </div>

          <AdminTable />

        </div>

      </div>

    </main>
  );
}