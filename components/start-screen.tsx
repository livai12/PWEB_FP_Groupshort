"use client"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

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

interface StartScreenProps {
  title: string
  description: string
  items: Item[]
  groups: Group[]
  onStart: () => void
}

export function StartScreen({ title, description, items, groups, onStart }: StartScreenProps) {
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = () => {
    setIsStarting(true)
    setTimeout(onStart, 300)
  }

  // Shuffle and take first 8 items for preview
  const previewItems = [...items].sort(() => Math.random() - 0.5).slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-30 animate-float" />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Content wrapper */}
        <div className={`transition-all duration-500 ${isStarting ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
          {/* Preview items grid */}
          <div className="mb-12 overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur p-8 border border-slate-700 shadow-2xl">
            <div className="grid grid-cols-4 gap-3 mb-8">
              {previewItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center group hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  style={{
                    animation: `fade-in-up 0.5s cubic-bezier(0.32, 0.72, 0.3, 1) ${idx * 0.06}s both`,
                  }}
                >
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center w-full h-full">
                    {(item as any).icon || "📦"}
                  </div>
                </div>
              ))}
            </div>

            {/* Title and description */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest">Group Sort</p>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white text-balance leading-tight">
                  {title}
                </h1>
              </div>

              <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto">{description}</p>
            </div>
          </div>

          {/* Category preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {groups.map((group, idx) => (
              <div
                key={group.id}
                className="rounded-xl border border-slate-600 bg-slate-800/40 backdrop-blur p-6 text-center group hover:bg-slate-800/60 transition-all duration-300 hover:border-blue-400"
                style={{
                  animation: `fade-in-up 0.5s cubic-bezier(0.32, 0.72, 0.3, 1) ${0.4 + idx * 0.08}s both`,
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/30 mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-500/50 transition-colors duration-300">
                  <span className="text-2xl">✓</span>
                </div>
                <p className="font-semibold text-white text-sm">{group.title}</p>
              </div>
            ))}
          </div>

          {/* Start button */}
          <div className="flex justify-center">
            <button
              onClick={handleStart}
              className="relative group bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-blue-500/50 hover:shadow-2xl flex items-center gap-3 text-lg md:text-xl active:scale-95 overflow-hidden"
              style={{
                animation: `scale-in 0.6s cubic-bezier(0.32, 0.72, 0.3, 1) 0.6s both`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                START
              </span>
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-12 text-center text-slate-300 text-sm space-y-2">
            <p className="flex items-center justify-center gap-2">
              <span>Drag items to sort them into categories</span>
              <ChevronRight className="w-4 h-4" />
            </p>
            <p>All items must be sorted before you can submit</p>
          </div>
        </div>
      </div>
    </div>
  )
}
