import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function createEvent({
  loanId,
  type,
  payload,
}: {
  loanId: string;
  type: string;
  payload: any;
}) {
  const result = await supabase
    .from("loan_events")
    .insert({
      loan_request_id: loanId,
      type,
      payload,
      created_by: "admin",
    })
    .select();

  console.log("CREATE EVENT RESULT:", result);

  return result;
}