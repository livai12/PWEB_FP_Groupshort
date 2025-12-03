"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { useState } from "react"

// Mock lessons data
const allLessons = [
  {
    id: "1",
    title: "English: Articles (A vs An)",
    description: "Learn the difference between 'a' and 'an' with common objects",
    itemCount: 6,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "2",
    title: "Science: Animal Classification",
    description: "Sort animals into their correct categories based on habitat",
    itemCount: 6,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "3",
    title: "Geometry: Shapes",
    description: "Identify and categorize different geometric shapes",
    itemCount: 6,
    color: "from-purple-500 to-pink-500",
  },
]

export default function HomePage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600/50 mb-4">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Educational Game</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Group N Sort
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Drag and drop items into the correct categories. Test your knowledge and improve your understanding with
            interactive sorting challenges.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-12">
          {/* Section Title */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Select a Challenge</h2>
            <p className="text-slate-400">Choose a lesson to get started</p>
          </div>

          {/* Lessons Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allLessons.map((lesson) => (
              <Link key={lesson.id} href={`/play/${lesson.id}`}>
                <Card
                  className="group relative overflow-hidden cursor-pointer h-full border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 p-6"
                  onMouseEnter={() => setHoveredId(lesson.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${lesson.color})` }}
                  />

                  <div className="relative space-y-4">
                    {/* Color Indicator */}
                    <div
                      className="h-1 w-12 rounded-full group-hover:w-16 transition-all duration-300"
                      style={{ background: lesson.color.split(" ")[1] }}
                    />

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {lesson.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      {lesson.description}
                    </p>

                    {/* Item Count */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        {lesson.itemCount} items
                      </span>
                      <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute -bottom-40 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      </div>
    </div>
  )
}
