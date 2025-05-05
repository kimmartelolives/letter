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
  
      const { date, text, color, recipientEmail } = body;
  
      if (!date || !text || !recipientEmail) {
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
          to: [{ email: body.recipientEmail }],
          subject: `📅 Diary Entry for ${date}`,
            htmlContent: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }
            .email-container {
              width: 100%;
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #eee;
            }
            .header h2 {
              font-size: 24px;
              margin: 0;
              color: #4CAF50;
            }
            .content {
              margin-top: 20px;
              line-height: 1.6;
            }
            .content p {
              font-size: 16px;
              color: #555;
            }
            .footer {
              margin-top: 30px;
              padding-top: 10px;
              text-align: center;
              font-size: 14px;
              color: #777;
            }
            .footer a {
              color: #4CAF50;
              text-decoration: none;
            }
            .entry-type {
              background-color: ${color || '#f0f0f0'};
              padding: 8px;
              border-radius: 5px;
              font-weight: bold;
              color: #333;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h2>Your Diary Entry1 for ${date}</h2>
            </div>
            <div class="content">
              <div class="entry-type">Entry Type: ${color || 'None'}</div>
              <p>${text}</p>
            </div>
            <div class="footer">
              <p>Thank you for using Calendar Diary</p>
            </div>
          </div>
        </body>
      </html>
    `,
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
  