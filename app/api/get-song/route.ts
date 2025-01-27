import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id") as string

  const gift = await prisma.gift.findUnique({
    where: {
      id
    }
  })

  return NextResponse.json(gift)
}

