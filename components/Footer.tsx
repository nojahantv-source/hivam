export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* Brand */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-extrabold">
                H
              </div>

              <div>

                <h2 className="text-2xl font-extrabold">
                  های وام
                </h2>

                <p className="text-sm text-slate-400">
                  HiVam.ir
                </p>

              </div>

            </div>

            <p className="mt-6 max-w-xl leading-8 text-slate-400">
              های وام سامانه هوشمند مقایسه شرایط خرید اقساطی خودرو است.
              شرایط شرکت‌های واسپاری را در یک نگاه مقایسه کنید و
              مناسب‌ترین گزینه را برای خرید خودروی خود انتخاب نمایید.
            </p>

          </div>

          {/* Menu */}

          <div>

            <h3 className="mb-5 text-lg font-bold">
              دسترسی سریع
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <a href="#hero" className="transition hover:text-white">
                  خانه
                </a>
              </li>

              <li>
                <a href="#partners" className="transition hover:text-white">
                  شرکت‌های همکار
                </a>
              </li>

              <li>
                <a href="#features" className="transition hover:text-white">
                  مزایا
                </a>
              </li>

              <li>
                <a href="#comparison" className="transition hover:text-white">
                  مقایسه پیشنهادها
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 text-lg font-bold">
              ارتباط با ما
            </h3>

            <div className="space-y-4 text-slate-400">

              <p>
                🌐 hivam.ir
              </p>

              <p>
                ✉️ info@hivam.ir
              </p>

              <p>
                ☎️ ۰۲۱-۱۲۳۴۵۶۷۸
              </p>

            </div>

          </div>

        </div>

        {/* Trust Box */}

        <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-right">

            <div>

              <h4 className="text-lg font-bold">
                انتخاب هوشمند، خرید مطمئن
              </h4>

              <p className="mt-2 text-slate-400">
                مقایسه شرایط خرید اقساطی خودرو از شرکت‌های واسپاری در یک پلتفرم.
              </p>

            </div>

            <a
              href="#loan-form"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-700"
            >
              ثبت درخواست وام
            </a>

          </div>

        </div>

        {/* Copyright */}

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">

          © {new Date().getFullYear()} های وام (HiVam) — تمامی حقوق این وب‌سایت محفوظ است.

        </div>

      </div>

    </footer>
  );
}