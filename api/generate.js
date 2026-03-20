export default async function handler(req, res) {
  // Vi henter din nøgle fra Vercel senere (for sikkerhedens skyld)
  const API_KEY = process.env.GOOGLE_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const { prompt } = req.body;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    // Her trækker vi svaret ud af Googles store data-pakke
    const result = data.candidates[0].content.parts[0].text;
    
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Der skete en fejl i forbindelsen til AI." });
  }
}
