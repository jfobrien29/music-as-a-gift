"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function Output() {
  const [songData, setSongData] = useState<{ title: string; audioUrl: string } | null>(null)
  const { toast } = useToast()

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

  const giftUrl = `${window.location.origin}/gifts/${new URLSearchParams(window.location.search).get("id")}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftUrl)
    toast({
      title: "Link copied!",
      description: "The gift link has been copied to your clipboard.",
      duration: 3000,
    })
  }

  return (
    <div className="container mx-auto max-w-2xl mt-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Your Gift is Ready!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Share this special musical gift with your loved one
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-700">
            <strong>Important:</strong> Make sure to copy this link! You'll need it to share your gift.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Your gift link:</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={giftUrl}
              readOnly
              className="w-full p-2 border rounded bg-gray-50"
            />
            <Button onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.location.href = giftUrl}>
            Preview Gift
          </Button>
          <Button onClick={() => window.location.href = '/'}>
            Create Another Gift
          </Button>
        </div>
      </div>
    </div>
  )
}

