export default async function handler(req, res) {
  const { message } = req.body;

  const prompt = [
    {
      role: 'system',
      content: `Eres PropSense, un asistente comercial inmobiliario que responde en español con empatía y precisión. Tu tarea es:

1. Analizar el mensaje del lead.
2. Responder con un texto útil, cercano y humano.
3. Generar una ficha clara y estructurada para el equipo de ventas.

Debes responder siempre con el siguiente formato, sin saltártelo:

[MENSAJE PARA EL LEAD]
[Escribe aquí tu respuesta para el lead, siempre en español, con tono empático y útil.]

[FICHA PARA EL EQUIPO DE VENTAS]
- Tipo de búsqueda:
- Prioridades principales:
- Estado emocional estimado:
- Proyecto sugerido:
- Características coincidentes:
- Siguiente paso sugerido:`
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
    console.error('Error al contactar DeepSeek:', e);
    res.status(500).json({ error: 'Error al contactar DeepSeek.' });
  }
}
