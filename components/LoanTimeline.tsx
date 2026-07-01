import { supabaseAdmin } from "@/lib/supabase-admin";
import TimelineItem from "./TimelineItem";

type Props = {
  loanId: string;
};

export default async function LoanTimeline({
  loanId,
}: Props) {

  const { data, error } = await supabaseAdmin
    .from("loan_events")
    .select("*")
    .eq("loan_request_id", loanId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        خطا در دریافت Timeline
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-xl border p-8 text-center text-slate-500">
        هنوز رویدادی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {data.map((event) => (
        <TimelineItem
          key={event.id}
          event={event}
        />
      ))}

    </div>
  );
}