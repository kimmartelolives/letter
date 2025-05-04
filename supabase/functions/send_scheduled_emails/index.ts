// supabase/functions/send_scheduled_emails/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const brevoApiKey = Deno.env.get("BREVO_API_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const now = new Date().toISOString();
  console.log("⏰ Checking entries to send at:", now);

  const { data: entries, error } = await supabase
    .from("diary_entries")
    .select("*")
    .eq("email_sent", false)
    .lte("send_at", now);

  if (error) {
    console.error("❌ Database fetch error:", error);
    return new Response("Failed to fetch entries", { status: 500 });
  }

  if (!entries || entries.length === 0) {
    console.log("📭 No scheduled emails to send.");
    return new Response("No entries to send", { status: 200 });
  }

  for (const entry of entries) {
    const recipient = entry.email;
    if (!recipient) continue;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Calendar Diary",
          email: "kimmartel.olives@gmail.com",
        },
        to: [{ email: recipient }],
        subject: `📅 Diary Entry for ${entry.date}`,
        htmlContent: `<h3>Entry Type: ${entry.color || "None"}</h3><p>${entry.text}</p>`,
      }),
    });

    if (response.ok) {
      console.log(`✅ Email sent to ${recipient} for ${entry.date}`);
      const { error: updateError } = await supabase
        .from("diary_entries")
        .update({ email_sent: true })
        .eq("id", entry.id);

      if (updateError) {
        console.error("❌ Error updating email_sent:", updateError);
      }
    } else {
      const err = await response.text();
      console.error(`❌ Email failed to ${recipient}:`, err);
    }
  }

  return new Response("✅ Done sending scheduled emails", { status: 200 });
});
