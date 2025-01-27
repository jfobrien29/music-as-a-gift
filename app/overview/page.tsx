"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Overview() {
  const router = useRouter()
  const [overview, setOverview] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id")
      const response = await fetch("/api/generate-lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overview, id }),
      })
      const data = await response.json()
      router.push(`/lyrics?id=${data.id}`)
    } catch (error) {
      console.error("Error generating lyrics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Step 2: Your Song Plan</h1>
      <div className="p-6 mb-8 border rounded-lg bg-muted">
        <h2 className="text-lg font-semibold mb-2">Review Plan</h2>
        <p className="text-sm text-muted-foreground">
          We've generated a brief plan for your personalized song. Review the overview below and feel free to make any changes before we create the lyrics and detailed musical description. Once you're happy with the plan, click "Looks Good" to continue.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          rows={16}
          className="w-full p-2 border rounded"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating Lyrics..." : "Looks Good"}
        </Button>
      </form>
    </div>
  )
}

