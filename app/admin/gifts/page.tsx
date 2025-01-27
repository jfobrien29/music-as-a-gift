"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { uploadSong } from "./utils"
import { GiftStatus } from "@/lib/status"
import { Input } from "@/components/ui/input"

// Prevent caching for this admin page
export const dynamic = 'force-dynamic'

interface Gift {
  id: string
  title: string | null
  lyrics: string | null
  musicDetails: string | null
  status: string
  songUrl?: string
  createdAt: string
}

export default function AdminGiftsPage() {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch('/api/get-admin-gifts', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch gifts')
        }
        const data = await response.json()
        setGifts(data)
      } catch (error) {
        console.error('Error fetching gifts:', error)
        toast({
          title: "Error",
          description: "Failed to load gifts. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchGifts()
  }, [toast])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleUpload = async (id: string, url: string) => {
    try {
      const response = await fetch('/api/update-gift-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftId: id,
          songUrl: url,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update gift')
      }

      const updatedGift = await response.json()
      setGifts(gifts.map((gift) => (gift.id === id ? updatedGift : gift)))
      
      toast({
        title: "Update successful",
        description: "The song URL has been saved successfully.",
      })
    } catch (error) {
      console.error('Update error:', error)
      toast({
        title: "Update failed",
        description: "Failed to save the song URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Admin Gift Management</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-32 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admin Gift Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Lyrics</TableHead>
            <TableHead>Music Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gifts.map((gift) => (
            <TableRow key={gift.id}>
              <TableCell className="font-medium">
                <CopyableText text={gift.title || ''} onCopy={handleCopy} />
                {copiedText === gift.title && <span className="ml-2 text-sm text-green-600">Copied!</span>}
              </TableCell>
              <TableCell className="max-w-md">
                <CopyableText text={gift.lyrics || ''} onCopy={handleCopy} />
                {copiedText === gift.lyrics && <span className="ml-2 text-sm text-green-600">Copied!</span>}
              </TableCell>
              <TableCell className="max-w-md">
                <CopyableText text={gift.musicDetails || ''} onCopy={handleCopy} />
                {copiedText === gift.musicDetails && <span className="ml-2 text-sm text-green-600">Copied!</span>}
              </TableCell>
              <TableCell>{gift.status}</TableCell>
              <TableCell>
                <SongUrlInput
                  onSubmit={(url) => handleUpload(gift.id, url)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

interface CopyableTextProps {
  text: string
  onCopy: (text: string) => void
}

function CopyableText({ text, onCopy }: CopyableTextProps) {
  return (
    <button
      className="text-left hover:bg-gray-100 p-1 rounded transition-colors w-full line-clamp-2"
      onClick={() => onCopy(text)}
      aria-label={`Copy text: ${text}`}
      title={text}
    >
      {text || 'Not set'}
    </button>
  )
}

interface SongUrlInputProps {
  onSubmit: (url: string) => void
}

function SongUrlInput({ onSubmit }: SongUrlInputProps) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
      setUrl("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter song URL"
        className="min-w-[200px]"
      />
      <Button type="submit" variant="outline" disabled={!url.trim()}>
        Save
      </Button>
    </form>
  )
}

