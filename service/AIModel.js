import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-1.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}
main();