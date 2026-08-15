import React, { useState, useEffect } from 'react'
import {
  X,
  Sparkles,
  Search,
} from 'lucide-react'
import { ScreenEffect } from '../../types/stellar'
import { AnimatedOverlayRenderer } from '../effects/AnimatedOverlays'

interface FullscreenTestModalProps {
  isOpen: boolean
  onClose: () => void
  presetEffects: ScreenEffect[]
  initialEffect?: ScreenEffect | null
}

interface TapParticle {
  id: number
  x: number
  y: number
}

export const FullscreenTestModal: React.FC<FullscreenTestModalProps> = ({
  isOpen,
  onClose,
  presetEffects,
  initialEffect,
}) => {
  const [activeEffect, setActiveEffect] = useState<ScreenEffect | null>(
    initialEffect || presetEffects[0]
  )
  const [isPlaying, setIsPlaying] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [tapParticles, setTapParticles] = useState<TapParticle[]>([])

  useEffect(() => {
    if (initialEffect) {
      setActiveEffect(initialEffect)
      setIsPlaying(true)
    }
  }, [initialEffect])

  if (!isOpen) return null

  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const newPt: TapParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    }
    setTapParticles((prev) => [...prev.slice(-10), newPt])
    setTimeout(() => {
      setTapParticles((prev) => prev.filter((p) => p.id !== newPt.id))
    }, 900)
  }

  const handleSearchTrigger = (val: string) => {
    setSearchQuery(val)
    const lower = val.toLowerCase().trim()
    const matched = presetEffects.find((fx) =>
      fx.triggerKeywords.some((kw) => lower.includes(kw))
    )
    if (matched) {
      setActiveEffect(matched)
      setIsPlaying(true)
    }
  }

  return (
    <div
      onClick={handleScreenTap}
      className="fixed inset-0 z-50 bg-[#030612] text-white flex flex-col justify-between overflow-hidden cursor-crosshair select-none"
    >
      {/* Background Starfield */}
      <div className="absolute inset-0 cosmic-grid opacity-30 pointer-events-none" />

      {/* Top Floating Controls Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 flex items-center justify-between p-4 bg-slate-950/60 backdrop-blur-lg border-b border-white/10"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
            <span className="font-display font-bold text-sm tracking-wide">
              Fullscreen Phone Showcase
            </span>
          </div>

          {/* Quick Effect Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 ml-4">
            {presetEffects.map((fx) => (
              <button
                key={fx.id}
                onClick={() => {
                  setActiveEffect(fx)
                  setIsPlaying(true)
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                  activeEffect?.id === fx.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {fx.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Search Trigger Input */}
        <div className="flex items-center gap-2">
          <div className="relative hidden md:flex items-center rounded-xl bg-white/10 border border-white/15 px-3 py-1.5 text-xs">
            <Search className="h-3.5 w-3.5 text-slate-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchTrigger(e.target.value)}
              placeholder="Search 'spiderman', 'beast'..."
              className="bg-transparent text-xs text-white placeholder:text-slate-400 focus:outline-none w-48 font-sans"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Center Canvas: Full Screen Takeover Animation */}
      <div className="relative flex-1 flex items-center justify-center pointer-events-none">
        {isPlaying && activeEffect && (
          <AnimatedOverlayRenderer
            effectType={activeEffect.effectType}
            primaryColor={activeEffect.primaryColor}
            accentColor={activeEffect.accentColor}
            glowColor={activeEffect.glowColor}
            intensity={activeEffect.settings.intensity}
            speed={activeEffect.settings.speed}
            scale={activeEffect.settings.scale * 1.2}
          />
        )}

        {/* Center Prompt */}
        <div className="text-center space-y-2 opacity-50 pointer-events-none">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">
            [ TAP ANYWHERE TO SPAWN PARTICLES // TRIGGER ANIMATION ]
          </p>
        </div>
      </div>

      {/* Tap Bursts */}
      {tapParticles.map((pt) => (
        <div
          key={pt.id}
          className="absolute pointer-events-none z-50 animate-ping"
          style={{
            left: pt.x,
            top: pt.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Sparkles className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_12px_#00f2fe]" />
        </div>
      ))}

      {/* Bottom Information Tip */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 flex items-center justify-between p-3 bg-slate-950/70 backdrop-blur-lg border-t border-white/10 text-xs text-slate-400 font-mono"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>NOW PLAYING: {activeEffect?.name.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-semibold cursor-pointer"
          >
            {isPlaying ? 'Pause FX' : 'Replay FX'}
          </button>
        </div>
      </div>
    </div>
  )
}
