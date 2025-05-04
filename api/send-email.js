export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    try {
      // Manually parse JSON body
      const body = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => {
          data += chunk;
        });
        req.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      });
  
      const { date, text, color } = body;
  
      if (!date || !text) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }
  
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "Calendar Diary", email: "kimmartel.olives@gmail.com" },
          to: [{ email: "kimolives789@gmail.com" }],
          subject: `📅 Diary Entry for ${date}`,
          htmlContent: `<h3>Entry Type: ${color || 'None'}</h3><p>${text}</p>`,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(500).json({ success: false, error: data });
      }
  
      return res.status(200).json({ success: true, data });
  
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
  