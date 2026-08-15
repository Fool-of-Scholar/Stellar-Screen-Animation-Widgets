import React, { useState } from 'react'
import {
  Star,
  Play,
  Plus,
  TrendingUp,
  Clock,
  CloudSun,
  Flame,
  Battery,
  Quote,
  Activity,
  Compass,
  Cpu,
  Music,
  Zap,
  Sparkles,
  Search,
} from 'lucide-react'
import { ScreenEffect } from '../../types/stellar'
import { AnimatedOverlayRenderer } from '../effects/AnimatedOverlays'

interface TrendingLibraryProps {
  effects: ScreenEffect[]
  onSelectEffect: (effect: ScreenEffect) => void
  onAddAsWidget: (effect: ScreenEffect) => void
  activeEffectId?: string
}

export const TrendingLibrary: React.FC<TrendingLibraryProps> = ({
  effects,
  onSelectEffect,
  onAddAsWidget,
  activeEffectId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories: { id: string; label: string; icon: any }[] = [
    { id: 'ALL', label: 'All Assets', icon: Sparkles },
    { id: 'clocks', label: 'Clocks', icon: Clock },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'anime_characters', label: 'Anime & Shows', icon: Flame },
    { id: 'battery_device', label: 'Battery & Device', icon: Battery },
    { id: 'fitness_steps', label: 'Fitness & Steps', icon: Activity },
    { id: 'quotes_facts', label: 'Quotes & Mindset', icon: Quote },
    { id: 'tools_utility', label: 'Compass & Calc', icon: Compass },
    { id: 'quick_shortcuts', label: 'Shortcuts & AI', icon: Cpu },
    { id: 'music_media', label: 'Music & Media', icon: Music },
    { id: 'popups_takeovers', label: 'Viral Pop-Ups', icon: Zap },
  ]

  const filtered = effects.filter((fx) => {
    // category filter
    if (selectedCategory !== 'ALL' && fx.category !== selectedCategory) {
      return false
    }
    // search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchesName = fx.name.toLowerCase().includes(q)
      const matchesKeywords = fx.triggerKeywords.some((kw) => kw.includes(q))
      const matchesTag = fx.inspirationTag.toLowerCase().includes(q)
      if (!matchesName && !matchesKeywords && !matchesTag) return false
    }
    return true
  })

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5">
      {/* Header & Theme Mission */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <span>Animated Assets & Widgets Library</span>
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-semibold">
              ⚡ BATTERY EFFICIENT • NO KWGT
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5 max-w-2xl leading-relaxed">
            Explore elegant animated assets to create a clean, personalized home screen on any Android device. Blends seamlessly with your apps without draining battery.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clocks, anime, weather..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isSelected = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((effect) => {
          const isActive = effect.id === activeEffectId

          return (
            <div
              key={effect.id}
              className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between backdrop-blur-md ${
                isActive
                  ? 'border-cyan-400 bg-[#0E1530] ring-2 ring-cyan-400/40 shadow-xl shadow-cyan-950/60'
                  : 'border-slate-800 bg-[#090D20]/80 hover:border-slate-700 hover:bg-[#0C122B]'
              }`}
            >
              {/* Preview Animation Container */}
              <div className="relative h-44 w-full bg-[#050711] overflow-hidden flex items-center justify-center border-b border-slate-800/70">
                <div className="absolute inset-0 cosmic-grid opacity-30 pointer-events-none" />

                {/* Animated Overlay Preview */}
                <div className="relative w-full h-full flex items-center justify-center p-3">
                  <AnimatedOverlayRenderer
                    effectType={effect.effectType}
                    primaryColor={effect.primaryColor}
                    accentColor={effect.accentColor}
                    glowColor={effect.glowColor}
                    intensity={effect.settings.intensity}
                    speed={effect.settings.speed}
                    scale={0.9}
                    isWidget={true}
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 font-mono text-[10px]">
                  {effect.badge && (
                    <span className="rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 font-bold shadow-xs">
                      {effect.badge}
                    </span>
                  )}
                  <span className="rounded-md bg-slate-900/90 text-slate-300 border border-slate-700 px-2 py-0.5">
                    {effect.inspirationTag}
                  </span>
                </div>

                {/* Battery efficiency badge */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-mono">
                  <Zap className="h-3 w-3" />
                  <span>Ultra-Low Drain</span>
                </div>
              </div>

              {/* Card Meta & Info */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {effect.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span>{effect.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {effect.description}
                  </p>

                  {/* Trigger Keywords Chips */}
                  <div className="pt-2 flex flex-wrap gap-1">
                    {effect.triggerKeywords.slice(0, 3).map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-cyan-400/90 border border-slate-800"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectEffect(effect)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/25 transition cursor-pointer shadow-xs"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Test on Phone</span>
                  </button>

                  <button
                    onClick={() => onAddAsWidget(effect)}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-semibold text-white transition cursor-pointer shadow-md shadow-purple-900/40"
                    title="Add as Home Screen Widget"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>+ Add Widget</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
