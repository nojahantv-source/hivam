import Image from "next/image";

import { BRAND } from "@/lib/config/brand";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* Brand */}

          <div className="lg:col-span-2">

            <a
              href="#hero"
              className="flex items-center gap-3"
            >
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-2">

                <Image
                  src="/logo.svg"
                  alt={BRAND.englishName}
                  width={44}
                  height={44}
                  className="object-contain"
                />

              </div>

              <div>

                <h2 className="text-2xl font-extrabold">
                  {BRAND.name}
                </h2>

                <p className="text-sm text-slate-400">
                  {BRAND.domain}
                </p>

              </div>

            </a>

            <p className="mt-6 max-w-xl leading-8 text-slate-400">
              {BRAND.name} سامانه هوشمند ثبت، بررسی و مدیریت درخواست‌های
              خرید اقساطی خودرو است. کاربران می‌توانند درخواست خود را ثبت
              کرده و مناسب‌ترین شرایط تأمین مالی را از شرکت‌های واسپاری
              دریافت و مقایسه کنند.
            </p>

          </div>

          {/* Menu */}

          <div>

            <h3 className="mb-5 text-lg font-bold">
              دسترسی سریع
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <a
                  href="#hero"
                  className="transition hover:text-white"
                >
                  خانه
                </a>
              </li>

              <li>
                <a
                  href="#partners"
                  className="transition hover:text-white"
                >
                  شرکت‌های همکار
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="transition hover:text-white"
                >
                  مزایا
                </a>
              </li>

              <li>
                <a
                  href="#comparison"
                  className="transition hover:text-white"
                >
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
                🌐 {BRAND.domain}
              </p>

              <p>
                ✉️ {BRAND.email}
              </p>

              {BRAND.phone && (
                <p>
                  ☎️ {BRAND.phone}
                </p>
              )}

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-right">

            <div>

              <h4 className="text-lg font-bold">
                تأمین مالی هوشمند، انتخاب مطمئن
              </h4>

              <p className="mt-2 text-slate-400">
                درخواست خود را ثبت کنید تا بهترین گزینه‌های خرید اقساطی
                خودرو را بررسی و مقایسه کنید.
              </p>

            </div>

            <a
              href="#loan-form"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-700"
            >
              ثبت درخواست
            </a>

          </div>

        </div>

        {/* Copyright */}

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">

          © {new Date().getFullYear()} {BRAND.name} ({BRAND.englishName})
          <br />
          تمامی حقوق این وب‌سایت محفوظ است.

        </div>

      </div>
    </footer>
  );
}