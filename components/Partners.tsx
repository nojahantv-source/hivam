import Image from "next/image";

const partners = [
  {
    name: "واسپاری ملت",
    logo: "/logos/mellat.png",
  },
  {
    name: "واسپاری هامرز",
    logo: "/logos/hamraz.png",
  },
  {
    name: "واسپاری بهمن",
    logo: "/logos/bahman.png",
  },
  {
    name: "واسپاری صبا تأمین",
    logo: "/logos/saba-tamin.png",
  },
  {
    name: "واسپاری کارآفرین",
    logo: "/logos/karafarin.png",
  },
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            شرکت‌های همکار
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            شرکت‌های واسپاری طرف قرارداد
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            های وام شرایط خرید اقساطی خودرو را از معتبرترین شرکت‌های
            واسپاری جمع‌آوری و در یک نگاه برای شما مقایسه می‌کند.
          </p>

        </div>

        {/* Partners */}

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

          {partners.map((partner) => (

            <div
              key={partner.name}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
            >

              <div className="flex h-24 items-center justify-center">

                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={150}
                  height={70}
                  className="h-16 w-auto object-contain transition duration-300 group-hover:scale-110"
                />

              </div>

              <div className="mt-6 border-t pt-5 text-center">

                <h3 className="font-bold text-slate-900">
                  {partner.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  ارائه‌دهنده خدمات خرید اقساطی خودرو
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className="mt-14 rounded-3xl border border-blue-100 bg-blue-50 p-8 text-center">

          <h3 className="text-2xl font-bold text-slate-900">
            مقایسه همه پیشنهادها در یک صفحه
          </h3>

          <p className="mt-3 text-slate-600 leading-8">
            بدون نیاز به مراجعه به چندین وب‌سایت، شرایط شرکت‌های مختلف
            واسپاری را مقایسه کنید و مناسب‌ترین گزینه را انتخاب نمایید.
          </p>

        </div>

      </div>
    </section>
  );
}