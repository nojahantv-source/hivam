"use client";

import { useMemo, useState } from "react";

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
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
    .replace(/\D/g, "");

  if (!english) return "";

  return Number(english).toLocaleString("en-US");
}

function toNumber(value: string) {
  return Number(value.replace(/,/g, "")) || 0;
}

export default function LoanForm() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [duration, setDuration] = useState("");

  const models =
    brand === ""
      ? []
      : cars[brand as keyof typeof cars];

  const loanAmount = useMemo(() => {
    const result = toNumber(price) - toNumber(deposit);

    return result > 0 ? result : 0;
  }, [price, deposit]);

  return (
    <Card className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,.10)]">

      <CardContent className="p-8">

        {/* Header */}

        <div className="mb-8">

          <h2 className="text-3xl font-extrabold text-slate-900">
            درخواست وام
          </h2>

          <p className="mt-2 text-slate-500">
            اطلاعات خودرو را وارد کنید تا بهترین پیشنهادها نمایش داده شود.
          </p>

        </div>

        <div className="space-y-5">

          {/* Brand */}

          <div>

            <Label className="mb-2 block font-medium">
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

                <SelectItem value="bmw">BMW</SelectItem>

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

          {/* Model */}

          <div>

            <Label className="mb-2 block font-medium">
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

          {/* Price */}

          <div>

            <Label className="mb-2 block font-medium">
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

            <Label className="mb-2 block font-medium">
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

            <Label className="mb-2 block font-medium">
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

          {/* Loan Amount */}

          <div className="rounded-2xl border bg-gradient-to-r from-slate-50 to-blue-50 p-5">

            <p className="text-sm text-slate-500">
              مبلغ تقریبی وام
            </p>

            <div className="mt-2 flex items-end justify-between">

              <p className="text-3xl font-extrabold text-blue-600">

                {loanAmount.toLocaleString("en-US")}

              </p>

              <span className="text-slate-500">
                تومان
              </span>

            </div>

          </div>

          {/* Button */}

          <Button className="h-14 w-full rounded-xl bg-blue-600 text-base font-bold hover:bg-blue-700">

            دریافت پیشنهادها

          </Button>

        </div>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between border-t pt-6 text-sm text-slate-500">

          <span>✔ پاسخ کمتر از ۲۴ ساعت</span>

          <span>✔ کاملاً رایگان</span>

        </div>

      </CardContent>

    </Card>
  );
}