"use client"
import { PlayLessonClient } from "@/components/play-lesson-client"

// Mock data with meaningful emoji icons as image property for visual representation
const lessons: Record<string, any> = {
  "1": {
    id: "1",
    title: "English: Articles (A vs An)",
    items: [
      { id: "1", text: "apple", correctGroupId: "group1", icon: "🍎" },
      { id: "2", text: "oven", correctGroupId: "group1", icon: "🔥" },
      { id: "3", text: "orange", correctGroupId: "group1", icon: "🍊" },
      { id: "4", text: "elephant", correctGroupId: "group2", icon: "🐘" },
      { id: "5", text: "umbrella", correctGroupId: "group2", icon: "☂️" },
      { id: "6", text: "igloo", correctGroupId: "group2", icon: "🏔️" },
    ],
    groups: [
      { id: "group1", title: "A", color: "chart-3" },
      { id: "group2", title: "An", color: "chart-1" },
    ],
  },
  "2": {
    id: "2",
    title: "Science: Animal Classification",
    items: [
      { id: "1", text: "dog", correctGroupId: "group1", icon: "🐕" },
      { id: "2", text: "cat", correctGroupId: "group1", icon: "🐱" },
      { id: "3", text: "whale", correctGroupId: "group2", icon: "🐋" },
      { id: "4", text: "fish", correctGroupId: "group2", icon: "🐠" },
      { id: "5", text: "parrot", correctGroupId: "group3", icon: "🦜" },
      { id: "6", text: "eagle", correctGroupId: "group3", icon: "🦅" },
    ],
    groups: [
      { id: "group1", title: "Mammals (Land)", color: "chart-4" },
      { id: "group2", title: "Mammals (Water)", color: "chart-1" },
      { id: "group3", title: "Birds", color: "chart-2" },
    ],
  },
  "3": {
    id: "3",
    title: "Geometry: Shapes",
    items: [
      { id: "1", text: "square", correctGroupId: "group1", icon: "▢" },
      { id: "2", text: "triangle", correctGroupId: "group1", icon: "△" },
      { id: "3", text: "pentagon", correctGroupId: "group1", icon: "⬠" },
      { id: "4", text: "circle", correctGroupId: "group2", icon: "●" },
      { id: "5", text: "oval", correctGroupId: "group2", icon: "⬭" },
      { id: "6", text: "star", correctGroupId: "group3", icon: "★" },
    ],
    groups: [
      { id: "group1", title: "Polygons", color: "chart-3" },
      { id: "group2", title: "Curved Shapes", color: "chart-4" },
      { id: "group3", title: "Stars & Special", color: "chart-5" },
    ],
  },
}

export default async function PlayLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lesson = lessons[id]

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Lesson not found</h1>
          <p className="text-foreground/60 text-sm">The lesson you are looking for does not exist.</p>
          <a href="/">
            <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90">
              Back to Home
            </button>
          </a>
        </div>
      </div>
    )
  }

  return <PlayLessonClient lesson={lesson} />
}
