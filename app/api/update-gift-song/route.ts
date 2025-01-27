import { NextResponse } from 'next/server'
import { GiftStatus } from '@/lib/status'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { giftId, songUrl } = await request.json()

    const updatedGift = await prisma.gift.update({
      where: { id: giftId },
      data: {
        songUrl,
        status: GiftStatus.COMPLETED
      }
    })

    return NextResponse.json(updatedGift)
  } catch (error) {
    console.error('Error updating gift:', error)
    return NextResponse.json(
      { error: 'Failed to update gift' },
      { status: 500 }
    )
  }
}