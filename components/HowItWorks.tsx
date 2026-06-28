"use client";

import {
  Car,
  ChartColumn,
  BadgeCheck,
} from "lucide-react";

import StepCard from "./StepCard";

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-2xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            فرآیند دریافت وام
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            فقط در ۳ مرحله
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            فرآیند دریافت وام خودرو را به ساده‌ترین شکل طراحی کرده‌ایم.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          <StepCard
            number="01"
            title="ثبت اطلاعات خودرو"
            description="اطلاعات خودرو، قیمت و پیش‌پرداخت را وارد کنید تا جستجو آغاز شود."
            icon={<Car size={32} />}
            color="bg-blue-600"
            delay={0}
          />

          <StepCard
            number="02"
            title="مقایسه پیشنهادها"
            description="شرایط شرکت‌های واسپاری مختلف را از نظر سود، اقساط و مدت بازپرداخت مقایسه کنید."
            icon={<ChartColumn size={32} />}
            color="bg-violet-600"
            delay={0.2}
          />

          <StepCard
            number="03"
            title="ثبت درخواست"
            description="بهترین پیشنهاد را انتخاب کنید و درخواست خود را به صورت آنلاین ارسال نمایید."
            icon={<BadgeCheck size={32} />}
            color="bg-emerald-600"
            delay={0.4}
          />

        </div>

      </div>

    </section>
  );
}