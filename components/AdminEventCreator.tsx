"use client";

import { useState, useTransition } from "react";

import { EventType } from "@/lib/crm/eventTypes";
import { createCRMEvent } from "@/app/actions/crm";

import EventTypeSelect from "@/components/crm/EventTypeSelect";
import EventForm from "@/components/crm/EventForm";
import EventSubmitButton from "@/components/crm/EventSubmitButton";

type Props = {
  loanId: string;
};

export default function AdminEventCreator({
  loanId,
}: Props) {
  const [eventType, setEventType] =
    useState<EventType>("NOTE");

  const [text, setText] = useState("");

  const [isPending, startTransition] =
    useTransition();

  const submit = () => {
    if (!text.trim()) return;

    startTransition(async () => {
      const result = await createCRMEvent({
        loanId,
        type: eventType,
        payload: {
          text,
        },
      });

      if (!result.success) {
        alert(result.message);
        return;
      }

      setText("");

      // تا زمانی که Server Components را realtime نکرده‌ایم
      window.location.reload();
    });
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        ثبت فعالیت جدید
      </h2>

      <div className="space-y-5">

        <EventTypeSelect
          value={eventType}
          onChange={setEventType}
        />

        <EventForm
          text={text}
          onChange={setText}
        />

        <div className="flex justify-end">

          <EventSubmitButton
            loading={isPending}
            onClick={submit}
          />

        </div>

      </div>

    </div>
  );
}