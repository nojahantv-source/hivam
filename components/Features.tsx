import {
  Scale,
  WalletCards,
  Clock3,
  ShieldCheck,
  SearchCheck,
  CarFront,
} from "lucide-react";

const features = [
  {
    icon: Scale,
    title: "مقایسه هوشمند",
    description:
      "شرایط شرکت‌های مختلف واسپاری را در یک صفحه مشاهده و بهترین گزینه را انتخاب کنید.",
  },
  {
    icon: WalletCards,
    title: "شفافیت کامل هزینه‌ها",
    description:
      "نرخ سود، مبلغ اقساط، پیش‌پرداخت و مدت بازپرداخت را بدون ابهام مقایسه کنید.",
  },
  {
    icon: Clock3,
    title: "صرفه‌جویی در زمان",
    description:
      "دیگر نیازی به مراجعه به چندین وب‌سایت یا تماس با شرکت‌های مختلف نخواهید داشت.",
  },
  {
    icon: SearchCheck,
    title: "اطلاعات به‌روز",
    description:
      "شرایط شرکت‌های واسپاری به‌صورت منظم بررسی و برای مقایسه در اختیار شما قرار می‌گیرد.",
  },
  {
    icon: ShieldCheck,
    title: "اطلاعات امن",
    description:
      "اطلاعات واردشده در فرم درخواست با رعایت اصول امنیتی نگهداری می‌شود.",
  },
  {
    icon: CarFront,
    title: "تمرکز بر خرید خودرو",
    description:
      "تمام خدمات های وام با هدف انتخاب بهترین روش خرید اقساطی خودرو طراحی شده است.",
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
            مزایای های وام
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            چرا های وام؟
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            همه چیز برای اینکه بتوانید سریع‌تر، راحت‌تر و هوشمندانه‌تر
            بهترین شرایط خرید اقساطی خودرو را انتخاب کنید.
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