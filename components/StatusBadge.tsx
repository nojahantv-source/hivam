
type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {
  switch (status) {
    case "جدید":
      return (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          جدید
        </span>
      );

    case "درحال بررسی":
      return (
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
          درحال بررسی
        </span>
      );

    case "تایید شد":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
          تایید شد
        </span>
      );

    case "رد شد":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
          رد شد
        </span>
      );

    default:
      return (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
          {status}
        </span>
      );
  }
}

