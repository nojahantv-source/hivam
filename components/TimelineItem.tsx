import { EVENT_TYPES } from "@/lib/crm/eventTypes";

type TimelineEvent = {
  id: string;
  type: string;
  payload: any;
  created_at: string;
  created_by: string;
};

type Props = {
  event: TimelineEvent;
};

export default function TimelineItem({ event }: Props) {
  const config =
    EVENT_TYPES[event.type as keyof typeof EVENT_TYPES];

  const renderContent = () => {
    switch (event.type) {
      case "NOTE":
        return (
          <p className="whitespace-pre-wrap leading-7">
            {event.payload?.text}
          </p>
        );

      case "STATUS_CHANGED":
        return (
          <div className="rounded-xl border bg-slate-50 p-4">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-slate-500">
                  از
                </p>

                <div className="mt-1 rounded-lg bg-red-100 px-3 py-2 font-medium text-red-700">
                  {event.payload?.from}
                </div>

              </div>

              <div className="text-2xl text-slate-400">
                →
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  به
                </p>

                <div className="mt-1 rounded-lg bg-green-100 px-3 py-2 font-medium text-green-700">
                  {event.payload?.to}
                </div>

              </div>

            </div>

          </div>
        );

      case "CALL":
        return (
          <p>{event.payload?.text}</p>
        );

      case "FILE":
        return (
          <div>

            <p className="font-medium">
              {event.payload?.fileName}
            </p>

          </div>
        );

      case "TASK":
        return (
          <div>

            <p className="font-medium">
              {event.payload?.title}
            </p>

          </div>
        );

      default:
        return (
          <pre className="overflow-auto rounded-lg bg-slate-100 p-3 text-xs">
            {JSON.stringify(event.payload, null, 2)}
          </pre>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">
          {config?.icon ?? "📌"}
        </div>

        <div className="flex-1">

          <div className="flex items-start justify-between">

            <div>

              <h3 className="font-bold text-slate-900">
                {config?.title ?? event.type}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {event.created_by}
              </p>

            </div>

            <span className="text-sm text-slate-500">
              {new Date(event.created_at).toLocaleString("fa-IR")}
            </span>

          </div>

          <div className="mt-5">
            {renderContent()}
          </div>

        </div>

      </div>

    </div>
  );
}