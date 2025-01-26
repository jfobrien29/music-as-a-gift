"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Lyrics() {
  const router = useRouter()
  const [lyrics, setLyrics] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id")
      const response = await fetch("/api/generate-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lyrics, id: id }),
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
      <h1 className="text-3xl font-bold mb-6">Song Lyrics</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          rows={20}
          className="w-full p-2 border rounded"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Song"}
        </Button>
      </form>
    </div>
  )
}

