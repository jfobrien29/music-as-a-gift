"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Output() {
  const [songData, setSongData] = useState<{ title: string; audioUrl: string } | null>(null)

  useEffect(() => {
    const fetchSongData = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id")
      if (id) {
        const response = await fetch(`/api/get-song?id=${id}`)
        const data = await response.json()
        setSongData(data)
      }
    }
    fetchSongData()
  }, [])

  if (!songData) return <div>Loading...</div>

  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6">{songData.title}</h1>
      <audio controls src={songData.audioUrl} className="w-full mb-4" />
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Share your gift:</h2>
        <input type="text" value={window.location.href} readOnly className="w-full p-2 border rounded" />
      </div>
      <Button onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy Link</Button>
    </div>
  )
}

