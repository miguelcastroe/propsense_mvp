import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [ficha, setFicha] = useState('Esperando respuesta...');

  const enviar = async () => {
    const nuevaEntrada = `Lead: ${input}`;
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();

    const partes = data.output.split('[MENSAJE PARA EL LEAD]')[1]?.split('[FICHA PARA EL EQUIPO DE VENTAS]');
    const msg = partes?.[0]?.trim() || 'Error al extraer mensaje';
    const fichaTexto = partes?.[1]?.trim() || 'Error al extraer ficha';

    setHistory([...history, nuevaEntrada, `PropSense: ${msg}`]);
    setFicha(fichaTexto);
    setInput('');
  };

  const limpiar = () => {
    setHistory([]);
    setFicha('Esperando respuesta...');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100vh', padding: '2rem', gap: '2rem', background: '#f4f4f4', fontFamily: 'monospace' }}>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '6px', display: 'flex', flexDirection: 'column' }}>
        <h2>Conversación con el lead</h2>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe el mensaje del lead..." style={{ fontFamily: 'monospace', padding: '0.75rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', height: '150px' }} />
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button onClick={enviar} style={{ background: '#000', color: 'white', padding: '0.5rem 1rem', border: 'none' }}>Simular</button>
          <button onClick={limpiar} style={{ background: '#aaa', color: 'white', padding: '0.5rem 1rem', border: 'none' }}>Limpiar</button>
        </div>
        <pre style={{ marginTop: '1rem', background: '#fafafa', padding: '1rem', borderRadius: '4px', flex: 1 }}>{history.join('\n\n')}</pre>
      </div>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '6px' }}>
        <h2>Ficha para el equipo de ventas</h2>
        <pre style={{ background: '#fafafa', padding: '1rem', borderRadius: '4px' }}>{ficha}</pre>
      </div>
    </div>
  );
}
