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
    { name: "Anniversary", icon: "💍", description: "Celebrate their perfect harmony" },
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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/90 via-white/90 to-white/90" />
        <div className="absolute inset-0 bg-[url('/music-pattern.svg')] opacity-5" />
        {/* Rotating Circle of Images */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 0 }}>
          <div className="relative w-[600px] h-[600px] animate-[rotate-around_30s_linear_infinite]">
            {[...Array(9)].map((_, i) => {
              const angle = (i * (360 / 9)) * (Math.PI / 180);
              const radius = 250;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={i}
                  className="absolute w-32 h-32 rounded-full overflow-hidden opacity-40 hover:opacity-80 transition-opacity duration-300 shadow-lg"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%) rotate(calc(360deg - var(--rotation)))',
                    '--rotation': `${(i * (360 / 9))}deg`,
                  } as any}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/hugs/${i + 1}.jpeg`}
                    alt={`Hug ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute inset-0 animate-float" style={{ zIndex: 1 }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-indigo-500 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s linear infinite`,
                fontSize: `${20 + Math.random() * 30}px`,
              }}
            >
              ♪
            </div>
          ))}
        </div>
        <div className="relative px-6 lg:px-8 max-w-[1400px] mx-auto w-full" style={{ zIndex: 2 }}>
          <div className="text-center space-y-10 max-w-3xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                Give the Gift of{" "}
                <span className="text-indigo-600 relative">
                  Music
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-200 transform -skew-x-12" />
                </span>
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Create unforgettable moments with personalized musical gifts for every special occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6 animate-fade-in-up animation-delay-300">
              <Link href="/gift-info" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="relative bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-8 text-xl rounded-full w-full sm:w-auto shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10">Start Gifting Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                    →
                  </div>
                </Button>
              </Link>
            </div>
            <div className="mt-6 animate-fade-in-up animation-delay-400">
              <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-8 py-3 rounded-full text-lg font-medium shadow-sm">
                🎵 Only $6.99 per gifted song! 🎵
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 relative inline-block">
              Why Choose Us?
              <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-200 transform -skew-x-12" />
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">Everything you need to create the perfect musical gift</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-10 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300 group hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/music-pattern.svg')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 relative inline-block">
              Perfect for Every Occasion
              <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-200 transform -skew-x-12" />
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">Find the right musical gift for any moment</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {occasions.map((occasion, index) => (
              <div
                key={occasion.name}
                className="bg-white rounded-2xl p-10 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300 group hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{occasion.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{occasion.name}</h3>
                <p className="text-gray-600 leading-relaxed">{occasion.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/music-pattern.svg')] opacity-5" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="space-y-10">
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
              Ready to Share the{" "}
              <span className="text-indigo-600 relative inline-block">
                Gift of Music?
                <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-200 transform -skew-x-12" />
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Start creating your personalized musical gift today and make someone's day special
            </p>
            <Link href="/gift-info" className="inline-block animate-bounce">
              <Button 
                size="lg" 
                className="relative bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-8 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Create Your Gift Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                  →
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

