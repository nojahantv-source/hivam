import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function fa(value: number | string) {
  return new Intl.NumberFormat("fa-IR").format(
    Number(String(value).replace(/,/g, ""))
  );
}

const offers = [
  {
    company: "واسپاری ملت",
    logo: "/logos/mellat.png",
    loan: 1800000000,
    rate: 18,
    advance: 30,
    months: 36,
    installment: 65000000,
    best: true,
  },
  {
    company: "واسپاری بهمن",
    logo: "/logos/bahman.png",
    loan: 1800000000,
    rate: 17.5,
    advance: 25,
    months: 48,
    installment: 53000000,
    best: false,
  },
  {
    company: "واسپاری صبا تأمین",
    logo: "/logos/saba-tamin.png",
    loan: 1800000000,
    rate: 19,
    advance: 20,
    months: 60,
    installment: 46000000,
    best: false,
  },
  {
    company: "واسپاری کارآفرین",
    logo: "/logos/karafarin.png",
    loan: 1800000000,
    rate: 18.2,
    advance: 30,
    months: 36,
    installment: 64000000,
    best: false,
  },
  {
    company: "واسپاری هامرز",
    logo: "/logos/hamraz.png",
    loan: 1800000000,
    rate: 18.8,
    advance: 25,
    months: 48,
    installment: 55000000,
    best: false,
  },
];

export default function Comparison() {
  return (
    <section
      id="comparison"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            مقایسه پیشنهادها
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            مقایسه شرایط خرید اقساطی خودرو
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            شرایط شرکت‌های واسپاری را در یک نگاه مقایسه کنید و بهترین گزینه را انتخاب نمایید.
          </p>

        </div>

        {/* Summary */}

        <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 p-6">

          <div className="grid gap-6 text-center md:grid-cols-4">

            <div>
              <p className="text-3xl font-bold text-blue-600">۵</p>
              <p className="mt-2 text-sm text-slate-600">
                شرکت فعال
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-600">
                ۶۰
              </p>
              <p className="mt-2 text-sm text-slate-600">
                ماه بازپرداخت
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-600">
                ۱۷٫۵٪
              </p>
              <p className="mt-2 text-sm text-slate-600">
                کمترین نرخ سود
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-600">
                رایگان
              </p>
              <p className="mt-2 text-sm text-slate-600">
                ثبت درخواست
              </p>
            </div>

          </div>

        </div>

        {/* Table */}

        <div className="mt-12 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">

          <Table>

            <TableHeader>

              <TableRow className="bg-slate-100">

                <TableHead className="text-center font-bold whitespace-nowrap">
                  شرکت
                </TableHead>

                <TableHead className="text-center font-bold whitespace-nowrap">
                  مبلغ وام
                </TableHead>

                <TableHead className="text-center font-bold whitespace-nowrap">
                  سود
                </TableHead>

                <TableHead className="text-center font-bold whitespace-nowrap">
                  پیش‌پرداخت
                </TableHead>

                <TableHead className="text-center font-bold whitespace-nowrap">
                  بازپرداخت
                </TableHead>

                <TableHead className="text-center font-bold whitespace-nowrap">
                  قسط ماهانه
                </TableHead>

                <TableHead></TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {offers.map((offer) => (

                <TableRow
                  key={offer.company}
                  className={`transition hover:bg-slate-50 ${
                    offer.best
                      ? "border-r-4 border-blue-600 bg-blue-50/40"
                      : ""
                  }`}
                >

                  <TableCell>

                    <div className="flex items-center gap-4">

                      <Image
                        src={offer.logo}
                        alt={offer.company}
                        width={54}
                        height={54}
                        className="rounded-xl border bg-white p-2"
                      />

                      <div>

                        <p className="font-bold text-slate-900">
                          {offer.company}
                        </p>

                        {offer.best && (
                          <Badge className="mt-2 bg-blue-600">
                            پیشنهاد منتخب
                          </Badge>
                        )}

                      </div>

                    </div>

                  </TableCell>

                  <TableCell className="text-center">

                    <p className="font-semibold">
                      {fa(offer.loan)}
                    </p>

                    <span className="text-xs text-slate-500">
                      تومان
                    </span>

                  </TableCell>

                  <TableCell className="text-center">

                    <Badge
                      variant="secondary"
                      className="rounded-full"
                    >
                      {fa(offer.rate)}٪
                    </Badge>

                  </TableCell>

                  <TableCell className="text-center font-semibold">
                    {fa(offer.advance)}٪
                  </TableCell>

                  <TableCell className="text-center">
                    {fa(offer.months)} ماه
                  </TableCell>

                  <TableCell className="text-center">

                    <p className="text-lg font-bold text-blue-700">
                      {fa(offer.installment)}
                    </p>

                    <span className="text-xs text-slate-500">
                      تومان
                    </span>

                  </TableCell>

                  <TableCell className="text-center">

                    <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
                      مشاهده جزئیات
                    </Button>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </div>

      </div>
    </section>
  );
}