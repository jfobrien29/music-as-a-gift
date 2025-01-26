"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GiftPage({ params }: { params: { id: string } }) {
  const [giftData, setGiftData] = useState<{
    title: string
    audioUrl: string
    message?: string
    recipientName?: string
  } | null>(null)

  useEffect(() => {
    const fetchGiftData = async () => {
      const response = await fetch(`/api/get-song?id=${params.id}`)
      const data = await response.json()
      setGiftData(data)
    }
    fetchGiftData()
  }, [params.id])

  if (!giftData) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-xl">Loading your special gift...</div>
    </div>
  )

  return (
    <div className="container mx-auto max-w-2xl mt-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          {giftData.recipientName ? `For ${giftData.recipientName}` : 'A Special Gift for You'}
        </h1>
        {giftData.message && (
          <p className="text-lg text-gray-700 mb-6 italic">
            "{giftData.message}"
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">{giftData.title}</h2>
        <audio 
          controls 
          src={giftData.audioUrl} 
          className="w-full mb-6"
          style={{ 
            borderRadius: '0.5rem',
            backgroundColor: '#f3f4f6'
          }} 
        />
        
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.location.href = '/'}>
            Create Your Own Gift
          </Button>
        </div>
      </div>
    </div>
  )
} 