"use client";

import { EVENT_TYPES, EventType } from "@/lib/crm/eventTypes";

type Props = {
  value: EventType;
  onChange: (value: EventType) => void;
};

export default function EventTypeSelect({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium">
        نوع فعالیت
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as EventType)
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
      >
        {Object.values(EVENT_TYPES).map((type) => (
          <option
            key={type.key}
            value={type.key}
          >
            {type.icon} {type.title}
          </option>
        ))}
      </select>

    </div>
  );
}