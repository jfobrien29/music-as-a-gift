import { NextResponse } from "next/server"
import { GiftStatus } from "@/lib/status"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()
  const { id, lyrics, title, musicDetails } = body;

  // update the status of the gift in prisma
  await prisma.gift.update({
    where: { id },
    data: { status: GiftStatus.PENDING_SONG_CREATION, lyrics, title, musicDetails },
  });

  return NextResponse.json({ id: body.id })
}

