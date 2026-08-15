import React from 'react'
import {
  Sparkles,
  Smartphone,
  TrendingUp,
  Layers,
  Maximize2,
  Palette,
  Zap,
} from 'lucide-react'

interface HeaderProps {
  activeTab: 'simulator' | 'trending' | 'studio' | 'widgets'
  onTabChange: (tab: 'simulator' | 'trending' | 'studio' | 'widgets') => void
  onOpenFullscreen: () => void
  onOpenExportModal: () => void
  activeEffectName?: string
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenFullscreen,
  onOpenExportModal,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#060814]/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between z-30 flex-shrink-0">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-600 shadow-md shadow-cyan-500/20">
          <Sparkles className="h-4 w-4 text-white animate-pulse" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-display text-sm font-bold text-white tracking-wide">
              Stellar Screen FX
            </h1>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-emerald-300 border border-emerald-500/30">
              NO KWGT • ECO BATTERY
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
            ANIMATED ASSETS FOR ANDROID HOME SCREEN
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center rounded-xl bg-[#090D22] p-1 border border-slate-800 gap-1 shadow-inner">
        <button
          onClick={() => onTabChange('simulator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="h-3.5 w-3.5" />
          <span>Phone Simulator</span>
        </button>

        <button
          onClick={() => onTabChange('trending')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === 'trending'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-xs font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Asset Library</span>
        </button>

        <button
          onClick={() => onTabChange('studio')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === 'studio'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-xs font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="h-3.5 w-3.5" />
          <span>Studio Creator</span>
        </button>

        <button
          onClick={() => onTabChange('widgets')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
            activeTab === 'widgets'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>My Widgets</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-cyan-400 transition cursor-pointer"
        >
          <Zap className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Apply to Phone</span>
        </button>

        <button
          onClick={onOpenFullscreen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition cursor-pointer active:scale-98"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Fullscreen</span>
        </button>
      </div>
    </header>
  )
}
