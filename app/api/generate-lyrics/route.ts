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

  const prompt = `Based on the following overview, generate lyrics for a song:
    ${overview}

    The lyrics should be creative, emotionally resonant, and match the style described in the overview.`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  })

  const lyrics = completion.choices[0].message.content

  // save this in prisma
  await prisma.gift.update({
    where: { id },
    data: { lyrics: lyrics, status: GiftStatus.OVERVIEW_APPROVED },
  });

  return NextResponse.json({ id, lyrics })
}

