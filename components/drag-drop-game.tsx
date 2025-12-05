"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play, Check } from "lucide-react"

interface Item {
  id: string
  text: string
  correctGroupId: string
  image?: string
  icon?: string
}

interface Group {
  id: string
  title: string
  color: string
}

interface DragDropGameProps {
  title: string
  items: Item[]
  groups: Group[]
  onComplete?: (score: number) => void
}

export function DragDropGame({ title, items, groups, onComplete }: DragDropGameProps) {
  const [gameItems, setGameItems] = useState<(Item & { currentGroupId?: string; isCorrect?: boolean })[]>([])
  const [gameState, setGameState] = useState<"playing" | "submitted" | "completed">("playing")
  const [score, setScore] = useState(0)
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null)
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null)
  const [draggedOverGroup, setDraggedOverGroup] = useState<string | null>(null)
  const [selectedItemImage, setSelectedItemImage] = useState<string | null>(null)
  const [copyFeedback, setCopyFeedback] = useState(false)
  const gameRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const shuffled = [...items]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({
        ...item,
        currentGroupId: undefined,
        isCorrect: undefined,
      }))
    setGameItems(shuffled)
    // Set first item image as selected
    if (shuffled.length > 0 && shuffled[0].image) {
      setSelectedItemImage(shuffled[0].image)
    }
  }, [items])

  const handleCopyImage = async () => {
    if (!imageRef.current) return
    
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = async () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ])
            setCopyFeedback(true)
            setTimeout(() => setCopyFeedback(false), 2000)
          }
        })
      }
      
      img.src = selectedItemImage || ''
    } catch (err) {
      console.error('Failed to copy image:', err)
    }
  }

  const handleDragStart = (itemId: string, fromGroup?: string) => {
    setDraggedItemId(itemId)
    setDraggedFrom(fromGroup || "bank")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDropOnGroup = (groupId: string) => {
    if (!draggedItemId) return

    setGameItems((prev) =>
      prev.map((item) => {
        if (item.id === draggedItemId) {
          return { ...item, currentGroupId: groupId }
        }
        return item
      }),
    )

    setDraggedItemId(null)
    setDraggedFrom(null)
    setDraggedOverGroup(null)
  }

  const handleDropOnBank = () => {
    if (!draggedItemId) return

    setGameItems((prev) =>
      prev.map((item) => {
        if (item.id === draggedItemId) {
          return { ...item, currentGroupId: undefined }
        }
        return item
      }),
    )

    setDraggedItemId(null)
    setDraggedFrom(null)
    setDraggedOverGroup(null)
  }

  const handleSubmit = () => {
    let correctCount = 0
    const updatedItems = gameItems.map((item) => {
      const isCorrect = item.currentGroupId === item.correctGroupId
      if (isCorrect) correctCount++
      return { ...item, isCorrect }
    })

    setGameItems(updatedItems)
    const percentage = Math.round((correctCount / items.length) * 100)
    setScore(percentage)
    setGameState("submitted")
  }

  const handleReset = () => {
    const shuffled = [...items]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({
        ...item,
        currentGroupId: undefined,
        isCorrect: undefined,
      }))
    setGameItems(shuffled)
    setGameState("playing")
    setScore(0)
  }

  const handleComplete = () => {
    setGameState("completed")
    onComplete?.(score)
  }

  const unplacedItems = gameItems.filter((item) => !item.currentGroupId)
  const allPlaced = unplacedItems.length === 0
  const allCorrect = gameItems.every((item) => item.isCorrect)

  return (
    <div className="space-y-6 relative" ref={gameRef}>
      <div className="animate-slide-in-left">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="text-foreground/60 text-sm font-medium">Drag items to the correct category</p>
        </div>
      </div>

      {/* Large Image Display */}
      {selectedItemImage && (
        <div className="animate-fade-in-up bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="relative group">
            <img
              ref={imageRef}
              src={selectedItemImage}
              alt="Current item"
              className="max-h-64 max-w-full object-contain rounded-lg shadow-lg"
            />
            <button
              onClick={handleCopyImage}
              className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary/90"
            >
              {copyFeedback ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDropOnBank}
            className={`group-container p-6 min-h-96 space-y-3 transition-all duration-300 ${
              draggedOverGroup === "bank" ? "drag-over" : ""
            }`}
          >
            <h3 className="font-semibold text-foreground/80 text-sm uppercase tracking-wider mb-4">Items</h3>
            <div className="space-y-2">
              {unplacedItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  onDragEnd={() => {
                    setDraggedItemId(null)
                    setDraggedFrom(null)
                    setDraggedOverGroup(null)
                  }}
                  onClick={() => item.image && setSelectedItemImage(item.image)}
                  className="cursor-move transition-all duration-200 select-none hover:ring-2 hover:ring-primary rounded-lg"
                  style={{
                    animation: `fade-in-up 0.4s cubic-bezier(0.32, 0.72, 0.3, 1) ${index * 0.05}s both`,
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "scale(1.02)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = "scale(1)"
                  }}
                >
                  <div className="item-card h-28 flex items-end justify-center group hover:shadow-lg">
                    {item.image ? (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.text}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex flex-col items-center justify-center gap-2">
                        <div className="text-4xl">{item.icon || "📦"}</div>
                      </div>
                    )}
                    <div className="item-label">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
            {unplacedItems.length === 0 && (
              <div className="text-center py-12 text-foreground/40 animate-subtle-pulse">
                <p className="text-sm font-medium">All items sorted</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {groups.map((group, groupIdx) => {
            const groupItems = gameItems.filter((item) => item.currentGroupId === group.id)
            const isHovered = draggedOverGroup === group.id

            return (
              <div
                key={group.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.15 + groupIdx * 0.08}s` }}
              >
                <div
                  onDragOver={(e) => {
                    handleDragOver(e)
                    setDraggedOverGroup(group.id)
                  }}
                  onDragLeave={() => setDraggedOverGroup(null)}
                  onDrop={() => {
                    handleDropOnGroup(group.id)
                  }}
                  className={`group-container p-6 min-h-40 transition-all duration-200 ${
                    gameState === "submitted"
                      ? "border-foreground/10"
                      : isHovered
                        ? "drag-over"
                        : groupItems.length > 0
                          ? "has-items"
                          : ""
                  }`}
                  style={
                    groupItems.length > 0 && !isHovered
                      ? {
                          borderColor: `rgba(82, 109, 255, 0.4)`,
                          backgroundColor: "rgba(82, 109, 255, 0.08)",
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        isHovered ? "w-4 h-4 shadow-md" : ""
                      }`}
                      style={{
                        backgroundColor: `rgba(82, 109, 255, 0.6)`,
                      }}
                    />
                    <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">{group.title}</h3>
                    {groupItems.length > 0 && (
                      <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-foreground/10 text-foreground/60">
                        {groupItems.length}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {groupItems.map((item, itemIdx) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item.id, group.id)}
                        onDragEnd={() => {
                          setDraggedItemId(null)
                          setDraggedFrom(null)
                          setDraggedOverGroup(null)
                        }}
                        className="cursor-move transition-all duration-200 select-none"
                        style={{
                          animation: `scale-in 0.3s cubic-bezier(0.32, 0.72, 0.3, 1) ${itemIdx * 0.05}s both`,
                          transform: "scale(1)",
                        }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.transform = "scale(1.05)"
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.transform = "scale(1)"
                        }}
                      >
                        <div className="item-card h-24 relative hover:shadow-md">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.text}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                              <span className="text-2xl">{item.icon || "📦"}</span>
                            </div>
                          )}
                          <div className="item-label">{item.text}</div>

                          {gameState === "submitted" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <span className="text-2xl animate-scale-in">{item.isCorrect ? "✓" : "✕"}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center rounded-xl border border-foreground/10 bg-white/50 backdrop-blur-sm p-6 animate-fade-in-up shadow-sm">
        <div className="text-center sm:text-left">
          {gameState === "playing" && (
            <p className="text-sm font-medium text-foreground/60">
              {unplacedItems.length} item{unplacedItems.length !== 1 ? "s" : ""} remaining
            </p>
          )}
          {gameState === "submitted" && (
            <div className="space-y-1">
              <p className="text-3xl font-bold tracking-tight text-foreground">{score}%</p>
              <p className="text-xs font-medium text-foreground/60">
                {gameItems.filter((i) => i.isCorrect).length} out of {items.length} correct
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {(gameState === "playing" || gameState === "submitted") && (
            <Button onClick={handleReset} variant="outline" size="sm" className="gap-2 bg-transparent">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          )}

          {gameState === "playing" && (
            <Button
              onClick={handleSubmit}
              disabled={!allPlaced}
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 text-white font-medium disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              Submit
            </Button>
          )}

          {gameState === "submitted" && (
            <Button
              onClick={handleComplete}
              size="sm"
              className={`gap-2 text-white font-medium ${
                allCorrect ? "bg-chart-1 hover:bg-chart-1/90" : "bg-primary hover:bg-primary/90"
              }`}
            >
              <Check className="w-4 h-4" />
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
