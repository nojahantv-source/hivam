"use client";

import { useMemo, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cars = {
  bmw: ["X3", "X5", "320i"],
  benz: ["C200", "E200", "GLA"],
  toyota: ["Corolla", "Camry", "RAV4"],
  kia: ["Sportage", "K5", "Sorento"],
  hyundai: ["Sonata", "Tucson", "Santa Fe"],
};

function formatPrice(value: string) {
  const english = value
    .replace(/[۰-۹]/g, (d) =>
      "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()
    )
    .replace(/\D/g, "");

  if (!english) return "";

  return Number(english).toLocaleString("en-US");
}

function toNumber(value: string) {
  return Number(value.replace(/,/g, "")) || 0;
}

export default function LoanForm() {
  const [isPending, startTransition] =
    useTransition();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");

  const [duration, setDuration] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const models =
    brand === ""
      ? []
      : cars[brand as keyof typeof cars];

  const loanAmount = useMemo(() => {
    const result =
      toNumber(price) - toNumber(deposit);

    return result > 0 ? result : 0;
  }, [price, deposit]);


async function handleSubmit() {
  if (
    !fullName ||
    !mobile ||
    !brand ||
    !model ||
    !price ||
    !deposit ||
    !duration
  ) {
    setSuccess(false);
    setMessage("لطفاً تمام اطلاعات را تکمیل کنید.");
    return;
  }

  setMessage("");
  setSuccess(false);

  startTransition(async () => {
    try {
      const response = await fetch("/api/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          mobile,
          brand,
          model,
          price: toNumber(price),
          deposit: toNumber(deposit),
          loan: loanAmount,
          months: Number(duration),
          description,
        }),
      });

      const result = await response.json();

      setSuccess(result.success);
      setMessage(result.message);

      if (result.success) {
        setFullName("");
        setMobile("");
        setBrand("");
        setModel("");
        setPrice("");
        setDeposit("");
        setDuration("");
        setDescription("");
      }
    } catch (err) {
      console.error(err);

      setSuccess(false);
      setMessage("ارتباط با سرور برقرار نشد.");
    }
  });
}


  return (
    <Card className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,.10)]">

      <CardContent className="p-8">

        <div className="mb-8">

          <h2 className="text-3xl font-extrabold text-slate-900">
            درخواست وام خودرو
          </h2>

          <p className="mt-2 text-slate-500">
            فرم زیر را تکمیل کنید تا بهترین
            پیشنهادهای خرید اقساطی برای شما
            نمایش داده شود.
          </p>

        </div>

        <div className="space-y-5">

          <div>

            <Label className="mb-2 block">
              نام و نام خانوادگی
            </Label>

            <Input
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              placeholder="مثلاً حمید رضایی"
              className="h-12 rounded-xl"
            />

          </div>

          <div>

            <Label className="mb-2 block">
              شماره موبایل
            </Label>

            <Input
              dir="ltr"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
              placeholder="09121234567"
              className="h-12 rounded-xl text-left"
            />

          </div>

          <div>

            <Label className="mb-2 block">
              برند خودرو
            </Label>

            <Select
              value={brand}
              onValueChange={(value) => {
                setBrand(value);
                setModel("");
              }}
            >

              <SelectTrigger className="h-12 rounded-xl">

                <SelectValue placeholder="انتخاب برند" />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="bmw">
                  BMW
                </SelectItem>

                <SelectItem value="benz">
                  Mercedes-Benz
                </SelectItem>

                <SelectItem value="toyota">
                  Toyota
                </SelectItem>

                <SelectItem value="kia">
                  Kia
                </SelectItem>

                <SelectItem value="hyundai">
                  Hyundai
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div>

            <Label className="mb-2 block">
              مدل خودرو
            </Label>

            <Select
              value={model}
              onValueChange={setModel}
              disabled={!brand}
            >

              <SelectTrigger className="h-12 rounded-xl">

                <SelectValue
                  placeholder={
                    brand
                      ? "انتخاب مدل"
                      : "ابتدا برند را انتخاب کنید"
                  }
                />

              </SelectTrigger>

              <SelectContent>

                {models.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}

              </SelectContent>

            </Select>

          </div>

          {/* ادامه در بخش دوم: قیمت خودرو */}


          {/* Price */}

          <div>

            <Label className="mb-2 block">
              قیمت خودرو
            </Label>

            <Input
              value={price}
              onChange={(e) =>
                setPrice(formatPrice(e.target.value))
              }
              placeholder="۲,۰۰۰,۰۰۰,۰۰۰"
              inputMode="numeric"
              className="h-12 rounded-xl text-left"
            />

          </div>

          {/* Deposit */}

          <div>

            <Label className="mb-2 block">
              پیش پرداخت
            </Label>

            <Input
              value={deposit}
              onChange={(e) =>
                setDeposit(formatPrice(e.target.value))
              }
              placeholder="۵۰۰,۰۰۰,۰۰۰"
              inputMode="numeric"
              className="h-12 rounded-xl text-left"
            />

          </div>

          {/* Duration */}

          <div>

            <Label className="mb-2 block">
              مدت بازپرداخت
            </Label>

            <Select
              value={duration}
              onValueChange={setDuration}
            >

              <SelectTrigger className="h-12 rounded-xl">

                <SelectValue placeholder="انتخاب مدت" />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="12">
                  ۱۲ ماه
                </SelectItem>

                <SelectItem value="24">
                  ۲۴ ماه
                </SelectItem>

                <SelectItem value="36">
                  ۳۶ ماه
                </SelectItem>

                <SelectItem value="48">
                  ۴۸ ماه
                </SelectItem>

                <SelectItem value="60">
                  ۶۰ ماه
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          {/* Description */}

          <div>

            <Label className="mb-2 block">
              توضیحات (اختیاری)
            </Label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="اگر توضیحی درباره درخواست خود دارید بنویسید..."
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-600"
            />

          </div>

          {/* Loan */}

          <div className="rounded-2xl border bg-gradient-to-r from-slate-50 to-blue-50 p-5">

            <p className="text-sm text-slate-500">
              مبلغ تقریبی وام
            </p>

            <div className="mt-3 flex items-end justify-between">

              <p className="text-3xl font-extrabold text-blue-600">

                {loanAmount.toLocaleString("fa-IR")}

              </p>

              <span className="text-slate-500">
                تومان
              </span>

            </div>

          </div>

          {message && (

            <div
              className={`rounded-xl p-4 text-sm font-medium ${
                success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>

          )}

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="h-14 w-full rounded-xl bg-blue-600 text-base font-bold hover:bg-blue-700"
          >

            {isPending
              ? "در حال ثبت..."
              : "دریافت پیشنهادها"}

          </Button>


        </div>

        <div className="mt-8 flex items-center justify-between border-t pt-6 text-sm text-slate-500">

          <span>✔ پاسخ کمتر از ۲۴ ساعت</span>

          <span>✔ ثبت درخواست کاملاً رایگان</span>

        </div>

      </CardContent>

    </Card>

  );
}
