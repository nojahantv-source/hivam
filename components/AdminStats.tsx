
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function AdminStats() {
  const { data } = await supabaseAdmin
    .from("loan_requests")
    .select("status, created_at");

  const requests = data ?? [];

  const total = requests.length;

  const today = new Date().toLocaleDateString("en-CA");

  const todayCount = requests.filter((item) =>
    item.created_at?.startsWith(today)
  ).length;

  const reviewing = requests.filter(
    (item) => item.status === "درحال بررسی"
  ).length;

  const approved = requests.filter(
    (item) => item.status === "تایید شد"
  ).length;

  const cards = [
    {
      title: "کل درخواست‌ها",
      value: total,
      color: "text-slate-900",
    },
    {
      title: "درخواست‌های امروز",
      value: todayCount,
      color: "text-blue-600",
    },
    {
      title: "درحال بررسی",
      value: reviewing,
      color: "text-amber-500",
    },
    {
      title: "تایید شده",
      value: approved,
      color: "text-green-600",
    },
  ];

  return (
    <div className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2 className={`mt-4 text-4xl font-extrabold ${card.color}`}>
            {card.value.toLocaleString("fa-IR")}
          </h2>
        </div>
      ))}
    </div>
  );
}

