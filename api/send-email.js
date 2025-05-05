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
  <meta charset="UTF-8">
  <title>Diary Email</title>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Quicksand&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #fefaf6 url('https://www.transparenttextures.com/patterns/paper-fibers.png') repeat;
      font-family: 'Quicksand', sans-serif;
      color: #5a4b42;
    }

    .email-container {
      max-width: 640px;
      margin: 30px auto;
      background: #fffefb;
      border-radius: 20px;
      padding: 40px 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
      border: 1px solid #f4e8db;
      background-image: linear-gradient(to bottom, #fffefb, #fff9f2);
    }

    .header {
      font-family: 'Dancing Script', cursive;
      font-size: 42px;
      color: #c2797f;
      text-align: center;
      margin-bottom: 0px;
    }

    .date {
      text-align: center;
      font-size: 14px;
      color: #a1988d;
      margin-bottom: 30px;
    }

    .weather-stamp {
      text-align: right;
      font-size: 12px;
      color: #9e8d81;
      font-style: italic;
      margin-top: -20px;
      margin-bottom: 20px;
    }

    .divider {
      text-align: center;
      font-size: 24px;
      color: #d3bab0;
      margin: 20px 0;
    }

    .entry-title {
      font-size: 26px;
      color: #8a6f61;
      font-weight: bold;
      margin-bottom: 15px;
      text-align: center;
    }

    .entry-content {
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 30px;
      text-align: justify;
    }

    .polaroid {
      background: #fff;
      border: 1px solid #e4d8cb;
      box-shadow: 2px 5px 15px rgba(0,0,0,0.08);
      padding: 10px 10px 20px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 30px;
    }

    .polaroid img {
      width: 100%;
      border-radius: 4px;
    }

    .caption {
      font-size: 14px;
      font-style: italic;
      color: #a37a73;
      margin-top: 10px;
    }

    .mood {
      font-size: 14px;
      font-style: italic;
      text-align: center;
      color: #967b72;
      margin-top: -15px;
      margin-bottom: 25px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #b1a79f;
      margin-top: 50px;
    }

    .footer a {
      color: #c2797f;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Dear Diary</div>
    <div class="date">May 5, 2025</div>
    <div class="weather-stamp">☀️ Sunny, 21°C – light breeze</div>

    <div class="entry-title">Magic Beneath the Petals</div>

    <div class="entry-content">
      Today I wandered into a corner of the world that felt untouched by time. Cherry blossoms danced around me like little pink fairies, each whispering secrets I could almost understand. I let myself drift, heart-first, into that softness.
    </div>

    <div class="polaroid">
      <img src="https://via.placeholder.com/560x320/ffeaea/333333?text=Cherry+Blossom+Path" alt="Cherry Blossoms">
      <div class="caption">They swirled around me like warm wishes 🌸</div>
    </div>

    <div class="entry-content">
      I found a cozy bench under the oldest tree and sketched whatever came to mind. Time melted. Even the birds seemed to slow their songs just for me.
    </div>

    <div class="polaroid">
      <img src="https://via.placeholder.com/560x320/fff1ed/333333?text=Tea+%26+Sketchbook" alt="Sketch and Tea">
      <div class="caption">My cup of quiet joy ☕🖊️</div>
    </div>

    <div class="mood">🎵 Mood: "Bloom" by The Paper Kites</div>

    <div class="divider">⋆⁺₊✧༚ ˚₊· ͟͟͞͞➳❥</div>

    <div class="entry-content">
      I hope days like this keep finding me — full of little magics, soft skies, and room to breathe. If not, I’ll just paint one into existence.
    </div>

    <div class="footer">
      Thanks for letting me share this petal-filled day with you 🌸<br>
      You’re receiving this because you’re subscribed to <strong>Diary Digest</strong>. <br>
      <a href="#">Unsubscribe</a> if you'd prefer quieter inboxes.
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
  