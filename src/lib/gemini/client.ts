import { GoogleGenerativeAI, type Part } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const flashModel = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: {
    temperature:      0.4,
    topK:             32,
    topP:             0.95,
    maxOutputTokens:  8192,
    responseMimeType: 'application/json',
  },
})

// Retry wrapper with exponential backoff
export async function generateJSON<T>(
  prompt: string,
  fileParts?: Part[],
  retries = 3
): Promise<T> {
  let lastError: Error | null = null

  for (let i = 0; i < retries; i++) {
    try {
      const parts: Part[] = fileParts
        ? [...fileParts, { text: prompt }]
        : [{ text: prompt }]

      const result = await flashModel.generateContent({
        contents: [{ role: 'user', parts }],
      })

      const text = result.response.text()
      // Strip markdown fences if present
      const clean = text.replace(/```json\n?|\n?```/g, '').trim()
      return JSON.parse(clean) as T

    } catch (err) {
      lastError = err as Error
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000))
      }
    }
  }

  throw lastError
}
