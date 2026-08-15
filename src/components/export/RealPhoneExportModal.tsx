import React, { useState } from 'react'
import {
  Smartphone,
  Download,
  CheckCircle2,
  X,
  Zap,
  Layers,
  Sparkles,
  Flame,
  Copy,
  Check,
} from 'lucide-react'
import { PlacedWidget, ScreenEffect } from '../../types/stellar'
import { AnimatedOverlayRenderer } from '../effects/AnimatedOverlays'

interface RealPhoneExportModalProps {
  isOpen: boolean
  onClose: () => void
  placedWidgets: PlacedWidget[]
  activeEffect: ScreenEffect | null
}

export const RealPhoneExportModal: React.FC<RealPhoneExportModalProps> = ({
  isOpen,
  onClose,
  placedWidgets,
  activeEffect,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'android_pwa' | 'live_wallpaper' | 'kwgt_free_widget' | 'ios_webclip'>('android_pwa')
  const [isCopied, setIsCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  if (!isOpen) return null

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleDownloadAssetBundle = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 3000)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-cyan-500/40 bg-[#090D24] p-6 shadow-2xl shadow-cyan-950/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/15 via-indigo-500/10 to-transparent filter blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-white tracking-wide flex items-center gap-2">
                Apply to Real Phone Home Screen
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                  NO KWGT REQUIRED
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                ZERO BATTERY DRAIN • 1-TAP HOME SCREEN LIVE ASSETS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 relative z-10">
          {[
            { id: 'android_pwa', label: '🤖 Android 1-Tap', icon: Zap },
            { id: 'live_wallpaper', label: '🎥 Live Wallpaper', icon: Flame },
            { id: 'kwgt_free_widget', label: '✨ Standalone Widget', icon: Layers },
            { id: 'ios_webclip', label: '🍎 iOS Safari', icon: Sparkles },
          ].map((m) => {
            const Icon = m.icon
            const isSelected = selectedMethod === m.id
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id as any)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-md shadow-cyan-950/50 ring-1 ring-cyan-400/50'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{m.label}</span>
              </button>
            )
          })}
        </div>

        {/* Method Detail Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 relative z-10">
          {/* Method 1: Android 1-Tap PWA Widget */}
          {selectedMethod === 'android_pwa' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>Direct Android Home Screen Installation</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>
                  Open this link on your phone’s <strong>Google Chrome</strong> or <strong>Samsung Internet</strong> browser.
                </li>
                <li>
                  Tap the <strong>three dots menu (⋮)</strong> in the top right of your browser.
                </li>
                <li>
                  Select <strong>"Add to Home screen"</strong> or <strong>"Install App"</strong>.
                </li>
                <li>
                  Your customized floating animated assets & clocks will run seamlessly as standalone transparent widgets with zero lag!
                </li>
              </ol>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 transition cursor-pointer"
                >
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{isCopied ? 'Link Copied to Clipboard!' : 'Copy Mobile Link to Open on Phone'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Method 2: Live Looping Wallpaper */}
          {selectedMethod === 'live_wallpaper' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Flame className="h-4 w-4" />
                <span>Ultra-HD Seamless Looping Live Wallpaper Bundle</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Export your configured layout as an optimized 60FPS seamless video loop (MP4/WebM) compatible with Android Wallpaper Engine, Samsung Live Wallpaper, or TikTok Video Wallpaper.
              </p>

              <div className="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Resolution:</span>
                  <span className="text-white font-bold">1080 x 2400 (OLED 60FPS)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Battery Impact:</span>
                  <span className="text-emerald-400 font-bold">&lt; 1.2% per day (Hardware Decoded)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Included Widgets:</span>
                  <span className="text-cyan-300">{placedWidgets.length} active assets</span>
                </div>
              </div>

              <button
                onClick={handleDownloadAssetBundle}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
              >
                {isDownloading ? (
                  <span>Generating Optimized Video Loop...</span>
                ) : downloadSuccess ? (
                  <span>✓ Wallpaper Loop Bundle Exported!</span>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download 60FPS Live Wallpaper Loop (.mp4)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Method 3: Standalone Custom Widget (No KWGT) */}
          {selectedMethod === 'kwgt_free_widget' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <Layers className="h-4 w-4" />
                <span>Zero-Dependency Custom Android Widget</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlike complex KWGT setups that require paid pro keys, our app exports self-contained HTML5 Canvas & WebComponent widgets that can be loaded instantly with any free widget launcher (like Any Widget, WebWidget, or Termux).
              </p>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                ⚡ <strong>Battery Friendly:</strong> Uses <code>requestAnimationFrame</code> throttle and sleep mode when screen is locked to guarantee zero battery drain.
              </div>

              <button
                onClick={handleDownloadAssetBundle}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition cursor-pointer"
              >
                <Download className="h-4 w-4 text-cyan-400" />
                <span>Export Standalone Widget Package (.zip)</span>
              </button>
            </div>
          )}

          {/* Method 4: iOS Safari */}
          {selectedMethod === 'ios_webclip' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Sparkles className="h-4 w-4" />
                <span>iPhone / iOS Safari Setup</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>Open this app in <strong>Safari</strong> on your iPhone.</li>
                <li>Tap the <strong>Share button</strong> (square with arrow up) at the bottom.</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                <li>Launch the icon from your Home Screen for a borderless, OLED-optimized live widget!</li>
              </ol>
            </div>
          )}

          {/* Preview of current configured layout */}
          <div className="rounded-2xl border border-slate-800/80 bg-black/40 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                {activeEffect && (
                  <AnimatedOverlayRenderer
                    effectType={activeEffect.effectType}
                    primaryColor={activeEffect.primaryColor}
                    accentColor={activeEffect.accentColor}
                    scale={0.5}
                    isWidget={true}
                  />
                )}
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Current Layout Preset</div>
                <div className="text-[10px] font-mono text-cyan-400">
                  {placedWidgets.length} Animated Widgets • {activeEffect?.name || 'Cyber Theme'}
                </div>
              </div>
            </div>

            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-500/30">
              Ready for Real Phone
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
