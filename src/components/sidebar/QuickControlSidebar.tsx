import React from 'react'
import {
  Play,
  Plus,
  Zap,
  Leaf,
} from 'lucide-react'
import { ScreenEffect, PhoneSettings } from '../../types/stellar'

interface QuickControlSidebarProps {
  effects: ScreenEffect[]
  activeEffect: ScreenEffect | null
  onTriggerEffect: (effect: ScreenEffect) => void
  onAddAsWidget: (effect: ScreenEffect) => void
  phoneSettings: PhoneSettings
  onUpdatePhoneSettings: (settings: PhoneSettings) => void
  onOpenExportModal: () => void
}

export const QuickControlSidebar: React.FC<QuickControlSidebarProps> = ({
  effects,
  activeEffect,
  onTriggerEffect,
  onAddAsWidget,
  phoneSettings,
  onUpdatePhoneSettings,
  onOpenExportModal,
}) => {
  return (
    <aside className="w-72 flex-shrink-0 border-r border-slate-800/80 bg-[#060814]/95 p-4 flex flex-col justify-between overflow-y-auto space-y-4">
      <div className="space-y-4">
        {/* Active Effect Card */}
        {activeEffect && (
          <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-[#0F1735] to-[#0A0E22] p-3.5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                ACTIVE ON PHONE
              </span>
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <h3 className="font-bold text-xs text-white leading-tight">
              {activeEffect.name}
            </h3>

            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
              {activeEffect.description}
            </p>

            <div className="pt-2 flex items-center gap-1.5">
              <button
                onClick={() => onTriggerEffect(activeEffect)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/30 hover:bg-cyan-400 transition cursor-pointer"
              >
                <Play className="h-3 w-3 fill-slate-950" />
                <span>Trigger FX</span>
              </button>

              <button
                onClick={() => onAddAsWidget(activeEffect)}
                className="flex items-center justify-center p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                title="Add As Home Screen Widget"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* 1-Tap Physical Phone Deploy Button */}
        <button
          onClick={onOpenExportModal}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-cyan-400 transition cursor-pointer"
        >
          <Zap className="h-4 w-4" />
          <span>Apply to Real Physical Phone</span>
        </button>

        {/* Quick Presets for Android */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
              POPULAR ASSETS
            </span>
          </div>

          <div className="space-y-1.5">
            {effects.slice(0, 5).map((fx) => {
              const isSelected = activeEffect?.id === fx.id

              return (
                <button
                  key={fx.id}
                  onClick={() => onTriggerEffect(fx)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400/60 bg-cyan-950/30 text-white'
                      : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: fx.primaryColor }}
                    />
                    <span className="text-xs font-medium truncate">{fx.name}</span>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 flex-shrink-0">
                    #{fx.triggerKeywords[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Phone Personalization Controls */}
        <div className="rounded-2xl border border-slate-800 bg-[#0A0E22] p-3.5 space-y-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block">
            Screen & Wallpaper
          </span>

          {/* Wallpaper Selection */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-300">Android Wallpaper</label>
            <select
              value={phoneSettings.wallpaper}
              onChange={(e) =>
                onUpdatePhoneSettings({
                  ...phoneSettings,
                  wallpaper: e.target.value as PhoneSettings['wallpaper'],
                })
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="galaxy">Galaxy Cosmic Nebula</option>
              <option value="cyber">Cyberpunk Emerald Matrix</option>
              <option value="sunset">Sunset Minimal Horizon</option>
              <option value="anime">Anime Sky Clouds</option>
              <option value="oled">Pure OLED Midnight Black (Max Battery)</option>
              <option value="minimal_dark">Minimalist Obsidian</option>
              <option value="zen_sand">Zen Sand Stone</option>
            </select>
          </div>

          {/* Battery Eco Mode */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Leaf className="h-3.5 w-3.5 text-emerald-400" />
              <div>
                <div className="text-xs font-medium text-slate-200">Battery Eco Mode</div>
                <div className="text-[9px] text-slate-500 font-mono">Pause loops on idle</div>
              </div>
            </div>
            <button
              onClick={() =>
                onUpdatePhoneSettings({
                  ...phoneSettings,
                  batteryEcoMode: !phoneSettings.batteryEcoMode,
                })
              }
              className={`w-9 h-4.5 rounded-full transition-colors relative cursor-pointer ${
                phoneSettings.batteryEcoMode ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform transform ${
                  phoneSettings.batteryEcoMode ? 'translate-x-4.5' : 'translate-x-0.5'
                } top-0.5 absolute`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Tip */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400 leading-relaxed font-mono">
        ⚡ <strong>Zero KWGT Needed:</strong> All assets are standalone, ultra-efficient, and drag-and-drop ready.
      </div>
    </aside>
  )
}
