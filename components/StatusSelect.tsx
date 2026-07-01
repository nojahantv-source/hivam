
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateLoanStatus } from "@/app/actions/admin";

type Props = {
  id: string;
  status: string;
};

export default function StatusSelect({
  id,
  status,
}: Props) {

  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      className="rounded-lg border px-3 py-2 text-sm"
      onChange={(e) => {

        startTransition(async () => {

          await updateLoanStatus(
            id,
            e.target.value
          );

          router.refresh();

        });

      }}
    >

      <option value="جدید">
        جدید
      </option>

      <option value="درحال بررسی">
        درحال بررسی
      </option>

      <option value="تایید شد">
        تایید شد
      </option>

      <option value="رد شد">
        رد شد
      </option>

    </select>
  );
}

