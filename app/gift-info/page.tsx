"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { v4 as uuid } from 'uuid';


export default function GiftInfo() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    recipientName: "",
    event: "",
    attributes: "",
    genres: "",
    favoriteArtists: "",
    mood: "",
    senderName: "",
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

      console.log(response)
      
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
      <h1 className="text-3xl font-bold mb-6">Step 1: Gift and Recipient Information</h1>
      
      <div className="p-6 mb-8 border rounded-lg bg-muted">
        <h2 className="text-lg font-semibold mb-2">Gift Information</h2>
        <p className="text-sm text-muted-foreground">
          We'll use this information to generate a personalized song for your recipient.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="recipientName">Recipient's Name</Label>
          <Input
            id="recipientName"
            name="recipientName"
            placeholder="Amanda"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="event">Event</Label>
          <Input id="event" name="event" placeholder="Birthday, Valentine's Day, Baby Shower, etc." value={formData.event} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="attributes">Attributes</Label>
          <Textarea id="attributes" name="attributes" placeholder="Describe the recipient's personality, interests, or anything else you want to include" value={formData.attributes} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="genres">Genres</Label>
          <Input id="genres" name="genres" placeholder="Trance, House, KPop, Rock, Country, etc." value={formData.genres} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="favoriteArtists">Favorite Artists</Label>
          <Input
            id="favoriteArtists"
            name="favoriteArtists"
            placeholder="Ariana Grande, Drake, The Weeknd, etc."
            value={formData.favoriteArtists}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="mood">Mood/Vibe</Label>
          <Input id="mood" name="mood" placeholder="Happy, Sad, Romantic, etc." value={formData.mood} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="senderName">Your Name (The sender of the gift)</Label>
          <Input
            id="senderName"
            name="senderName"
            placeholder="Your name"
            value={formData.senderName}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Overview"}
        </Button>
      </form>
    </div>
  )
}

