"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Plus, X } from "lucide-react"
import { useState } from "react"

interface Group {
  id: string
  title: string
  color: string
}

interface Item {
  id: string
  text: string
  groupId: string
}

export default function CreateLessonPage() {
  const [lessonTitle, setLessonTitle] = useState("")
  const [groups, setGroups] = useState<Group[]>([
    { id: "1", title: "Group 1", color: "chart-1" },
    { id: "2", title: "Group 2", color: "chart-2" },
  ])
  const [items, setItems] = useState<Item[]>([])
  const [newItemText, setNewItemText] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState("1")
  const [showPreview, setShowPreview] = useState(false)

  const colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]

  const addGroup = () => {
    const newId = String(Math.max(...groups.map((g) => Number.parseInt(g.id)), 0) + 1)
    setGroups([
      ...groups,
      { id: newId, title: `Group ${groups.length + 1}`, color: colors[groups.length % colors.length] },
    ])
  }

  const updateGroup = (id: string, title: string) => {
    setGroups(groups.map((g) => (g.id === id ? { ...g, title } : g)))
  }

  const removeGroup = (id: string) => {
    if (groups.length > 1) {
      setGroups(groups.filter((g) => g.id !== id))
      setItems(items.filter((i) => i.groupId !== id))
      if (selectedGroupId === id) {
        setSelectedGroupId(groups[0].id)
      }
    }
  }

  const addItem = () => {
    if (newItemText.trim()) {
      const newId = String(Math.max(...items.map((i) => Number.parseInt(i.id)), 0) + 1)
      setItems([...items, { id: newId, text: newItemText, groupId: selectedGroupId }])
      setNewItemText("")
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const handleSave = () => {
    const lessonData = {
      title: lessonTitle,
      groups,
      items: items.map(({ id, text, groupId }) => ({ id, text, correctGroupId: groupId })),
    }
    console.log("Saved lesson:", lessonData)
    // Here you would typically save to a database
    alert("Lesson saved! (Check console for data)")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create New Lesson</h1>
          <Button onClick={handleSave} size="sm">
            Save Lesson
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Lesson Details</h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Enter lesson title"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </Card>

            {/* Groups */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Groups</h2>
                <Button onClick={addGroup} size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Plus className="w-4 h-4" />
                  Add Group
                </Button>
              </div>

              <div className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={group.title}
                      onChange={(e) => updateGroup(group.id, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Group name"
                    />
                    <div className={`w-8 h-8 rounded bg-${group.color} flex-shrink-0`} />
                    {groups.length > 1 && (
                      <Button
                        onClick={() => removeGroup(group.id)}
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Items */}
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">Items to Sort</h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Select Group</label>
                  <select
                    value={selectedGroupId}
                    onChange={(e) => setSelectedGroupId(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addItem()}
                    placeholder="Enter item text"
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button onClick={addItem} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>

              {items.length > 0 && (
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-medium text-foreground/60">{items.length} items added</p>
                  <div className="grid gap-2 max-h-64 overflow-y-auto">
                    {items.map((item) => {
                      const group = groups.find((g) => g.id === item.groupId)
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg bg-card border border-border"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-3 h-3 rounded-full bg-${group?.color} flex-shrink-0`} />
                            <span className="text-sm text-foreground truncate">{item.text}</span>
                            <span className="text-xs text-foreground/50 flex-shrink-0">{group?.title}</span>
                          </div>
                          <Button
                            onClick={() => removeItem(item.id)}
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Preview</h3>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-foreground/60">Title</p>
                    <p className="text-foreground font-medium">{lessonTitle || "(No title)"}</p>
                  </div>

                  <div>
                    <p className="text-foreground/60">Groups</p>
                    <div className="space-y-1 mt-1">
                      {groups.map((g) => (
                        <div key={g.id} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded bg-${g.color}`} />
                          <span className="text-foreground">{g.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-foreground/60">Items</p>
                    <p className="text-foreground font-medium">{items.length} items</p>
                  </div>
                </div>

                <Button onClick={() => setShowPreview(true)} className="w-full gap-2">
                  Preview Lesson
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
