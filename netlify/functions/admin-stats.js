
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function handler() {

  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: totalSets } = await supabase
    .from("flashcard_sets")
    .select("*", { count: "exact", head: true });

  return {
    statusCode: 200,
    body: JSON.stringify({ totalUsers, totalSets })
  };
}
