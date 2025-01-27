"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function Lyrics() {
  const router = useRouter()
  const [lyrics, setLyrics] = useState("")
  const [title, setTitle] = useState("")
  const [musicDetails, setMusicDetails] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchLyrics = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id")
      if (id) {
        const response = await fetch(`/api/get-lyrics?id=${id}`)
        const data = await response.json()
        setLyrics(data.lyrics || "")
        setTitle(data.title || "")
        setMusicDetails(data.musicDetails || "")
      }
    }
    fetchLyrics()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id")
      const response = await fetch("/api/generate-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lyrics, title, musicDetails, id: id }),
      })
      const data = await response.json()
      router.push(`/output?id=${data.id}`)
    } catch (error) {
      console.error("Error generating song:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Step 3: Final Song Approval</h1>

      <Card className="p-6 mb-8 bg-muted">
        <h2 className="text-lg font-semibold mb-2">Last Chance to Edit</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Review and edit the lyrics and music style before we generate your song. Make sure we got all the details right to make your gift special.
        </p>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Song Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter song title"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Music Style Details</label>
          <Textarea
            value={musicDetails}
            onChange={(e) => setMusicDetails(e.target.value)}
            placeholder="Describe the style of music (genre, mood, tempo, etc.)"
            rows={3}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Lyrics</label>
          <Textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            rows={20}
            className="w-full"
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate My Song!"}
        </Button>
      </form>
    </div>
  )
}

