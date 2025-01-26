import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { overview } = body

  const prompt = `Based on the following overview, generate lyrics for a song:
    ${overview}

    The lyrics should be creative, emotionally resonant, and match the style described in the overview.`

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  })

  const lyrics = completion.choices[0].message.content

  // In a real application, you'd save this to a database and return an ID
  const id = Math.random().toString(36).substr(2, 9)

  return NextResponse.json({ id, lyrics })
}

