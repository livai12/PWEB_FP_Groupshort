"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Search } from "lucide-react"
import { useState, useMemo } from "react"

const allLessons = [
  {
    id: "1",
    title: "Biology: Plant Parts",
    category: "Science",
    difficulty: "Easy",
    description: "Learn about different parts of plants and their functions",
  },
  {
    id: "2",
    title: "Geometry: 2D Shapes",
    category: "Math",
    difficulty: "Medium",
    description: "Identify and categorize two-dimensional shapes",
  },
  {
    id: "3",
    title: "History: Ancient Civilizations",
    category: "Social Studies",
    difficulty: "Hard",
    description: "Explore characteristics of ancient Egypt and Rome",
  },
  {
    id: "4",
    title: "Spanish Vocabulary: Animals",
    category: "Languages",
    difficulty: "Easy",
    description: "Learn animal names in Spanish",
  },
  {
    id: "5",
    title: "Chemistry: Elements",
    category: "Science",
    difficulty: "Hard",
    description: "Group elements by their properties",
  },
]

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [...new Set(allLessons.map((l) => l.category))]
  const difficultyColors: Record<string, string> = {
    Easy: "bg-chart-1/20 text-chart-1",
    Medium: "bg-chart-2/20 text-chart-2",
    Hard: "bg-destructive/20 text-destructive",
  }

  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || lesson.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Browse Lessons</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="space-y-6 mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Link key={lesson.id} href={`/play/${lesson.id}`}>
              <Card className="p-6 cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-lg flex-1">{lesson.title}</h3>
                </div>
                <p className="text-sm text-foreground/60 mb-4 flex-1">{lesson.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs font-medium text-foreground/60">{lesson.category}</span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[lesson.difficulty]}`}
                  >
                    {lesson.difficulty}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60 text-lg mb-4">No lessons found</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory(null)
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
