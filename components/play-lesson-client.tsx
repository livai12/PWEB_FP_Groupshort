"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DragDropGame } from "@/components/drag-drop-game"
import { StartScreen } from "@/components/start-screen"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw } from "lucide-react"

interface Item {
  id: string
  text: string
  correctGroupId: string
  image?: string
}

interface Group {
  id: string
  title: string
  color: string
}

interface PlayLessonClientProps {
  lesson: {
    id: string
    title: string
    items: Item[]
    groups: Group[]
  }
}

export function PlayLessonClient({ lesson }: PlayLessonClientProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const router = useRouter()

  if (!gameStarted && !completed) {
    return (
      <StartScreen
        title={lesson.title}
        description="Drag and drop items into the correct categories. Sort all items correctly to complete the challenge!"
        items={lesson.items}
        groups={lesson.groups}
        onStart={() => setGameStarted(true)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border bg-white/50 backdrop-blur sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors hover:bg-primary/10 px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider hidden sm:block">
            {lesson.title}
          </span>
          <div className="w-16" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {!completed ? (
          <div className="animate-fade-in-up">
            <DragDropGame
              title={lesson.title}
              items={lesson.items}
              groups={lesson.groups}
              onComplete={(score) => {
                setFinalScore(score)
                setCompleted(true)
              }}
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="rounded-2xl border border-foreground/10 bg-white/50 backdrop-blur-sm p-12 text-center space-y-8 shadow-sm">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Your Score</p>
                <p className="text-6xl font-bold tracking-tight text-primary">{finalScore}%</p>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {finalScore === 100
                  ? "Perfect! 🎉"
                  : finalScore >= 80
                    ? "Excellent Work! 🌟"
                    : finalScore >= 60
                      ? "Good Effort! 👍"
                      : "Keep Going! 💪"}
              </h2>
              <p className="text-foreground/60 text-sm">
                {lesson.items.filter((i) => i.isCorrect).length || 0} out of {lesson.items.length} correct
              </p>
              <div className="flex gap-3 justify-center flex-wrap pt-4">
                <Button
                  onClick={() => {
                    setGameStarted(false)
                    setCompleted(false)
                  }}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white font-medium gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Link href="/">
                  <Button variant="outline" size="sm" className="border-2 font-medium bg-transparent">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
