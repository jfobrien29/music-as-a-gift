"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const occasions = [
    { name: "Birthdays", icon: "🎂", description: "Make their special day unforgettable" },
    { name: "Valentine's Day", icon: "❤️", description: "Express your love through melody" },
    { name: "Wedding", icon: "💍", description: "Celebrate their perfect harmony" },
    { name: "Engagement", icon: "💑", description: "Mark the beginning of their journey" },
    { name: "Baby Shower", icon: "👶", description: "Welcome the little one with joy" },
    { name: "Get Well Soon", icon: "🌟", description: "Send comfort and healing vibes" },
    { name: "Breakup", icon: "💔", description: "Help them through tough times" },
  ]

  const features = [
    {
      title: "Personalized Playlists",
      description: "Curate the perfect mix of songs that tell your story",
      icon: "🎵"
    },
    {
      title: "Instant Delivery",
      description: "Send your musical gift instantly to any device",
      icon: "⚡"
    },
    {
      title: "Custom Messages",
      description: "Add personal notes to make it extra special",
      icon: "✉️"
    },
    {
      title: "Global Music",
      description: "Choose from millions of songs worldwide",
      icon: "🌍"
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
        <div className="relative px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
          <div className="text-center space-y-10 max-w-3xl mx-auto">
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Give the Gift of <span className="text-indigo-600">Music</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create unforgettable moments with personalized musical gifts for every special occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <Link href="/gift-info" className="w-full sm:w-auto">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-7 text-lg rounded-full w-full sm:w-auto shadow-md hover:shadow-xl transition-all duration-200">
                  Start Gifting
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50 px-12 py-7 text-lg rounded-full w-full sm:w-auto">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 leading-relaxed">Everything you need to create the perfect musical gift</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-10 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Perfect for Every Occasion</h2>
            <p className="text-xl text-gray-600 leading-relaxed">Find the right musical gift for any moment</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {occasions.map((occasion) => (
              <div
                key={occasion.name}
                className="bg-white rounded-2xl p-10 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300 group"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{occasion.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{occasion.name}</h3>
                <p className="text-gray-600 leading-relaxed">{occasion.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Ready to Share the <span className="text-indigo-600">Gift of Music</span>?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Start creating your personalized musical gift today and make someone's day special
            </p>
            <Link href="/gift-info" className="inline-block">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-7 text-lg rounded-full shadow-md hover:shadow-xl transition-all duration-200">
                Create Your Gift Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

