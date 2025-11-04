---
external: false
draft: false
title: "Nextjs Ai Package"
description: "Nextjs Ai Package"
date: 2025-11-04
readingMinutes: "4"
---

# Guía Simple: Usar AI con Next.js

## ¿Qué es Vercel AI SDK?

Es un **paquete de herramientas** que te permite integrar inteligencia artificial en tus aplicaciones Next.js. Te conecta con modelos de IA como OpenAI, Anthropic, Google, etc., sin complicaciones.

**Ventaja clave:** Cambias de proveedor de IA con solo una línea de código.

---

## Instalación Rápida

### 1. Crear un proyecto Next.js

```bash
pnpm create next-app@latest my-ai-app
cd my-ai-app
```

Cuando pregunte, selecciona:
- ✅ App Router (recomendado)
- ✅ TypeScript
- ✅ Tailwind CSS

### 2. Instalar dependencias de IA

```bash
pnpm add ai @ai-sdk/react @ai-sdk/openai zod
```

**¿Qué instalaste?**
- `ai` → El SDK principal de Vercel
- `@ai-sdk/react` → Hooks de React para IA
- `@ai-sdk/openai` → Proveedor de OpenAI
- `zod` → Validación de datos

### 3. Configurar API Key

Crea un archivo `.env.local` en la raíz:

```
OPENAI_API_KEY=tu_clave_aqui
```

Obtén tu clave en [platform.openai.com](https://platform.openai.com)

---

## Estructura Mínima: Chat de IA

### Opción 1: Backend (API Route)

Archivo: `app/api/chat/route.ts`

```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: 'Eres un asistente útil.',
    messages,
  });

  return result.toDataStreamResponse();
}
```

**¿Qué hace?**
- Recibe mensajes del cliente
- Los envía a OpenAI
- Devuelve la respuesta en tiempo real (streaming)

---

### Opción 2: Frontend (Componente React)

Archivo: `app/page.tsx`

```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="border rounded p-4 mb-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe tu pregunta..."
          className="border flex-1 px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
```

**¿Qué hace?**
- Hook `useChat` maneja el chat automáticamente
- Conecta con tu API en `/api/chat`
- Renderiza mensajes en tiempo real
- Entra todo en 1 componente

---

## Casos de Uso Comunes

### 1. **Chatbot Especializado** (Asesor Financiero)

```typescript
const result = streamText({
  model: openai('gpt-4'),
  system: `Eres un asesor financiero experto. 
           Responde sobre inversión, presupuestos y planificación.
           Si tienes dudas, haz preguntas aclaratorias.`,
  messages,
  tools: {
    calcularInteres: tool({
      description: 'Calcula interés compuesto',
      inputSchema: z.object({
        principal: z.number(),
        tasa: z.number(),
        años: z.number(),
      }),
      execute: async ({ principal, tasa, años }) => {
        const monto = principal * Math.pow(1 + tasa, años);
        return { monto, interes: monto - principal };
      },
    }),
  },
});
```

### 2. **Generador de Contenido**

```typescript
const result = await generateText({
  model: openai('gpt-4'),
  prompt: `Escribe un artículo sobre: ${topic}`,
  temperature: 0.7,
  maxTokens: 1000,
});

console.log(result.text);
```

### 3. **Búsqueda con IA (RAG)**

```typescript
// Buscar documentos primero
const docs = await buscarDocumentos(query);

// Pasar contexto a la IA
const result = await streamText({
  model: openai('gpt-4'),
  prompt: `Basándote en esto: ${docs}. Responde: ${userQuestion}`,
  messages,
});
```

---

## Cambiar de Proveedor (Lo Fácil)

**De OpenAI a Anthropic:**

```typescript
// Antes
import { openai } from '@ai-sdk/openai';
const model = openai('gpt-4');

// Ahora
import { anthropic } from '@ai-sdk/anthropic';
const model = anthropic('claude-3-sonnet');
```

¡Listo! El resto del código sigue igual.

---

## Flujo Completo Visual

```
Usuario escribe mensaje
         ↓
Componente React captura input
         ↓
Envía a /api/chat (POST)
         ↓
API route recibe mensajes
         ↓
Envía a OpenAI con streamText()
         ↓
OpenAI responde en streaming
         ↓
Frontend recibe en tiempo real
         ↓
Renderiza respuesta
```

---

## Conceptos Clave

| Concepto | Explicación |
|----------|-------------|
| **streamText()** | Envía respuesta en tiempo real (no espera a todo) |
| **generateText()** | Espera la respuesta completa |
| **useChat()** | Hook React que maneja chat automáticamente |
| **system prompt** | Instrucciones para el comportamiento de la IA |
| **tools** | Funciones que la IA puede ejecutar |
| **temperature** | 0=respuestas deterministas, 1=creativas |

---

## Troubleshooting

**Error: "API key not found"**
- Verifica que `.env.local` tenga `OPENAI_API_KEY`
- Reinicia el servidor (`npm run dev`)

**Chat lento**
- Usa `streamText()` en lugar de `generateText()`
- Reduce `maxTokens`

**Respuestas genéricas**
- Mejora el `system prompt`
- Añade contexto específico en el mensaje

---

## Próximos Pasos

1. **Agrega autenticación** para usuarios específicos
2. **Guarda historial** en base de datos (Prisma)
3. **Implementa rate limiting** para costos
4. **Usa múltiples modelos** según el caso de uso
5. **Añade validación** con Zod para inputs

---

## Recursos Útiles

- **Docs oficial:** [ai-sdk.dev](https://ai-sdk.dev)
- **Vercel templates:** [vercel.com/templates](https://vercel.com/templates)
- **Ejemplos completos:** GitHub repository oficial

---

**Resumen:** Vercel AI SDK + Next.js = Integrar IA en 5 minutos sin complicaciones. 🚀

---

*Este post fue generado automáticamente por GitHub Actions desde el [Issue #19](https://github.com/faustocalvinio/blog-fausto/issues/19) de GitHub.*
