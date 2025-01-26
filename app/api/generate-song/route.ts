import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { GiftStatus } from "@/lib/status"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  const { id, lyrics } = body;

  // update the status of the gift in prisma
  await prisma.gift.update({
    where: { id },
    data: { status: GiftStatus.PENDING_SONG_CREATION, lyrics },
  });

  return NextResponse.json({ id: body.id, title: "Generated Song", audioUrl: "https://example.com/song.mp3" })
}

