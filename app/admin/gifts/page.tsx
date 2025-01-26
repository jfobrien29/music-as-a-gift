"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { Gift } from "./types"
import { uploadSong } from "./utils"

const initialGifts: Gift[] = [
  { id: 1, title: "Birthday Surprise", message: "Happy Birthday!", musicType: "Pop", status: "Pending" },
  { id: 2, title: "Anniversary Celebration", message: "Happy Anniversary!", musicType: "Jazz", status: "Completed" },
  { id: 3, title: "Graduation Gift", message: "Congratulations!", musicType: "Classical", status: "Pending" },
]

export default function AdminGiftsPage() {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleUpload = async (id: number, file: File) => {
    try {
      const url = await uploadSong(file)
      setGifts(gifts.map((gift) => (gift.id === id ? { ...gift, status: "Completed", songUrl: url } : gift)))
      toast({
        title: "Upload successful",
        description: "The song has been uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading the song. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admin Gift Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Music Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gifts.map((gift) => (
            <TableRow key={gift.id}>
              <TableCell className="font-medium">
                <CopyableText text={gift.title} onCopy={handleCopy} />
                {copiedText === gift.title && <span className="ml-2 text-sm text-green-600">Copied!</span>}
              </TableCell>
              <TableCell>
                <CopyableText text={gift.message} onCopy={handleCopy} />
                {copiedText === gift.message && <span className="ml-2 text-sm text-green-600">Copied!</span>}
              </TableCell>
              <TableCell>
                <CopyableText text={gift.musicType} onCopy={handleCopy} />
                {copiedText === gift.musicType && <span className="ml-2 text-sm text-green-600">Copied!</span>}
              </TableCell>
              <TableCell>{gift.status}</TableCell>
              <TableCell>
                <FileUploadButton
                  onUpload={(file) => handleUpload(gift.id, file)}
                  disabled={gift.status === "Completed"}
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
      className="text-left hover:bg-gray-100 p-1 rounded transition-colors"
      onClick={() => onCopy(text)}
      aria-label={`Copy text: ${text}`}
    >
      {text}
    </button>
  )
}

interface FileUploadButtonProps {
  onUpload: (file: File) => void
  disabled?: boolean
}

function FileUploadButton({ onUpload, disabled }: FileUploadButtonProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".mp3"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id={`fileInput-${Math.random()}`}
        disabled={disabled}
      />
      <label htmlFor={`fileInput-${Math.random()}`}>
        <Button variant="outline" disabled={disabled}>
          Upload Song
        </Button>
      </label>
    </div>
  )
}

