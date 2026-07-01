import {
  Scale,
  WalletCards,
  Clock3,
  ShieldCheck,
  SearchCheck,
  CarFront,
} from "lucide-react";

import { BRAND } from "@/lib/config/brand";

const features = [
  {
    icon: Scale,
    title: "مقایسه هوشمند پیشنهادها",
    description:
      "شرایط شرکت‌های تأمین مالی و واسپاری را در یک نگاه بررسی کرده و مناسب‌ترین گزینه را انتخاب کنید.",
  },
  {
    icon: WalletCards,
    title: "شفافیت کامل هزینه‌ها",
    description:
      "مبلغ وام، پیش‌پرداخت، اقساط، نرخ سود و مدت بازپرداخت را با جزئیات مشاهده و مقایسه کنید.",
  },
  {
    icon: Clock3,
    title: "ثبت درخواست در چند دقیقه",
    description:
      "فرآیند ثبت درخواست ساده و سریع طراحی شده تا بدون مراجعه حضوری، اطلاعات خود را ارسال کنید.",
  },
  {
    icon: SearchCheck,
    title: "بررسی تخصصی پرونده",
    description:
      "درخواست شما توسط کارشناسان بررسی شده و مناسب‌ترین گزینه‌های تأمین مالی پیشنهاد می‌شود.",
  },
  {
    icon: ShieldCheck,
    title: "امنیت اطلاعات",
    description:
      "اطلاعات شخصی و مالی شما با استانداردهای امنیتی مناسب نگهداری و محرمانه باقی می‌ماند.",
  },
  {
    icon: CarFront,
    title: "تمرکز بر خرید اقساطی خودرو",
    description:
      "تمام خدمات " +
      BRAND.name +
      " برای ساده‌تر کردن فرآیند خرید اقساطی خودرو و انتخاب بهترین روش تأمین مالی طراحی شده است.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            مزایای {BRAND.name}
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            چرا {BRAND.name}؟
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {BRAND.name} با ترکیب فناوری و تجربه کارشناسان، فرآیند دریافت
            تسهیلات و خرید اقساطی خودرو را سریع‌تر، شفاف‌تر و مطمئن‌تر
            می‌کند.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">

                  <Icon size={30} />

                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}