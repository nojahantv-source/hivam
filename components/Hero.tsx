import Image from "next/image";
import LoanForm from "./LoanForm";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100"
    >
      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">

        {/* Hero Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
            🚗 های وام | سامانه هوشمند مقایسه خرید اقساطی خودرو
          </span>

          <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">

            مقایسه هوشمند
            <br />

            وام خرید خودرو

          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            شرایط شرکت‌های واسپاری را در چند ثانیه مقایسه کنید،
            نرخ سود، مبلغ اقساط و پیش‌پرداخت را ببینید و
            بهترین گزینه را برای خرید خودروی خود انتخاب کنید.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-blue-600 px-8 font-bold transition hover:scale-[1.03] hover:bg-blue-700"
            >
              <a href="#loan-form">
                شروع درخواست
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl"
            >
              <a href="#comparison">
                مقایسه پیشنهادها
              </a>
            </Button>

          </div>

          {/* Statistics */}

          <div className="mt-12 grid grid-cols-3 gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur">

            <div>

              <p className="text-3xl font-extrabold text-blue-600">
                ۵+
              </p>

              <p className="mt-2 text-sm text-slate-500">
                شرکت واسپاری
              </p>

            </div>

            <div>

              <p className="text-3xl font-extrabold text-blue-600">
                ۶۰
              </p>

              <p className="mt-2 text-sm text-slate-500">
                ماه بازپرداخت
              </p>

            </div>

            <div>

              <p className="text-3xl font-extrabold text-blue-600">
                ۱۰۰٪
              </p>

              <p className="mt-2 text-sm text-slate-500">
                رایگان
              </p>

            </div>

          </div>

        </div>

        {/* Content */}

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-2">

          {/* Car */}

          <div className="order-2 flex justify-center lg:order-1">

            <div className="relative">

              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/60 blur-3xl" />

              <div className="absolute bottom-4 left-1/2 h-10 w-80 -translate-x-1/2 rounded-full bg-black/20 blur-2xl" />

              <Image
                src="/images/hero-car.png"
                alt="خرید اقساطی خودرو"
                width={900}
                height={560}
                priority
                className="relative z-10 w-full max-w-[760px] object-contain transition duration-500 hover:scale-105"
              />

            </div>

          </div>

          {/* Form */}

          <div
            id="loan-form"
            className="order-1 lg:order-2"
          >
            <LoanForm />
          </div>

        </div>

      </div>
    </section>
  );
}