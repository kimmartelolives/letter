// supabase/functions/send-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { to, subject, message } = await req.json();

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": Deno.env.get("BREVO_API_KEY"),
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
