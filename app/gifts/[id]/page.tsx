"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import confetti from 'canvas-confetti'
import { motion } from "framer-motion"

export default function GiftPage({ params }: { params: { id: string } }) {
  const [giftData, setGiftData] = useState<{
    title: string
    songUrl: string
    message?: string
    recipientName?: string
    senderName?: string
  } | null>(null)

  useEffect(() => {
    const fetchGiftData = async () => {
      const response = await fetch(`/api/get-song?id=${params.id}`)
      const data = await response.json()
      setGiftData({
        title: data.title || 'Your Special Song',
        songUrl: data.songUrl || '',
        message: data.message,
        recipientName: data.name,
        senderName: data.senderName
      })
    }
    fetchGiftData()
  }, [params.id])

  useEffect(() => {
    if (giftData) {
      const duration = 15 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [giftData])

  if (!giftData) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="animate-pulse text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Loading your special gift...
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-2xl"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
          >
            {giftData.recipientName ? `For ${giftData.recipientName}` : 'A Special Gift for You'}
          </motion.h1>
          {giftData.message && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-700 mb-6 italic"
            >
              "{giftData.message}"
            </motion.p>
          )}
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-xl p-8 border-2 border-purple-100"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            {giftData.title}
          </h2>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 blur-xl opacity-30 rounded-lg" />
            <audio 
              controls 
              src={giftData.songUrl} 
              className="relative w-full mb-8 z-10"
              style={{ 
                borderRadius: '0.75rem',
                backgroundColor: '#f3f4f6'
              }} 
            />
          </div>
          
          <motion.div 
            className="flex justify-center gap-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button 
              onClick={() => window.location.href = '/'} 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-lg transform transition-all hover:scale-105"
            >
              Create Your Own Gift
            </Button>
          </motion.div>

          {giftData.senderName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-8 pt-6 border-t border-purple-100"
            >
              <p className="text-gray-600 font-medium">
                With love from
                <span className="block mt-1 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                  {giftData.senderName}
                </span>
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
} 