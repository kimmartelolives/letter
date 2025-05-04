// /api/send-email.js

export const config = {
    runtime: 'edge',
  };
  
  export default async function handler(req) {
    try {
      // Parse the incoming request body
      const { date, text, color } = await req.json();
  
      // Make the request to Brevo (formerly Sendinblue) to send the email
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY, // Ensure you have this key in your Vercel environment variables
        },
        body: JSON.stringify({
          sender: { name: "Calendar Diary", email: "kimmartel.olives@gmail.com" },  // Replace with your email
          to: [{ email: "kimolives789@gmail.com" }],  // Replace with recipient email
          subject: `📅 Diary Entry for ${date}`,
          htmlContent: `<h2>Diary Entry - ${color || 'No Type'}</h2><p>${text}</p>`,
        }),
      });
  
      // If Brevo response is successful, return success
      if (res.ok) {
        const data = await res.json();
        return new Response(JSON.stringify({ success: true, data }), { status: 200 });
      } else {
        // Handle case where Brevo returns an error
        const error = await res.json();
        return new Response(JSON.stringify({ success: false, error }), { status: 500 });
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error('Error sending email:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
  }
  