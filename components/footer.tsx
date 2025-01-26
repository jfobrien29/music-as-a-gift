import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
          Music as a Gift
        </Link>
        <Link href="/gift-info">
          <Button variant="ghost" size="sm">
            Create a Gift
          </Button>
        </Link>
      </div>
    </footer>
  )
} 