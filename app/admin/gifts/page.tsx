"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { uploadSong } from "./utils"
import { GiftStatus } from "@/lib/status"

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
        const response = await fetch('/api/get-admin-gifts')
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

  const handleUpload = async (id: string, file: File) => {
    try {
      const url = await uploadSong(file)
      
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
        title: "Upload successful",
        description: "The song has been uploaded successfully.",
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading the song. Please try again.",
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
                <FileUploadButton
                  onUpload={(file) => handleUpload(gift.id, file)}
                  disabled={gift.status === GiftStatus.COMPLETED}
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

interface FileUploadButtonProps {
  onUpload: (file: File) => void
  disabled?: boolean
}

function FileUploadButton({ onUpload, disabled }: FileUploadButtonProps) {
  const inputId = `fileInput-${disabled ? 'disabled' : 'enabled'}`
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUpload(file)
      // Reset the input value so the same file can be uploaded again if needed
      event.target.value = ''
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        accept="audio/mpeg,audio/mp3"
        onChange={handleFileChange}
        className="hidden"
        id={inputId}
        disabled={disabled}
      />
      <label
        htmlFor={inputId}
        className={`cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Button variant="outline" disabled={disabled} asChild>
          <span>Upload Song</span>
        </Button>
      </label>
    </div>
  )
}

