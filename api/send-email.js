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

    const { date, text, color, recipientEmail, imageUrl, title, remarks, subject, mood } = body;

    if (!date || !text || !recipientEmail || !title || !remarks || !subject) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    let htmlContent = "";

    if (color == 'love') {
   
    htmlContent = `
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

          
           .message {
            background: #fff6fa;
            border-left: 4px solid #f4b2c2;
            padding: 12px 18px;
            font-size: 15px;
            color: #aa6782;
            margin-bottom: 25px;
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
          <img src="https://rushdtpzxfnvobniswwm.supabase.co/storage/v1/object/public/images/images/2025-05-01-ChatGPT%20Image%20May%206,%202025,%2001_07_23%20AM.png" class="ribbon" alt="cute ribbon">

          <div class="title">My Sweet Diary</div>
          <div class="date">${date} ·  ☁️</div>
          <div class="sticker">🌸 Mood: ${mood} ${mood} ${mood}</div>

          <div class="entry-title">${title}</div>

          <div class="note">
          ${text}
          </div>

          <div class="photo-frame">
            <img src="${imageUrl}" alt="Cute photo">
            <div class="caption">this view made me smile without trying 💖</div>
          </div>

          <div class="note">
            ${remarks} 🌾✨
          </div>

          <div class="photo-frame">
             <a href="https://rosaura-letter.vercel.app/diary.html">🔮 A Glimpse Into His Mind – Saura's Dear Diary Letter Is Here</a>
            <div class="caption">📖 You're Invited – Visit Dear Diary Now</div>
          </div>

          <div class="divider">˗ˏˋ 💕 ˎˊ˗</div>

          <div class="message">
            P.S. You are always in my heart. ❤️ Wishing you a day as beautiful as you are.
          </div>

          <div class="footer">
            Thanks for reading my little pink memory 🌸<br>
            Sent with love from <strong>Dear Diary</strong> 🍓<br>
            Developed & Crafted by: <a href="https://www.facebook.com/oliveskimmartel/">Kim Martel Olives</a>
          </div>
        </div>
      </body>
      </html>

    `;


    }

    else if (color == 'important') {

      htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Important Diary Note</title>
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Quicksand&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #fefdf8 url('https://www.transparenttextures.com/patterns/paper-fibers.png') repeat;
            font-family: 'Quicksand', sans-serif;
            color: #5a4b42;
          }

          .container {
            max-width: 680px;
            margin: 40px auto;
            background: #fefaf3;
            border: 3px dashed #e4d8c3;
            border-radius: 22px;
            padding: 35px;
            box-shadow: 0 10px 30px rgba(221, 200, 180, 0.2);
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
            color: #c29871;
            text-align: center;
            margin-bottom: 5px;
          }

          .date {
            text-align: center;
            font-size: 14px;
            color: #9d8e7d;
            margin-bottom: 10px;
          }

          .sticker {
            text-align: center;
            font-size: 14px;
            color: #d2bba0;
            font-style: italic;
            margin-bottom: 20px;
          }

          .important-badge {
            background: #f3e1d4;
            color: #a95842;
            font-weight: bold;
            font-size: 14px;
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            border: 2px dashed #e1bfb1;
            margin: 0 auto 20px;
            text-align: center;
          }

          .entry-title {
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            color: #a8825d;
            margin: 25px 0 15px;
          }

          .note {
            background: #fdf7ef;
            border: 2px dotted #e8d9c2;
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

          .highlight-note {
            background: #fff4e8;
            border: 2px solid #f2c7a6;
            padding: 22px;
            border-radius: 18px;
            font-size: 17px;
            line-height: 1.8;
            margin: 30px 0;
            position: relative;
            box-shadow: 0 0 10px rgba(244, 213, 184, 0.2);
          }

          .highlight-note::before {
            content: "⭐";
            position: absolute;
            top: -20px;
            left: -20px;
            font-size: 28px;
          }

          .photo-frame {
            background: #fdf6eb;
            border: 2px solid #e8dbc9;
            border-radius: 16px;
            padding: 12px;
            text-align: center;
            margin: 30px 0;
            box-shadow: 0 4px 12px rgba(221, 200, 180, 0.15);
          }

          .photo-frame img {
            max-width: 100%;
            border-radius: 12px;
          }

          .caption {
            font-style: italic;
            font-size: 14px;
            color: #a48669;
            margin-top: 8px;
          }

           .message {
            background: #ffffff;
            border-left: 4px solid #ccb9a2;
            padding: 12px 18px;
            font-size: 15px;
            color: #b5906d;
            margin-bottom: 25px;
          }

          .divider {
            text-align: center;
            font-size: 18px;
            color: #ccb9a2;
            margin: 30px 0;
          }

          .quote {
            background: #fdfaf4;
            border-left: 5px solid #dfc9ae;
            padding: 15px 20px;
            font-style: italic;
            font-size: 15px;
            color: #9c7c63;
            margin-bottom: 25px;
            border-radius: 8px;
          }

          .reflection {
            background: #fefaf4;
            border-left: 4px solid #caa57c;
            padding: 16px 20px;
            margin-top: 35px;
            font-style: italic;
            color: #8d6b53;
            border-radius: 10px;
            font-size: 15px;
          }

          .footer {
            text-align: center;
            font-size: 12px;
            color: #a69083;
            margin-top: 40px;
          }

          .footer a {
            color: #b5906d;
            text-decoration: none;
          }

        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://rushdtpzxfnvobniswwm.supabase.co/storage/v1/object/public/images/images/2025-05-01-ChatGPT%20Image%20May%206,%202025,%2001_07_23%20AM.png" class="ribbon" alt="ribbon" />

          <div class="title">My Cozy Diary</div>
          <div class="date">${date} ·  🌤️</div>
          <div class="sticker">🌾 Mood: ${mood} ${mood} ${mood}</div>
          <div class="important-badge">🌟 Important Entry</div>

          <div class="entry-title">${title}</div>

          <div class="highlight-note">
          ${text}
          </div>

          <div class="photo-frame">
            <img src="${imageUrl}" alt="Soft Light">
            <div class="caption">a gentle glow that felt like a hug ☀️</div>
          </div>

          <div class="note">
          ${remarks} 🌤️☀️
          </div>

          <div class="photo-frame">
            <a href="https://rosaura-letter.vercel.app/diary.html">🔮 A Glimpse Into His Mind – Saura's Dear Diary Letter Is Here</a>
            <div class="caption">📖 You're Invited – Visit Dear Diary Now</div>
          </div>

          <div class="divider">⋆˖⁺‧₊🤎₊‧⁺˖⋆</div>

          <div class="message">
            P.S. You are always in my thoughts. Wishing you a day filled with meaningful moments and lasting joy. ☀️
          </div>

          <div class="footer">
            Thanks for pausing with me 🌼<br>
            From the <strong>Dear Diary</strong> ☕<br>
            Developed & Crafted by: <a href="https://www.facebook.com/oliveskimmartel/">Kim Martel Olives</a>
          </div>
        </div>
      </body>
      </html>
      `;
    }

    else if (color == 'greetings') {

      htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Cozy Celebration Email</title>
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Quicksand&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #fefdf8 url('https://www.transparenttextures.com/patterns/paper-fibers.png') repeat;
            font-family: 'Quicksand', sans-serif;
            color: #5a4b42;
          }

          .container {
            max-width: 680px;
            margin: 40px auto;
            background: #fefaf3;
            border: 3px dashed #e4d8c3;
            border-radius: 22px;
            padding: 35px;
            box-shadow: 0 10px 30px rgba(221, 200, 180, 0.2);
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
            color: #c29871;
            text-align: center;
            margin-bottom: 5px;
          }

          .date {
            text-align: center;
            font-size: 14px;
            color: #9d8e7d;
            margin-bottom: 25px;
          }

          .sticker {
            text-align: right;
            font-size: 14px;
            color: #d2bba0;
            font-style: italic;
            margin-bottom: 15px;
          }

          .entry-title {
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            color: #a8825d;
            margin: 25px 0 15px;
          }

          .note {
            background: #fdf7ef;
            border: 2px dotted #e8d9c2;
            padding: 20px;
            border-radius: 16px;
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 30px;
            position: relative;
          }

          .note::before {
            content: "🎉";
            position: absolute;
            top: -18px;
            left: -18px;
            font-size: 28px;
          }

          .photo-frame {
            background: #fdf6eb;
            border: 2px solid #e8dbc9;
            border-radius: 16px;
            padding: 12px;
            text-align: center;
            margin: 30px 0;
            box-shadow: 0 4px 12px rgba(221, 200, 180, 0.15);
          }

          .photo-frame img {
            max-width: 100%;
            border-radius: 12px;
          }

          .caption {
            font-style: italic;
            font-size: 14px;
            color: #a48669;
            margin-top: 8px;
          }

          .divider {
            text-align: center;
            font-size: 18px;
            color: #ccb9a2;
            margin: 30px 0;
          }

          .quote {
            background: #fdfaf4;
            border-left: 5px solid #dfc9ae;
            padding: 15px 20px;
            font-style: italic;
            font-size: 15px;
            color: #9c7c63;
            margin-bottom: 25px;
          }

          .message {
            background: #fff9f3;
            border-left: 5px solid #e8cdb6;
            padding: 15px 20px;
            font-size: 15px;
            color: #7f6653;
            margin-bottom: 30px;
          }

          .footer {
            text-align: center;
            font-size: 12px;
            color: #a69083;
            margin-top: 40px;
          }

          .footer a {
            color: #b5906d;
            text-decoration: none;
          }

        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://rushdtpzxfnvobniswwm.supabase.co/storage/v1/object/public/images/images/2025-05-01-ChatGPT%20Image%20May%206,%202025,%2001_07_23%20AM.png" class="ribbon" alt="ribbon" />

          <div class="title">Happy Wishes</div>
          <div class="date"> ${date} · 🎈</div>
          <div class="sticker">🎂 Occasion: A heartwarming celebration</div>
          <div class="sticker">🌾 Mood: ${mood} ${mood} ${mood}</div>

          <div class="entry-title"> ${title}</div>

          <div class="note">
             ${text}
          </div>

          <div class="photo-frame">
            <img src="${imageUrl}" alt="Celebration Image">
            <div class="caption">balloons, cake, and smiles — the sweet trio 🥳</div>
          </div>

          <div class="note">
             ${remarks}
          </div>

          <div class="photo-frame">
             <a href="https://rosaura-letter.vercel.app/diary.html">🔮 A Glimpse Into His Mind – Saura's Dear Diary Letter Is Here</a>
            <div class="caption">📖 You're Invited – Visit Dear Diary Now</div>
          </div>

          <div class="divider">⋆˖⁺‧₊🧁₊‧⁺˖⋆</div>

          <div class="message">
            P.S. Don’t forget to make a wish. ✨ You deserve all the warmth, magic, and little wonders the universe has to offer. Sending hugs and confetti your way!
          </div>

          <div class="footer">
            With love from <strong>Dear Diary</strong> 🕯️<br>
            Developed & Crafted by: <a href="https://www.facebook.com/oliveskimmartel/">Kim Martel Olives</a>
          </div>
        </div>
      </body>
      </html>

      `;
     
    }

    else {

      htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Cozy Everyday Email</title>
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Quicksand&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #ffffff;
            font-family: 'Quicksand', sans-serif;
            color: #333333;
          }

          .container {
            max-width: 680px;
            margin: 40px auto;
            background: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            position: relative;
          }

          .ribbon {
            width: 80px;
            position: absolute;
            top: -20px;
            left: 20px;
          }

          .title {
            font-family: 'Indie Flower', cursive;
            font-size: 36px;
            color: #4a90e2;
            text-align: center;
            margin-bottom: 10px;
          }

          .date {
            text-align: center;
            font-size: 14px;
            color: #777777;
            margin-bottom: 20px;
          }

          .sticker {
            text-align: right;
            font-size: 14px;
            color: #9e9e9e;
            font-style: italic;
            margin-bottom: 15px;
          }

          .entry-title {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: #4a90e2;
            margin: 20px 0 10px;
          }

          .note {
            background: #ffffff;
            border: 1px solid #e0e0e0;
            padding: 15px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
          }

          .note::before {
            content: "💬";
            position: absolute;
            top: -18px;
            left: -18px;
            font-size: 28px;
          }

          .photo-frame {
            background: #f7f7f7;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            padding: 12px;
            text-align: center;
            margin: 25px 0;
          }

          .photo-frame img {
            max-width: 100%;
            border-radius: 8px;
          }

          .caption {
            font-style: italic;
            font-size: 14px;
            color: #6b6b6b;
            margin-top: 8px;
          }

          .divider {
            text-align: center;
            font-size: 16px;
            color: #9e9e9e;
            margin: 20px 0;
          }

          .quote {
            background: #f1f1f1;
            border-left: 4px solid #4a90e2;
            padding: 12px 18px;
            font-style: italic;
            font-size: 14px;
            color: #4a90e2;
            margin-bottom: 20px;
          }

          .message {
            background: #f1f1f1;
            border-left: 4px solid #4a90e2;
            padding: 12px 18px;
            font-size: 15px;
            color: #4a90e2;
            margin-bottom: 25px;
          }

          .footer {
            text-align: center;
            font-size: 12px;
            color: #888888;
            margin-top: 30px;
          }

          .footer a {
            color: #4a90e2;
            text-decoration: none;
          }

        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://rushdtpzxfnvobniswwm.supabase.co/storage/v1/object/public/images/images/2025-05-01-ChatGPT%20Image%20May%206,%202025,%2001_07_23%20AM.png" class="ribbon" alt="ribbon" />

          <div class="title">Hello There!</div>
          <div class="date">${date} · 🌞</div>
          <div class="sticker">🎉 Occasion: A cheerful moment to share</div>
          <div class="sticker">🌾 Mood: ${mood} ${mood} ${mood}</div>

          <div class="entry-title">${title}</div>

          <div class="note">
          ${text}
          </div>

          <div class="photo-frame">
            <img src="${imageUrl}" alt="Everyday Image">
            <div class="caption">coffee, books, and a cozy chair — the essentials of a calm day ☕📖</div>
          </div>

          <div class="note">
          ${remarks}
          </div>

          <div class="photo-frame">
            <a href="https://rosaura-letter.vercel.app/diary.html">🔮 A Glimpse Into His Mind – Saura's Dear Diary Letter Is Here</a>
            <div class="caption">📖 You're Invited – Visit Dear Diary Now</div>
          </div>

          <div class="divider">⋆˖⁺‧₊☀️₊‧⁺˖⋆</div>

          <div class="message">
            P.S. Don’t forget to take care of yourself today. 💙 Wishing you a peaceful and fulfilling day ahead!
          </div>

          <div class="footer">
            Cheers, <strong>Your Everyday Dear Diary</strong> 💌<br>
             Developed & Crafted by: <a href="https://www.facebook.com/oliveskimmartel/">Kim Martel Olives</a>
          </div>
        </div>
      </body>
      </html>

      `;

    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Dear Saura ᰔ", email: "kimmartel.olives@gmail.com" },
        to: [{ email: body.recipientEmail }],
        subject: `💖 Dear Diary: ${subject}`,
        htmlContent,
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
