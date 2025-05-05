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

    const { date, text, color, recipientEmail, imageUrl, title, remarks, subject } = body;

    if (!date || !text || !recipientEmail || !title || !remarks) {
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
        subject: `📅 Dear Diary Entry for ${subject}`,
          htmlContent: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Kawaii Diary Email</title>
      <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Quicksand&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #fffafc url('https://www.transparenttextures.com/patterns/white-wall-3.png') repeat;
          font-family: 'Quicksand', sans-serif;
          color: #5a4b42;
        }

        .container {
          max-width: 680px;
          margin: 40px auto;
          background: #fff6fa;
          border: 3px dashed #f8cdd6;
          border-radius: 22px;
          padding: 35px;
          box-shadow: 0 10px 30px rgba(255, 182, 193, 0.2);
          position: relative;
        }

        .ribbon {
          width: 100px;
          position: absolute;
          top: -30px;
          left: 20px;
        }

        .title {
          font-family: 'Indie Flower', cursive;
          font-size: 40px;
          color: #ff7fa5;
          text-align: center;
          margin-bottom: 5px;
        }

        .date {
          text-align: center;
          font-size: 14px;
          color: #a7988d;
          margin-bottom: 25px;
        }

        .sticker {
          text-align: right;
          font-size: 14px;
          color: #ffb6c1;
          font-style: italic;
          margin-bottom: 15px;
        }

        .entry-title {
          font-size: 22px;
          font-weight: bold;
          text-align: center;
          color: #c37485;
          margin: 25px 0 15px;
        }

        .note {
          background: #fff0f4;
          border: 2px dotted #f4b2c2;
          padding: 20px;
          border-radius: 16px;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 30px;
          position: relative;
        }

        .note::before {
          content: "📝";
          position: absolute;
          top: -18px;
          left: -18px;
          font-size: 28px;
        }

        .photo-frame {
          background: #ffeef5;
          border: 2px solid #fcd5de;
          border-radius: 16px;
          padding: 12px;
          text-align: center;
          margin: 30px 0;
          box-shadow: 0 4px 12px rgba(255, 182, 193, 0.15);
        }

        .photo-frame img {
          max-width: 100%;
          border-radius: 12px;
        }

        .caption {
          font-style: italic;
          font-size: 14px;
          color: #aa6782;
          margin-top: 8px;
        }

        .divider {
          text-align: center;
          font-size: 18px;
          color: #ebb3c5;
          margin: 30px 0;
        }

        .quote {
          background: #fff8fa;
          border-left: 5px solid #fbb1c8;
          padding: 15px 20px;
          font-style: italic;
          font-size: 15px;
          color: #b27a8c;
          margin-bottom: 25px;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #b39a9f;
          margin-top: 40px;
        }

        .footer a {
          color: #ff94b6;
          text-decoration: none;
        }

      </style>
    </head>
    <body>
      <div class="container">
        <img src="https://rushdtpzxfnvobniswwm.supabase.co/storage/v1/object/public/images/images/2025-05-06-pngtree-red-cute-ribbon-png-image_6541869.png" class="ribbon" alt="cute ribbon">

        <div class="title">My Sweet Diary</div>
        <div class="date">${date} ·  ☁️</div>
        <div class="sticker">🌸 Mood: dreamy & giggly</div>

        <div class="entry-title">${title}</div>

        <div class="note">
        ${text}
        </div>

        <div class="photo-frame">
          <img src="${imageUrl}" alt="Cute photo">
          <div class="caption">this view made me smile without trying 💖</div>
        </div>

        <div class="note">
          I added little heart stickers in my planner and made a new page in my dream journal. I really want to visit a lavender field this summer... Maybe even wear a straw hat like in a Studio Ghibli film 🌾✨
        </div>

         <div class="photo-frame">
        //   <a href="https://rosaura-letter.vercel.app/diary.html">Visit the Rosaura Letter - Dear Diary Now</a>
        //   <div class="caption">dreams scribbled in pastel ink 🌈</div>
         </div>

        <div class="divider">˗ˏˋ 💕 ˎˊ˗</div>

        <div class="quote">“In every ordinary day, there is something beautifully soft — if you listen gently.”</div>

        <div class="footer">
          Thanks for reading my little pink memory 🌸<br>
          Sent with love from <strong>Dear Diary</strong> 🍓<br>
          Developed by: <a href="https://www.facebook.com/oliveskimmartel/">Kim Martel Olives</a>
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
