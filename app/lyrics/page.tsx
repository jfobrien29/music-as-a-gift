"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Lyrics() {
  const router = useRouter()
  const [lyrics, setLyrics] = useState("")

  useEffect(() => {
    const fetchLyrics = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id")
      if (id) {
        const response = await fetch(`/api/get-lyrics?id=${id}`)
        const data = await response.json()
        setLyrics(data.lyrics)
      }
    }
    fetchLyrics()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/generate-song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lyrics }),
    })
    const data = await response.json()
    router.push(`/output?id=${data.id}`)
  }

  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Song Lyrics</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          rows={20}
          className="w-full p-2 border rounded"
        />
        <Button type="submit">Generate Song</Button>
      </form>
    </div>
  )
}

