import React, { useState } from 'react'
import {
  Sparkles,
  Play,
  Save,
  Plus,
  Check,
  Zap,
  Leaf,
  Clock,
  CloudSun,
  Flame,
  Battery,
  Activity,
  Compass,
  Music,
  Quote,
} from 'lucide-react'
import { ScreenEffect, EffectType, WidgetCategory } from '../../types/stellar'

interface AnimationStudioProps {
  onSaveEffect: (effect: ScreenEffect) => void
  onTestEffect: (effect: ScreenEffect) => void
  onAddAsWidget: (effect: ScreenEffect) => void
}

export const AnimationStudio: React.FC<AnimationStudioProps> = ({
  onSaveEffect,
  onTestEffect,
  onAddAsWidget,
}) => {
  const [name, setName] = useState('My Custom Android Asset')
  const [category, setCategory] = useState<WidgetCategory>('clocks')
  const [effectType, setEffectType] = useState<EffectType>('clock_digital_cyber')
  const [primaryColor, setPrimaryColor] = useState('#00F2FE')
  const [accentColor, setAccentColor] = useState('#7928CA')
  const [glowColor, setGlowColor] = useState('#EC4899')
  const [triggerInput, setTriggerInput] = useState('stellar, custom, widget')
  const [customText, setCustomText] = useState('CYBER DREAMS')
  const [speed, setSpeed] = useState(1.0)
  const [scale, setScale] = useState(1.0)
  const [bloom, setBloom] = useState(70)
  const [batteryMode, setBatteryMode] = useState<'ultra_low_battery' | 'eco_60fps'>('ultra_low_battery')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const templateTypes: { type: EffectType; label: string; icon: any; cat: WidgetCategory }[] = [
    // Clocks
    { type: 'clock_digital_cyber', label: 'Cyber Digital Clock', icon: Clock, cat: 'clocks' },
    { type: 'clock_world_orbital', label: 'Orbital World Clock', icon: Clock, cat: 'clocks' },
    { type: 'clock_minimal_neon', label: 'Neon Minimal Clock', icon: Clock, cat: 'clocks' },
    // Weather
    { type: 'weather_aurora_forecast', label: 'Aurora Weather', icon: CloudSun, cat: 'weather' },
    { type: 'weather_storm_radar', label: 'Doppler Radar Storm', icon: CloudSun, cat: 'weather' },
    // Anime & Characters
    { type: 'anime_aura', label: 'Saiyan Ki Aura', icon: Flame, cat: 'anime_characters' },
    { type: 'anime_chibi_companion', label: 'Chibi Companion', icon: Flame, cat: 'anime_characters' },
    { type: 'spider_hero', label: 'Web Slinger Hero', icon: Flame, cat: 'anime_characters' },
    { type: 'lightning_beast', label: 'Thunder Beast Surge', icon: Flame, cat: 'anime_characters' },
    // Battery & Device Info
    { type: 'battery_plasma_arc', label: 'Plasma Arc Battery', icon: Battery, cat: 'battery_device' },
    { type: 'device_hud_telemetry', label: 'Device Telemetry HUD', icon: Battery, cat: 'battery_device' },
    // Fitness & Steps
    { type: 'fitness_rings_pulse', label: 'Pulse Activity Rings', icon: Activity, cat: 'fitness_steps' },
    { type: 'step_counter_odometer', label: 'Step Counter Odometer', icon: Activity, cat: 'fitness_steps' },
    // Tools
    { type: 'compass_gyro_sphere', label: '3D Gyro Compass', icon: Compass, cat: 'tools_utility' },
    { type: 'quick_calc_floating', label: 'Floating Mini Calc', icon: Compass, cat: 'tools_utility' },
    // Music & Media
    { type: 'audio_visualizer', label: 'Reactive EQ Waves', icon: Music, cat: 'music_media' },
    { type: 'vinyl_player_spin', label: 'Retro Vinyl Player', icon: Music, cat: 'music_media' },
    { type: 'mini_tap_game', label: 'Cosmic Clicker Game', icon: Sparkles, cat: 'quick_shortcuts' },
    { type: 'ai_assistant_orb', label: 'Gemini Assistant Core', icon: Sparkles, cat: 'quick_shortcuts' },
    { type: 'neon_text_glitch', label: 'Custom Neon Sign', icon: Quote, cat: 'themed_text' },
    { type: 'supernova', label: 'Cosmic Supernova', icon: Sparkles, cat: 'popups_takeovers' },
  ]

  const colorPresets = [
    { name: 'Cosmic Cyan', primary: '#00F2FE', accent: '#3B82F6', glow: '#7928CA' },
    { name: 'Emerald Clean', primary: '#10B981', accent: '#06B6D4', glow: '#3B82F6' },
    { name: 'Spider Crimson', primary: '#EF4444', accent: '#3B82F6', glow: '#F59E0B' },
    { name: 'Golden Saiyan', primary: '#FBBF24', accent: '#F59E0B', glow: '#EF4444' },
    { name: 'Sakura Rose', primary: '#F472B6', accent: '#FB7185', glow: '#FEE2E2' },
    { name: 'Deep Purple Neo', primary: '#A855F7', accent: '#EC4899', glow: '#8B5CF6' },
  ]

  const currentEffect: ScreenEffect = {
    id: `custom-${Date.now()}`,
    name,
    category,
    effectType,
    inspirationTag: 'Custom Creator',
    triggerKeywords: triggerInput.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
    primaryColor,
    accentColor,
    glowColor,
    durationSec: category === 'popups_takeovers' ? 3.5 : 0,
    description: `Clean, modern animated asset customized for your home screen.`,
    rating: 5.0,
    downloads: '1',
    isTrending: false,
    efficiencyMode: batteryMode,
    settings: {
      intensity: 80,
      speed,
      scale,
      screenShake: false,
      bloom,
      particlesCount: batteryMode === 'ultra_low_battery' ? 12 : 28,
    },
  }

  const handleSave = () => {
    onSaveEffect(currentEffect)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span>Animated Asset Creator Studio</span>
            </h2>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
              <Leaf className="h-3 w-3" />
              <span>BATTERY-SMART ENGINE</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Craft customized animated clocks, weather widgets, anime companions, and device monitors with zero battery drain.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTestEffect(currentEffect)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition cursor-pointer"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Test On Phone</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-indigo-500 transition cursor-pointer"
          >
            {savedSuccess ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            <span>{savedSuccess ? 'Saved!' : 'Save Asset'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Config */}
        <div className="space-y-5">
          {/* Identity & Custom Text */}
          <div className="rounded-2xl border border-slate-800 bg-[#0C1024] p-4 space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
              1. Asset Identity & Custom Text
            </h3>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Widget Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cyber Clock & Weather"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Custom Text / Motto Displayed</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. FOCUS ON GOALS"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Search Hotword Trigger (Type in phone search)
              </label>
              <input
                type="text"
                value={triggerInput}
                onChange={(e) => setTriggerInput(e.target.value)}
                placeholder="clock, custom, hero"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Template Selection */}
          <div className="rounded-2xl border border-slate-800 bg-[#0C1024] p-4 space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
              2. Select Animated Component Base
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
              {templateTypes.map((t) => {
                const Icon = t.icon
                const isSelected = effectType === t.type
                return (
                  <button
                    key={t.type}
                    onClick={() => {
                      setEffectType(t.type)
                      setCategory(t.cat)
                    }}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400/40 shadow-xs'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs font-medium truncate">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="rounded-2xl border border-slate-800 bg-[#0C1024] p-4 space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
              3. Color Theme & Glow
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {colorPresets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setPrimaryColor(p.primary)
                    setAccentColor(p.accent)
                    setGlowColor(p.glow)
                  }}
                  className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition cursor-pointer flex items-center justify-between"
                >
                  <span className="text-[11px] text-slate-300 font-medium truncate">{p.name}</span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.primary }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accent }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Battery & Dynamics */}
        <div className="space-y-5">
          {/* Battery Efficiency Mode Settings */}
          <div className="rounded-2xl border border-emerald-500/30 bg-[#08121C] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Zap className="h-4 w-4" />
                <span>Battery & Performance Optimization</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                0% IDLE DRAIN
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Every asset automatically pauses particle calculations when the phone is locked or viewing other apps, ensuring all-day battery endurance.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setBatteryMode('ultra_low_battery')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col gap-1 transition cursor-pointer ${
                  batteryMode === 'ultra_low_battery'
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-400'
                    : 'border-slate-800 bg-slate-900 text-slate-400'
                }`}
              >
                <span>🍃 Ultra Eco Mode</span>
                <span className="text-[10px] font-mono font-normal opacity-80">&lt; 0.5% battery per day</span>
              </button>

              <button
                onClick={() => setBatteryMode('eco_60fps')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col gap-1 transition cursor-pointer ${
                  batteryMode === 'eco_60fps'
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400'
                    : 'border-slate-800 bg-slate-900 text-slate-400'
                }`}
              >
                <span>⚡ 60FPS Fluid Mode</span>
                <span className="text-[10px] font-mono font-normal opacity-80">Smooth 60fps dynamic aura</span>
              </button>
            </div>
          </div>

          {/* Dynamic Sliders */}
          <div className="rounded-2xl border border-slate-800 bg-[#0C1024] p-4 space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
              4. Animation Physics & Sizing
            </h3>

            {/* Scale Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Widget Size Scale</span>
                <span className="text-emerald-400 font-semibold">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.4"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Speed Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Animation Speed</span>
                <span className="text-cyan-400 font-semibold">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Bloom Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Luminescence Glow</span>
                <span className="text-amber-400 font-semibold">{bloom}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={bloom}
                onChange={(e) => setBloom(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Quick Action Deployment Box */}
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#0E1530] to-[#0A0E22] p-4 space-y-3">
            <h3 className="font-display text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Ready to Place on Your Phone?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Test your animation live on the phone simulator, or place it directly as an animated floating widget on your home screen.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                onClick={() => onTestEffect(currentEffect)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 px-4 py-2.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/30 transition cursor-pointer"
              >
                <Play className="h-4 w-4" />
                <span>Play Live On Phone</span>
              </button>

              <button
                onClick={() => onAddAsWidget(currentEffect)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add As Home Widget</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
