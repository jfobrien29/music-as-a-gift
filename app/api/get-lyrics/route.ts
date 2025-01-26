import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  // In a real application, you'd fetch this from a database
  const lyrics = "These are placeholder lyrics. In a real application, you'd fetch the actual lyrics based on the ID."

  return NextResponse.json({ lyrics })
}

