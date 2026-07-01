"use client";

type Props = {
  text: string;
  onChange: (value: string) => void;
};

export default function EventForm({
  text,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium">
        توضیحات
      </label>

      <textarea
        value={text}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="شرح فعالیت..."
        className="min-h-40 w-full rounded-xl border border-slate-300 p-4"
      />

    </div>
  );
}