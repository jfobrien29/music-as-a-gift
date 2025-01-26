"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6">Welcome to the admin area. Here you can manage song generation requests.</p>

      <Card>
        <CardContent className="pt-6">
          <Link 
            href="/admin/gifts"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Song Requests
          </Link>
          <p className="mt-2 text-gray-600">
            Go here to view and fulfill pending song generation requests from users.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
