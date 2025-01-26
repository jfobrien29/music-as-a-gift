"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Overview() {
  const router = useRouter()
  const [overview, setOverview] = useState("")

  useEffect(() => {
    const fetchOverview = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id")
      if (id) {
        const response = await fetch(`/api/get-overview?id=${id}`)
        const data = await response.json()
        setOverview(data.overview)
      }
    }
    fetchOverview()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/generate-lyrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ overview }),
    })
    const data = await response.json()
    router.push(`/lyrics?id=${data.id}`)
  }

  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Song Overview</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          rows={10}
          className="w-full p-2 border rounded"
        />
        <Button type="submit">Generate Lyrics</Button>
      </form>
    </div>
  )
}

