import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, api-key",
      },
    });
  }

  try {
    const { to, subject, message } = await req.json();

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "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", // <-- Replace with your actual key
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
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
