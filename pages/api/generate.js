export default async function handler(req, res) {
  const { message } = req.body;

  const prompt = [
    {
      role: 'system',
      content: 'Eres PropSense, un asistente comercial inmobiliario que responde en español con empatía, precisión y tono humano. Generas fichas claras para el equipo de ventas y mensajes útiles para leads.'
    },
    {
      role: 'user',
      content: `Mensaje del lead: "${message}"`
    }
  ];

  try {
    const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: prompt,
        temperature: 0.7
      })
    });

    const data = await resp.json();
    const output = data.choices?.[0]?.message?.content || 'Error al obtener respuesta.';
    res.status(200).json({ output });
  } catch (e) {
    res.status(500).json({ error: 'Error al contactar DeepSeek.' });
  }
}
