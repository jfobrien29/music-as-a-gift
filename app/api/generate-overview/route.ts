import { NextResponse } from "next/server"
import OpenAI from "openai"
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { recipientName, event, attributes, genres, favoriteArtists, mood } = body

    if (!recipientName || !event || !attributes || !genres || !favoriteArtists || !mood) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // save this in prisma
    const gift = await prisma.gift.create({
      data: {
        name: recipientName,
        event: event,
        attributes: attributes,
        genres: genres,
        artists: favoriteArtists,
        mood: mood,
      },
    });

    const prompt = `Generate a high-level overview for a song with the following details:
      Recipient: ${recipientName}
      Event: ${event}
      Attributes: ${attributes}
      Genres: ${genres}
      Favorite Artists: ${favoriteArtists}
      Mood/Vibe: ${mood}

      The overview should include the song's theme, style, and emotional impact.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })

    const overview = completion.choices[0].message.content

    // save this in prisma
    await prisma.gift.update({
      where: { id: gift.id },
      data: { overview: overview },
    });

    return NextResponse.json({ id: gift.id, overview })
  } catch (error) {
    console.error("Error in generate-overview:", error)
    return NextResponse.json({ error: "An error occurred while generating the overview" }, { status: 500 })
  }
}

