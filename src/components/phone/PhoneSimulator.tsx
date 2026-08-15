import React, { useState, useRef, useEffect } from 'react'
import {
  Wifi,
  Battery,
  Search,
  MessageCircle,
  Camera,
  Music,
  Compass,
  Settings,
  Sparkles,
  Zap,
  Leaf,
  Move,
} from 'lucide-react'
import { ScreenEffect, PlacedWidget, PhoneSettings } from '../../types/stellar'
import { AnimatedOverlayRenderer } from '../effects/AnimatedOverlays'

interface PhoneSimulatorProps {
  activeEffect: ScreenEffect | null
  placedWidgets: PlacedWidget[]
  onUpdateWidget?: (updated: PlacedWidget) => void
  onRemoveWidget?: (id: string) => void
  phoneSettings: PhoneSettings
  onUpdatePhoneSettings?: (settings: PhoneSettings) => void
  onTriggerEffect: (effect: ScreenEffect) => void
  presetEffects: ScreenEffect[]
  onOpenExportModal?: () => void
}

interface TouchParticle {
  id: number
  x: number
  y: number
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  activeEffect,
  placedWidgets,
  onUpdateWidget,
  phoneSettings,
  onTriggerEffect,
  presetEffects,
  onOpenExportModal,
}) => {
  const [currentTime, setCurrentTime] = useState('9:41')
  const [searchInput, setSearchInput] = useState('')
  const [touchParticles, setTouchParticles] = useState<TouchParticle[]>([])
  const [isTakeoverActive, setIsTakeoverActive] = useState(false)
  const [currentTakeoverEffect, setCurrentTakeoverEffect] = useState<ScreenEffect | null>(activeEffect)
  const [draggingWidgetId, setDraggingWidgetId] = useState<string | null>(null)
  const screenRef = useRef<HTMLDivElement>(null)

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setCurrentTime(`${hours % 12 || 12}:${minutes}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 10000)
    return () => clearInterval(timer)
  }, [])

  // Handle triggered effect changes
  useEffect(() => {
    if (activeEffect) {
      setCurrentTakeoverEffect(activeEffect)
      setIsTakeoverActive(true)
      const duration = (activeEffect.durationSec || 3.5) * 1000
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsTakeoverActive(false)
        }, duration)
        return () => clearTimeout(timer)
      }
    }
  }, [activeEffect])

  // Handle search triggers
  const handleSearchChange = (val: string) => {
    setSearchInput(val)
    const lower = val.toLowerCase().trim()
    if (!lower) return

    const matched = presetEffects.find((fx) =>
      fx.triggerKeywords.some((kw) => lower.includes(kw))
    )

    if (matched) {
      onTriggerEffect(matched)
    }
  }

  // Handle tap anywhere on phone to spawn particles
  const handlePhoneTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingWidgetId) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newParticle: TouchParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
    }

    setTouchParticles((prev) => [...prev.slice(-6), newParticle])

    setTimeout(() => {
      setTouchParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
    }, 900)
  }

  // Drag-and-drop widget repositioning directly on phone screen
  const handleWidgetMouseDown = (e: React.MouseEvent, widgetId: string) => {
    e.stopPropagation()
    setDraggingWidgetId(widgetId)
  }

  const handleScreenMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingWidgetId || !screenRef.current || !onUpdateWidget) return
    const rect = screenRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPercent = Math.max(15, Math.min(85, Math.round((mouseX / rect.width) * 100)))
    const yPercent = Math.max(15, Math.min(85, Math.round((mouseY / rect.height) * 100)))

    const widget = placedWidgets.find((w) => w.id === draggingWidgetId)
    if (widget) {
      onUpdateWidget({ ...widget, x: xPercent, y: yPercent })
    }
  }

  const handleScreenMouseUp = () => {
    setDraggingWidgetId(null)
  }

  const wallpaperClasses = {
    galaxy: 'bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#090d1f_50%,#030712_100%)]',
    cyber: 'bg-[radial-gradient(ellipse_at_bottom,#064e3b_0%,#022c22_30%,#090d16_100%)]',
    sunset: 'bg-gradient-to-b from-purple-950 via-rose-950 to-slate-950',
    anime: 'bg-gradient-to-b from-indigo-900 via-sky-950 to-slate-950',
    oled: 'bg-black',
    neoncity: 'bg-gradient-to-b from-fuchsia-950 via-purple-950 to-slate-950',
    minimal_dark: 'bg-[#0a0d16]',
    zen_sand: 'bg-gradient-to-b from-slate-900 via-stone-950 to-black',
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-2 relative select-none">
      {/* Phone Mockup Frame */}
      <div className="relative w-[340px] h-[680px] rounded-[48px] bg-slate-900 p-3.5 shadow-2xl shadow-cyan-950/60 ring-1 ring-white/20 border-4 border-slate-800 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Island / Android Punch Hole */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-4 h-6 rounded-full bg-black ring-1 ring-slate-800 shadow-md">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
            <Leaf className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-bold">Eco Battery Engine</span>
          </div>
        </div>

        {/* Outer Phone Screen Canvas */}
        <div
          ref={screenRef}
          onClick={handlePhoneTap}
          onMouseMove={handleScreenMouseMove}
          onMouseUp={handleScreenMouseUp}
          className={`relative flex-1 rounded-[38px] overflow-hidden flex flex-col justify-between p-4 cursor-pointer transition-colors duration-500 ${
            wallpaperClasses[phoneSettings.wallpaper]
          }`}
        >
          {/* Ambient Cosmic Grid */}
          <div className="absolute inset-0 cosmic-grid opacity-25 pointer-events-none" />

          {/* Status Bar */}
          <div className="relative z-40 flex items-center justify-between text-xs font-semibold text-white/90 px-1 pt-1">
            <span className="font-mono text-[11px]">{currentTime}</span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                0% DRAIN
              </span>
              <Wifi className="h-3.5 w-3.5" />
              <Battery className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Interactive TikTok-style Keyword Trigger Search Bar */}
          <div className="relative z-20 mt-4 px-1">
            <div className="relative flex items-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 shadow-lg">
              <Search className="h-3.5 w-3.5 text-slate-300 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search 'spiderman', 'clock', 'weather'..."
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-400 focus:outline-none font-sans"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Trigger Chips */}
            <div className="flex items-center justify-center gap-1.5 mt-1.5 overflow-x-auto py-1 scrollbar-none">
              {[
                { label: '🕷️ Spidey', id: 'fx-spider' },
                { label: '⚡ Beast', id: 'fx-beast' },
                { label: '⏰ Clock', id: 'fx-clock-cyber' },
                { label: '⛅ Weather', id: 'fx-weather-aurora' },
                { label: '🔋 Battery', id: 'fx-battery-plasma' },
              ].map((chip) => {
                const effect = presetEffects.find((fx) => fx.id === chip.id)
                return (
                  <button
                    key={chip.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (effect) onTriggerEffect(effect)
                    }}
                    className="rounded-full bg-slate-900/80 hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-400/40 px-2 py-0.5 text-[9px] font-medium text-slate-300 hover:text-cyan-300 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {chip.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Floating Placed Animated Widgets Layer (DRAG & DROP SUPPORTED) */}
          <div className="relative z-20 flex-1 my-1 pointer-events-none">
            {placedWidgets.map((w) => (
              <div
                key={w.id}
                onMouseDown={(e) => handleWidgetMouseDown(e, w.id)}
                className={`absolute pointer-events-auto transition-transform cursor-grab active:cursor-grabbing group ${
                  draggingWidgetId === w.id ? 'scale-105 ring-2 ring-cyan-400 rounded-2xl z-40' : ''
                }`}
                style={{
                  left: `${w.x}%`,
                  top: `${w.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                title="Drag to reposition widget"
              >
                <div className="relative rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 p-2 shadow-lg group-hover:border-cyan-400/60 transition-colors">
                  {/* Subtle drag handle indicator on hover */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Move className="h-3 w-3 text-cyan-300" />
                  </div>

                  <AnimatedOverlayRenderer
                    effectType={w.effectType}
                    primaryColor={w.primaryColor}
                    accentColor={w.accentColor}
                    scale={w.scale}
                    isWidget={true}
                    customText={w.customText}
                    tapCount={w.tapCount}
                  />
                  <div className="text-center font-mono text-[8px] text-cyan-300/80 mt-0.5 truncate max-w-[110px]">
                    {w.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Home Screen App Icons Grid */}
          <div className="relative z-20 grid grid-cols-4 gap-3 my-2 px-2">
            {[
              { label: 'Messages', icon: MessageCircle, color: 'bg-emerald-500' },
              { label: 'Camera', icon: Camera, color: 'bg-slate-700' },
              { label: 'Music', icon: Music, color: 'bg-rose-500' },
              { label: 'Compass', icon: Compass, color: 'bg-blue-500' },
            ].map((app, i) => {
              const Icon = app.icon
              return (
                <div key={i} className="flex flex-col items-center gap-1 group">
                  <div
                    className={`h-11 w-11 rounded-2xl ${app.color} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium">{app.label}</span>
                </div>
              )
            })}
          </div>

          {/* Bottom App Dock */}
          <div className="relative z-20 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 p-2 flex items-center justify-around shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Compass className="h-5 w-5" />
            </div>
            <div className="h-10 w-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <Music className="h-5 w-5" />
            </div>
            <div className="h-10 w-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-md">
              <Settings className="h-5 w-5" />
            </div>
          </div>

          {/* Active Full-Screen Animated Takeover Layer */}
          {isTakeoverActive && currentTakeoverEffect && (
            <AnimatedOverlayRenderer
              effectType={currentTakeoverEffect.effectType}
              primaryColor={currentTakeoverEffect.primaryColor}
              accentColor={currentTakeoverEffect.accentColor}
              glowColor={currentTakeoverEffect.glowColor}
              intensity={currentTakeoverEffect.settings.intensity}
              speed={currentTakeoverEffect.settings.speed}
              scale={currentTakeoverEffect.settings.scale}
            />
          )}

          {/* Interactive Tap Burst Particle Layer */}
          {touchParticles.map((pt) => (
            <div
              key={pt.id}
              className="absolute pointer-events-none z-50 animate-ping"
              style={{
                left: pt.x,
                top: pt.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Sparkles className="h-5 w-5 text-cyan-300 drop-shadow-[0_0_8px_#00f2fe]" />
            </div>
          ))}

          {/* Home Bar Indicator */}
          <div className="relative z-30 w-32 h-1 rounded-full bg-white/70 mx-auto mt-2" />
        </div>
      </div>

      {/* Simulator Bottom Actions Bar */}
      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-cyan-400 transition cursor-pointer"
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Apply to Real Physical Phone</span>
        </button>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
          <span className="hidden sm:inline">💡 Drag any widget on phone to move</span>
        </div>
      </div>
    </div>
  )
}
