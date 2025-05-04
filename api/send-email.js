// /api/send-email.js
console.log('Brevo API Key:', process.env.BREVO_API_KEY);
export const config = {
    runtime: 'edge', // Specify edge runtime for Vercel
    maxDuration: 10, // Set timeout to 10 seconds to avoid timeout issues
  };
  
  export default async function handler(req) {
    try {
      // Parse the incoming JSON request
      const { date, text, color } = await req.json();
  
      // Check if essential fields are present
      if (!date || !text) {
        return new Response(JSON.stringify({ success: false, error: 'Missing required fields (date or text)' }), { status: 400 });
      }
  
      // Prepare the email content
      const emailContent = {
        sender: { name: "Calendar Diary", email: "kimmartel.olives@gmail.com" },  // Replace with your sender email
        to: [{ email: "recipient@example.com" }],  // Replace with recipient email
        subject: `📅 Diary Entry for ${date}`,
        htmlContent: `<h2>Diary Entry - ${color || 'No Type'}</h2><p>${text}</p>`,
      };
  
      // Log the request for debugging
      console.log("Sending request to Brevo with body:", emailContent);
  
      // Send the email via Brevo API
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,  // Get the API key from environment variables
        },
        body: JSON.stringify(emailContent),
      });
  
      // Handle Brevo API response
      if (!res.ok) {
        const error = await res.json();
        console.error("Brevo error response:", error); // Log the error for debugging
        return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
      }
  
      // Return the successful response
      const data = await res.json();
      return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  
    } catch (error) {
      // Catch any errors that occur and log them for debugging
      console.error('Error sending email:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
  }
  