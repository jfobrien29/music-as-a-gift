import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  // In a real application, you'd fetch this from a database
  // For now, returning mock data
  const mockGiftData = {
    title: "Your Special Song",
    audioUrl: "https://example.com/placeholder-audio.mp3",
    message: "I made this song just for you, hoping it brings a smile to your face!",
    recipientName: "Friend"
  }

  return NextResponse.json(mockGiftData)
}

