import React, { useState, useEffect } from 'react'
import {
  CloudSun,
  Quote,
  Activity,
  Sparkles,
  Zap,
} from 'lucide-react'
import { EffectType } from '../../types/stellar'

interface OverlayProps {
  effectType: EffectType
  primaryColor?: string
  accentColor?: string
  glowColor?: string
  intensity?: number
  speed?: number
  scale?: number
  isWidget?: boolean
  customText?: string
  tapCount?: number
  onInteractiveTap?: () => void
}

export const AnimatedOverlayRenderer: React.FC<OverlayProps> = ({
  effectType,
  primaryColor = '#00F2FE',
  accentColor = '#7928CA',
  glowColor = '#EC4899',
  speed = 1.0,
  scale = 1.0,
  isWidget = false,
  customText,
  tapCount = 0,
  onInteractiveTap,
}) => {
  const durationModifier = 1 / Math.max(0.3, speed)
  const [liveTime, setLiveTime] = useState({ hour: '09', min: '41', sec: '28' })
  const [calcInput, setCalcInput] = useState('42.8')
  const [localTap, setLocalTap] = useState(tapCount)

  // Real second tick for live clock widgets
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setLiveTime({
        hour: String(now.getHours() % 12 || 12).padStart(2, '0'),
        min: String(now.getMinutes()).padStart(2, '0'),
        sec: String(now.getSeconds()).padStart(2, '0'),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  switch (effectType) {
    // ----------------------------------------------------
    // 1. CLOCKS (DIGITAL, WORLD, MINIMAL)
    // ----------------------------------------------------
    case 'clock_digital_cyber':
      return (
        <div
          className="flex flex-col items-center justify-center p-2 select-none"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="flex items-center gap-1 font-mono font-black tracking-wider text-white">
            <span
              className="text-2xl drop-shadow-md px-1.5 py-0.5 rounded-lg bg-black/40 border border-white/10"
              style={{ color: primaryColor }}
            >
              {liveTime.hour}
            </span>
            <span className="text-xl animate-pulse text-cyan-400">:</span>
            <span
              className="text-2xl drop-shadow-md px-1.5 py-0.5 rounded-lg bg-black/40 border border-white/10"
              style={{ color: primaryColor }}
            >
              {liveTime.min}
            </span>
            <span
              className="text-xs px-1 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold ml-0.5"
            >
              {liveTime.sec}s
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 font-mono text-[9px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SYNCED</span>
            </span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">FRI, AUG 14</span>
          </div>
        </div>
      )

    case 'clock_world_orbital':
      return (
        <div
          className="relative flex items-center justify-center p-2 select-none"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Orbital Planet Rings */}
          <div
            className="w-20 h-20 rounded-full border border-dashed animate-spin-slow flex items-center justify-center relative"
            style={{ borderColor: primaryColor, animationDuration: `${20 * durationModifier}s` }}
          >
            <div
              className="absolute -top-1 w-2.5 h-2.5 rounded-full shadow-md"
              style={{ backgroundColor: accentColor }}
            />
            {/* Inner Ring */}
            <div
              className="w-14 h-14 rounded-full border border-dotted animate-spin-reverse-slow flex flex-col items-center justify-center"
              style={{ borderColor: accentColor, animationDuration: `${12 * durationModifier}s` }}
            >
              <span className="text-[10px] font-mono font-bold text-white leading-none">
                {liveTime.hour}:{liveTime.min}
              </span>
              <span className="text-[7px] font-mono text-cyan-300 mt-0.5">LONDON/TYO</span>
            </div>
          </div>
        </div>
      )

    case 'clock_minimal_neon':
      return (
        <div
          className="relative flex items-center justify-center p-2 select-none"
          style={{ transform: `scale(${scale})` }}
        >
          <div
            className="w-16 h-16 rounded-full border-2 p-1 flex items-center justify-center relative shadow-lg"
            style={{ borderColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}40` }}
          >
            {/* Hour hand */}
            <div
              className="absolute w-0.5 h-4 bg-white rounded-full origin-bottom top-4"
              style={{ transform: 'rotate(75deg)' }}
            />
            {/* Minute hand */}
            <div
              className="absolute w-0.5 h-6 bg-rose-400 rounded-full origin-bottom top-2"
              style={{ transform: 'rotate(210deg)' }}
            />
            {/* Center Pin */}
            <div className="w-2 h-2 rounded-full bg-white shadow-md z-10" />
          </div>
        </div>
      )

    // ----------------------------------------------------
    // 2. WEATHER (AURORA, RADAR)
    // ----------------------------------------------------
    case 'weather_aurora_forecast':
      return (
        <div
          className="flex items-center gap-3 p-2 select-none relative overflow-hidden rounded-xl"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Animated Aurora Shimmer */}
          <div
            className="absolute inset-0 opacity-40 blur-md pointer-events-none"
            style={{
              background: `linear-gradient(45deg, ${primaryColor} 0%, ${accentColor} 50%, #06B6D4 100%)`,
              animation: `laser-scan ${4 * durationModifier}s ease infinite`,
            }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <CloudSun className="h-6 w-6 text-amber-300 drop-shadow-md animate-bounce" />
            <span className="text-sm font-bold font-mono text-white mt-0.5">24°C</span>
          </div>
          <div className="relative z-10 flex flex-col">
            <span className="text-[11px] font-bold text-slate-100">Partly Clear</span>
            <span className="text-[9px] font-mono text-cyan-300">Humidity: 48% • H:28° L:19°</span>
          </div>
        </div>
      )

    case 'weather_storm_radar':
      return (
        <div
          className="relative flex items-center justify-center p-2 select-none"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Radar Sweep Circle */}
          <div className="w-18 h-18 rounded-full border border-cyan-500/40 relative overflow-hidden bg-slate-950 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(0,242,254,0.4)_360deg)] animate-spin-slow"
              style={{ animationDuration: `${2.5 * durationModifier}s` }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <Zap className="h-4 w-4 text-cyan-300 animate-ping" />
              <span className="text-[8px] font-mono text-white font-bold mt-1">NO RAIN</span>
            </div>
          </div>
        </div>
      )

    // ----------------------------------------------------
    // 3. ANIME & CHARACTERS IN A SHOW
    // ----------------------------------------------------
    case 'anime_chibi_companion':
      return (
        <div
          onClick={() => {
            setLocalTap((prev) => prev + 1)
            onInteractiveTap?.()
          }}
          className="relative flex flex-col items-center justify-center p-2 select-none cursor-pointer group"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Animated Floating Chibi Creature */}
          <div
            className="w-14 h-14 rounded-2xl p-1 relative flex flex-col items-center justify-center shadow-xl transition-transform active:scale-90 animate-float-particles"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}40)`,
              border: `1.5px solid ${primaryColor}80`,
              boxShadow: `0 0 20px ${primaryColor}40`,
            }}
          >
            {/* Cute Cat Ears */}
            <div className="absolute -top-2 flex justify-between w-9">
              <div className="w-2.5 h-2.5 bg-rose-400 rounded-tl-md transform -rotate-12" />
              <div className="w-2.5 h-2.5 bg-rose-400 rounded-tr-md transform rotate-12" />
            </div>
            {/* Eyes */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2.5 rounded-full bg-white flex items-center justify-center">
                <div className="w-1 h-1.5 rounded-full bg-slate-950" />
              </div>
              <div className="w-2 h-2.5 rounded-full bg-white flex items-center justify-center">
                <div className="w-1 h-1.5 rounded-full bg-slate-950" />
              </div>
            </div>
            {/* Blush */}
            <div className="flex justify-between w-8 mt-0.5">
              <div className="w-1.5 h-1 rounded-full bg-rose-400/80" />
              <div className="w-1.5 h-1 rounded-full bg-rose-400/80" />
            </div>
            {/* Mouth */}
            <span className="text-[8px] leading-none text-white font-mono">3</span>
          </div>
          <span className="text-[8px] font-mono text-cyan-300 mt-1 font-bold">
            ❤️ Taps: {localTap}
          </span>
        </div>
      )

    case 'spider_hero':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-30 animate-pulse">
          {/* Spider-Sense Electric Radiance Arcs */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <svg width="280" height="100" viewBox="0 0 200 100" className="animate-ping">
              <path
                d="M 100 80 Q 70 30, 20 10 M 100 80 Q 80 20, 60 0 M 100 80 Q 100 10, 100 0 M 100 80 Q 120 20, 140 0 M 100 80 Q 130 30, 180 10"
                fill="none"
                stroke={glowColor}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
                style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
              />
            </svg>
            <div className="text-[11px] font-mono font-black tracking-widest px-2 py-0.5 rounded-full border border-amber-400 bg-red-950/80 text-amber-300 shadow-lg shadow-red-500/50 uppercase animate-bounce">
              ⚡ SENSE ACTIVATED ⚡
            </div>
          </div>

          {/* Shooting Web Tendrils from Corners */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 700">
            <path
              d="M 0 0 L 140 180 M 0 0 L 220 120 M 0 0 L 80 260 M 30 70 Q 70 90, 110 50 M 60 140 Q 140 130, 130 70"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              style={{
                filter: `drop-shadow(0 0 6px ${primaryColor})`,
                animation: `laser-scan ${2 * durationModifier}s ease-out infinite`,
              }}
            />
            <path
              d="M 400 700 L 260 520 M 400 700 L 180 580 M 400 700 L 320 440 M 370 630 Q 330 610, 290 650 M 340 560 Q 260 570, 270 630"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }}
            />
            <circle
              cx="200"
              cy="350"
              r="36"
              fill="none"
              stroke={primaryColor}
              strokeWidth="2"
              strokeDasharray="8 6"
              className="animate-spin-slow"
            />
          </svg>
        </div>
      )

    case 'lightning_beast':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-30">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full border-4 animate-ping"
              style={{
                width: '260px',
                height: '260px',
                borderColor: primaryColor,
                boxShadow: `0 0 40px ${primaryColor}`,
                animationDuration: `${1.2 * durationModifier}s`,
              }}
            />
          </div>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 700">
            <path
              d="M 200 0 L 170 160 L 240 220 L 160 400 L 250 480 L 190 700"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 12px ${primaryColor}) drop-shadow(0 0 25px ${accentColor})`,
              }}
            />
          </svg>
        </div>
      )

    case 'anime_aura':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-30">
          <div
            className="absolute inset-x-0 bottom-0 h-3/4 flex items-end justify-center opacity-85"
            style={{
              background: `linear-gradient(to top, ${primaryColor}90 0%, ${accentColor}50 45%, transparent 100%)`,
              filter: 'blur(10px)',
            }}
          />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 700">
            {[60, 120, 180, 240, 300, 360].map((x, i) => (
              <line
                key={i}
                x1={x}
                y1="700"
                x2={x + (i % 2 === 0 ? 25 : -25)}
                y2={250}
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeDasharray="12 8"
                style={{
                  filter: `drop-shadow(0 0 6px ${primaryColor})`,
                  animation: `laser-scan ${1.2 * durationModifier}s linear infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </svg>
        </div>
      )

    // ----------------------------------------------------
    // 4. BATTERY & DEVICE INFO
    // ----------------------------------------------------
    case 'battery_plasma_arc':
      return (
        <div
          className="flex items-center gap-2.5 p-2 select-none"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Animated Arc Ring */}
          <div className="relative w-14 h-14 rounded-full border-4 border-slate-800 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke={primaryColor}
                strokeWidth="4"
                strokeDasharray="138"
                strokeDashoffset="18"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-mono font-bold text-white leading-none">88%</span>
              <Zap className="h-3 w-3 text-emerald-400 animate-pulse mt-0.5" />
            </div>
          </div>
          <div className="flex flex-col text-[9px] font-mono">
            <span className="text-white font-bold">FAST CHARGE</span>
            <span className="text-slate-400">42m to 100%</span>
            <span className="text-emerald-400">38.2°C • 4200mAh</span>
          </div>
        </div>
      )

    case 'device_hud_telemetry':
      return (
        <div
          className="flex flex-col gap-1 p-2 font-mono text-[9px] select-none rounded-xl bg-black/40 border border-slate-800"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="flex items-center justify-between text-cyan-300">
            <span>RAM USAGE</span>
            <span className="font-bold">4.2 / 8.0 GB (52%)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="w-[52%] h-full bg-cyan-400 rounded-full animate-pulse" />
          </div>

          <div className="flex items-center justify-between text-indigo-300 mt-1">
            <span>CPU SNAPDRAGON</span>
            <span className="font-bold">2.8 GHz (28°C)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="w-[34%] h-full bg-indigo-400 rounded-full" />
          </div>
        </div>
      )

    // ----------------------------------------------------
    // 5. FITNESS & STEP COUNTERS
    // ----------------------------------------------------
    case 'fitness_rings_pulse':
      return (
        <div
          className="flex items-center gap-3 p-2 select-none"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Concentric Activity Rings */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="23"
                fill="none"
                stroke="#F43F5E"
                strokeWidth="3.5"
                strokeDasharray="144"
                strokeDashoffset="28"
                strokeLinecap="round"
              />
              <circle
                cx="28"
                cy="28"
                r="17"
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeDasharray="106"
                strokeDashoffset="14"
                strokeLinecap="round"
              />
              <circle
                cx="28"
                cy="28"
                r="11"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="3.5"
                strokeDasharray="69"
                strokeDashoffset="10"
                strokeLinecap="round"
              />
            </svg>
            <Activity className="absolute h-4 w-4 text-white animate-pulse" />
          </div>
          <div className="flex flex-col font-mono text-[9px]">
            <span className="text-rose-400 font-bold">8,420 STEPS</span>
            <span className="text-emerald-400">460 KCAL</span>
            <span className="text-cyan-400">45 MIN ACTIVE</span>
          </div>
        </div>
      )

    case 'step_counter_odometer':
      return (
        <div
          className="flex flex-col items-center justify-center p-2 select-none font-mono"
          style={{ transform: `scale(${scale})` }}
        >
          <span className="text-[8px] text-slate-400 uppercase tracking-wider">DAILY PEDOMETER</span>
          <div className="flex items-center gap-0.5 text-lg font-black text-white px-2 py-0.5 rounded-lg bg-black/50 border border-emerald-500/40 mt-0.5">
            <span className="text-emerald-400">0</span>
            <span className="text-emerald-400">8</span>
            <span>,</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
          </div>
          <span className="text-[8px] text-emerald-300 mt-1">🎯 84% OF 10K GOAL</span>
        </div>
      )

    // ----------------------------------------------------
    // 6. QUOTES & DAILY FACTS
    // ----------------------------------------------------
    case 'animated_quote_stream':
      return (
        <div
          className="p-2.5 rounded-xl bg-black/40 border border-amber-500/30 flex flex-col justify-between max-w-[200px] select-none"
          style={{ transform: `scale(${scale})` }}
        >
          <Quote className="h-3.5 w-3.5 text-amber-400" />
          <p className="text-[10px] italic text-slate-200 font-medium my-1 leading-snug">
            "{customText || 'Make each day your masterpiece.'}"
          </p>
          <div className="h-0.5 w-full bg-gradient-to-r from-amber-400 to-transparent rounded-full animate-pulse" />
        </div>
      )

    // ----------------------------------------------------
    // 7. TOOLS: COMPASS & CALCULATOR
    // ----------------------------------------------------
    case 'compass_gyro_sphere':
      return (
        <div
          className="relative flex items-center justify-center p-2 select-none"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="w-16 h-16 rounded-full border-2 border-cyan-400/60 bg-slate-950 flex items-center justify-center relative shadow-lg">
            {/* Azimuth ticks */}
            <span className="absolute top-1 text-[7px] font-mono font-bold text-rose-400">N</span>
            <span className="absolute bottom-1 text-[7px] font-mono font-bold text-slate-400">S</span>
            <span className="absolute right-1 text-[7px] font-mono font-bold text-slate-400">E</span>
            <span className="absolute left-1 text-[7px] font-mono font-bold text-slate-400">W</span>
            {/* Needle */}
            <div
              className="w-1 h-10 bg-gradient-to-b from-rose-500 via-white to-cyan-400 rounded-full animate-pulse"
              style={{ transform: 'rotate(42deg)' }}
            />
          </div>
        </div>
      )

    case 'quick_calc_floating':
      return (
        <div
          className="p-2 rounded-xl bg-black/60 border border-purple-500/40 flex flex-col gap-1 select-none font-mono text-[9px]"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="flex justify-between items-center bg-slate-900 px-2 py-1 rounded text-right text-purple-300 font-bold">
            <span>CALC</span>
            <span>{calcInput}</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {['7', '8', '9', '4', '5', '6', '1', '2', '='].map((num) => (
              <button
                key={num}
                onClick={() => setCalcInput((prev) => (num === '=' ? '85.6' : prev + num))}
                className="py-1 rounded bg-slate-800/80 hover:bg-purple-500/30 text-white font-bold text-center cursor-pointer transition active:scale-95"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )

    // ----------------------------------------------------
    // 8. QUICK SHORTCUTS & AI LAUNCHER
    // ----------------------------------------------------
    case 'ai_assistant_orb':
      return (
        <div
          onClick={() => {
            setLocalTap((prev) => prev + 1)
            onInteractiveTap?.()
          }}
          className="flex items-center gap-2 p-2 rounded-2xl bg-slate-950/70 border border-cyan-400/40 shadow-lg select-none cursor-pointer group active:scale-95 transition-transform"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center">
            {/* Glowing AI Core */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow opacity-80"
              style={{
                background: 'conic-gradient(from 0deg, #38BDF8, #818CF8, #EC4899, #38BDF8)',
                filter: 'blur(3px)',
              }}
            />
            <div className="relative z-10 w-7 h-7 rounded-full bg-black flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-cyan-300 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white flex items-center gap-1">
              Gemini AI Core
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </span>
            <span className="text-[8px] font-mono text-cyan-300">Tap to prompt assistant</span>
          </div>
        </div>
      )

    case 'screen_time_zenith':
      return (
        <div
          className="flex items-center gap-2 p-2 select-none font-mono text-[9px]"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-black/40">
            <span className="text-[8px] font-bold text-emerald-300">2h45m</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold">SCREEN TIME</span>
            <span className="text-emerald-400">Zen Focus: 94%</span>
          </div>
        </div>
      )

    // ----------------------------------------------------
    // 9. MUSIC & MEDIA
    // ----------------------------------------------------
    case 'audio_visualizer':
      return (
        <div
          className="flex items-end justify-center gap-1.5 p-2 select-none h-12"
          style={{ transform: `scale(${scale})` }}
        >
          {[16, 34, 48, 26, 42, 30, 20].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-full animate-pulse"
              style={{
                height: `${h}px`,
                background: `linear-gradient(to top, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 0 8px ${primaryColor}`,
                animationDuration: `${(0.4 + (i % 4) * 0.15) * durationModifier}s`,
              }}
            />
          ))}
        </div>
      )

    case 'vinyl_player_spin':
      return (
        <div
          className="flex items-center gap-2.5 p-2 select-none"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="w-14 h-14 rounded-full bg-black border-2 border-slate-700 animate-spin-slow flex items-center justify-center shadow-xl">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </div>
          <div className="flex flex-col font-mono text-[9px]">
            <span className="text-white font-bold truncate max-w-[90px]">Midnight Cosmic</span>
            <span className="text-rose-400">Lo-Fi Beats</span>
          </div>
        </div>
      )

    case 'mini_tap_game':
      return (
        <div
          onClick={() => {
            setLocalTap((prev) => prev + 1)
            onInteractiveTap?.()
          }}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-950/40 border border-amber-500/40 select-none cursor-pointer active:scale-95 transition-transform"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="flex items-center gap-1 text-amber-300 font-bold text-xs">
            <Sparkles className="h-4 w-4 animate-bounce" />
            <span>Score: {localTap * 10}</span>
          </div>
          <span className="text-[8px] font-mono text-amber-200/80 mt-0.5">⭐ Tap Star to Play</span>
        </div>
      )

    case 'floating_astronaut':
      return (
        <div className="relative flex items-center justify-center select-none animate-float-particles">
          <div
            className="relative rounded-2xl bg-gradient-to-b from-slate-100 to-slate-300 p-2 shadow-xl border border-white/60 flex flex-col items-center justify-center"
            style={{
              width: '52px',
              height: '58px',
              boxShadow: `0 0 20px ${primaryColor}60`,
              transform: `scale(${scale})`,
            }}
          >
            <div className="w-7 h-5 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-600 shadow-inner flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0.5 right-1 w-2 h-1 rounded-full bg-white opacity-80" />
            </div>
            <div className="w-4 h-3.5 rounded-md bg-slate-400 mt-1 flex items-center justify-around px-0.5">
              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
              <div className="w-1 h-1 rounded-full bg-red-400" />
            </div>
          </div>
        </div>
      )

    // ----------------------------------------------------
    // 10. THEMED TEXT & TYPOGRAPHY
    // ----------------------------------------------------
    case 'neon_text_glitch':
      return (
        <div
          className="flex flex-col items-center justify-center p-2 font-mono select-none"
          style={{ transform: `scale(${scale})` }}
        >
          <span
            className="text-sm font-black tracking-widest uppercase animate-pulse"
            style={{
              color: primaryColor,
              textShadow: `0 0 8px ${primaryColor}, 0 0 20px ${accentColor}`,
            }}
          >
            {customText || 'STELLAR OS'}
          </span>
          <span className="text-[8px] text-slate-400 tracking-wider mt-0.5 font-sans">
            PERSONALIZED WIDGET
          </span>
        </div>
      )

    // ----------------------------------------------------
    // 11. VIRAL POP-UPS (SUPERNOVA, SAKURA)
    // ----------------------------------------------------
    case 'supernova':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-30 flex items-center justify-center">
          <div
            className="absolute rounded-full animate-spin-slow opacity-90"
            style={{
              width: isWidget ? '140px' : '380px',
              height: isWidget ? '140px' : '380px',
              background: `radial-gradient(circle, ${primaryColor} 0%, ${accentColor}60 40%, transparent 70%)`,
              filter: 'blur(16px)',
              animationDuration: `${12 * durationModifier}s`,
            }}
          />
          <div
            className="absolute rounded-full border-2 border-dashed border-cyan-300 animate-spin-slow opacity-80"
            style={{
              width: isWidget ? '100px' : '280px',
              height: isWidget ? '100px' : '280px',
              boxShadow: `0 0 25px ${primaryColor}`,
            }}
          />
          <div
            className="relative rounded-full animate-pulse flex items-center justify-center"
            style={{
              width: isWidget ? '42px' : '90px',
              height: isWidget ? '42px' : '90px',
              background: 'radial-gradient(circle, #FFFFFF 10%, #00F2FE 60%, #7928CA 100%)',
              boxShadow: `0 0 45px ${primaryColor}, 0 0 80px ${accentColor}`,
              transform: `scale(${scale})`,
            }}
          >
            <div className="w-3 h-3 rounded-full bg-white animate-ping" />
          </div>
        </div>
      )

    case 'sakura_drift':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-30">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="absolute animate-float-particles"
              style={{
                top: `${(i * 11) % 85}%`,
                left: `${(i * 12) % 85}%`,
                animationDuration: `${(4 + (i % 3)) * durationModifier}s`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 30 30" style={{ transform: `rotate(${i * 45}deg)` }}>
                <path
                  d="M 15 2 C 25 10, 26 24, 15 28 C 4 24, 5 10, 15 2 Z"
                  fill={i % 2 === 0 ? primaryColor : accentColor}
                  opacity="0.85"
                  style={{ filter: `drop-shadow(0 0 4px ${primaryColor})` }}
                />
              </svg>
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}
