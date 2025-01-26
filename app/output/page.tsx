"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { GiftStatus } from "@/lib/status"
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

interface GiftData {
  title: string
  audioUrl: string
  status: GiftStatus
}

export default function Output() {
  const [giftData, setGiftData] = useState<GiftData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { width, height } = useWindowSize()

  useEffect(() => {
    const fetchGiftData = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id")

      if (id) {
        try {
          const response = await fetch(`/api/get-song?id=${id}`)
          const data = await response.json()
          setGiftData(data)
        } catch (error) {
          console.error('Error fetching gift:', error)
          toast({
            title: "Error",
            description: "Failed to load the gift. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchGiftData()
  }, [toast])

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl mt-10 px-4 text-center">
        <div className="animate-pulse">
          <h1 className="text-4xl font-bold mb-4">Loading your gift...</h1>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!giftData) {
    return (
      <div className="container mx-auto max-w-2xl mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Gift Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the gift you're looking for.</p>
        <Button onClick={() => window.location.href = '/'}>
          Create New Gift
        </Button>
      </div>
    )
  }

  if (giftData.status !== GiftStatus.COMPLETED) {
    return (
      <div className="container mx-auto max-w-2xl mt-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Gift is Being Created</h1>
          <p className="text-lg text-gray-600 mb-6">
            We're working on making the song for your gift perfect (or at least as good as we can). Please check back in a few minutes.
          </p>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

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
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
      />
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
    </>
  )
}

