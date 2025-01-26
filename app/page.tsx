import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-6xl font-bold text-white mb-8 text-center">Give the Gift of Music</h1>
      <Link href="/gift-info">
        <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100">
          Start Gifting
        </Button>
      </Link>
    </div>
  )
}

