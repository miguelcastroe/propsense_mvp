# PropSense MVP – Next.js + DeepInfra (Mistral)

Este repositorio es una demo funcional de un copiloto comercial inmobiliario que responde a leads y genera fichas para ventas.

## 🔧 Tecnologías
- Next.js
- API de DeepInfra
- Modelo: `mistralai/mistral-7b-instruct`
- Deploy en Vercel

## 🚀 Instrucciones

1. Instala dependencias:

```
npm install
```

2. Agrega tu `.env.local` con:

```
DEEPINFRA_API_KEY=tu_clave_deepinfra
```

3. Ejecuta en desarrollo:

```
npm run dev
```

4. Visita `http://localhost:3000`

## 🌐 Producción

- Conecta este repo a Vercel
- Agrega la variable `DEEPINFRA_API_KEY`
- Haz deploy o redeploy automático

## 🔁 Ejemplo de uso

Lead: "Quiero invertir en un depa con buena rentabilidad en Miraflores"

PropSense:
[MENSAJE PARA EL LEAD]
Te entiendo, tenemos proyectos ideales para eso...

[FICHA PARA EL EQUIPO DE VENTAS]
- Tipo de búsqueda: inversión...
