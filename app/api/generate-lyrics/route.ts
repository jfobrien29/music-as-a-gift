import { GiftStatus } from "@/lib/status";
import { NextResponse } from "next/server"
import OpenAI from "openai"
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { overview, id } = body

  // Load the gift object
  const gift = await prisma.gift.findUnique({
    where: { id }
  })

  if (!gift) {
    return NextResponse.json({ error: "Gift not found" }, { status: 404 })
  }

  const prompt = `Based on the following overview, generate a title, lyrics, and the style of music for a song.
  The lyrics should be creative, emotionally resonant, and match the style described in the overview.
  Don't write too much for the lyrics. The best songs are simple and not over complicated.

  Return in a JSON format with the following keys:
  - title (text, max length 100 characters)
  - lyrics (text, max length 3000 characters)
  - musicDetails (text, max length 200 characters). Use as much of these characters as possible to paint the picture of style, instruments, and other musical detals.
  
  ---
  Overview: ${overview}

  Here is additional information about the song. This information is less important than the overview and should only be used for context and supporting information.
  Recipient: ${gift.recipientName}
  Event: ${gift.event}
  Attributes: ${gift.attributes}
  Genres: ${gift.genres}
  Favorite Artists: ${gift.favoriteArtists}
  Mood/Vibe: ${gift.mood}
  `

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  })

  console.log(completion.choices[0].message.content)

  const json = JSON.parse(completion.choices[0].message.content || '{}')

  const { title, lyrics, musicDetails } = json;

  // save this in prisma
  await prisma.gift.update({
    where: { id },
    data: { lyrics, title, musicDetails, status: GiftStatus.OVERVIEW_APPROVED },
  });

  return NextResponse.json({ id, lyrics, title, musicDetails })
}

