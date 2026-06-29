


import AdminStats from "@/components/AdminStats";
import AdminTable from "@/components/AdminTable";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              پنل مدیریت HiVam
            </span>

            <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
              داشبورد مدیریت درخواست‌ها
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              مدیریت درخواست‌های خرید اقساطی خودرو، بررسی وضعیت
              متقاضیان و پیگیری فرآیند تأمین مالی.
            </p>

          </div>

          <div className="rounded-3xl border border-green-200 bg-green-50 px-8 py-6">

            <p className="text-sm text-slate-500">
              وضعیت سامانه
            </p>

            <p className="mt-2 text-xl font-bold text-green-600">
              ● آنلاین
            </p>

          </div>

        </div>

        <AdminStats />

        {/* Table */}

        <div className="rounded-3xl bg-white shadow-xl">

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                لیست درخواست‌ها
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                آخرین درخواست‌های ثبت‌شده در سامانه
              </p>

            </div>

          </div>

          <AdminTable />

        </div>

      </div>

    </main>
  );
}

