import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id") as string

  const gift = await prisma.gift.findUnique({
    where: { id: id },
  })

  if (!gift) {
    return NextResponse.json({ error: "Gift not found" }, { status: 404 })
  }

  return NextResponse.json({ overview: gift?.overview })
}

