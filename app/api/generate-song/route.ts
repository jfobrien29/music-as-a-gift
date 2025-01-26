import { NextResponse } from "next/server"
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { lyrics } = body

  const output = await replicate.run(
    "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
    {
      input: {
        prompt_a: lyrics.substring(0, 100), // Use the first 100 characters of the lyrics as the prompt
      },
    },
  )

  // In a real application, you'd save this to a database and return an ID
  const id = Math.random().toString(36).substr(2, 9)
  const title = "Generated Song" // You might want to generate a title based on the lyrics

  return NextResponse.json({ id, title, audioUrl: output.audio })
}

