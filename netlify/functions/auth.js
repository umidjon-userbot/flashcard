
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function handler(event) {

  const initData = JSON.parse(event.body);

  const secret = crypto
    .createHash("sha256")
    .update(process.env.BOT_TOKEN)
    .digest();

  const checkString = Object.keys(initData)
    .filter(k => k !== "hash")
    .sort()
    .map(k => `${k}=${initData[k]}`)
    .join("\n");

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(checkString)
    .digest("hex");

  if (hmac !== initData.hash) {
    return { statusCode: 401, body: "Invalid Telegram data" };
  }

  const user = initData.user;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("telegram_id", user.id);

  if (!data || data.length === 0) {
    await supabase.from("users").insert({
      telegram_id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      photo_url: user.photo_url,
      language_code: user.language_code
    });
  } else {
    await supabase.from("users").update({
      last_login_at: new Date(),
      login_count: data[0].login_count + 1
    }).eq("telegram_id", user.id);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
