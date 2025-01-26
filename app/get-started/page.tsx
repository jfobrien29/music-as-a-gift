"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function GiftInfo() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    recipientName: "",
    event: "",
    attributes: "",
    genres: "",
    favoriteArtists: "",
    mood: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      router.push(`/overview?id=${data.id}`)
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("An error occurred while submitting the form. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Gift Information</h1>

      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
          You're about to create a personalized song for a friend on a special occasion!
        </h2>

        <div className="mb-4">
          <p className="font-medium mb-2">Here's how it works:</p>
          <ul className="space-y-2 list-inside list-disc  pl-4">
            <li>We'll ask you a few questions about the recipient and the occasion</li>
            <li>We'll generate an initial idea for the song that you can review and adjust</li>
            <li>Then, we'll generate the lyrics and style of the song (you can adjust this too)</li>
            <li>Finally, we'll generate the song and give you a link to share it with your friend</li>
          </ul>
        </div>

        <p className="text-gray-700 italic">We hope you enjoy creating this special gift!</p>
      </div>

      <div className="flex justify-center">
        <Link href="/gift-info">
          <Button>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}

