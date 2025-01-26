import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage.from("songs").upload(`${Date.now()}-${file.name}`, buffer, {
      contentType: file.type,
    })

    if (error) {
      console.error("Supabase storage error:", error)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    // Return the URL of the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from("songs").getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

