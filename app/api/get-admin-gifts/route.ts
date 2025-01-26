import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { GiftStatus } from "@/lib/status"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      where: {
        status: {
          in: [GiftStatus.PENDING_SONG_CREATION, GiftStatus.COMPLETED]
        }
      },
      orderBy: [
        {
          status: 'asc' // This will put PENDING_SONG_CREATION first as it comes before COMPLETED alphabetically
        },
        {
          createdAt: 'desc'
        }
      ],
      select: {
        id: true,
        status: true,
        lyrics: true,
        musicDetails: true,
        title: true,
        name: true,
        
        event: true,
        genres: true,
        songUrl: true,
        createdAt: true,
      }
    })

    return NextResponse.json(gifts)
  } catch (error) {
    console.error("Error fetching gifts:", error)
    return NextResponse.json({ error: "Failed to fetch gifts" }, { status: 500 })
  }
}