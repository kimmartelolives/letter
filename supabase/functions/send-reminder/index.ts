// supabase/functions/send-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { to, subject, message } = await req.json();

  // Replace 'your_brevo_api_key_here' with your actual Brevo API key.
  const apiKey = "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";

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: "My Diary App", email: "kimmartel.olives@gmail.com" },
      to: [{ email: to }],
      subject,
      htmlContent: `<p>${message}</p>`,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: res.status,
  });
});
