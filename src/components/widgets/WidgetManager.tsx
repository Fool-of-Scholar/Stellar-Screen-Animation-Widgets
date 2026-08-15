import React from 'react'
import {
  Layers,
  Trash2,
  Smartphone,
  Sparkles,
  Leaf,
  Download,
  Move,
} from 'lucide-react'
import { PlacedWidget } from '../../types/stellar'
import { AnimatedOverlayRenderer } from '../effects/AnimatedOverlays'

interface WidgetManagerProps {
  widgets: PlacedWidget[]
  onUpdateWidget: (updated: PlacedWidget) => void
  onRemoveWidget: (id: string) => void
  onAddSampleWidget: () => void
  onOpenExportModal: () => void
}

export const WidgetManager: React.FC<WidgetManagerProps> = ({
  widgets,
  onUpdateWidget,
  onRemoveWidget,
  onAddSampleWidget,
  onOpenExportModal,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <span>Active Home Screen Widgets</span>
            </h2>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
              <Leaf className="h-3 w-3" />
              <span>0% BATTERY DRAIN</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Manage, position, and export active live animated assets placed on your Android home screen.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-cyan-400 transition cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Apply to Real Phone</span>
          </button>

          <button
            onClick={onAddSampleWidget}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition cursor-pointer"
          >
            <span>+ Add Widget</span>
          </button>
        </div>
      </div>

      {widgets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center space-y-3">
          <Sparkles className="h-8 w-8 text-slate-600 mx-auto" />
          <p className="text-sm font-medium text-slate-400">No active widgets on your phone screen yet.</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our huge library of Clocks, Weather, Anime companions, Battery gauges, and Quotes, and tap "+ Add Widget"!
          </p>
          <button
            onClick={onAddSampleWidget}
            className="mt-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs shadow-lg shadow-cyan-500/20"
          >
            Add Sample Cyber Clock & Weather Widget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className="rounded-2xl border border-slate-800 bg-[#0C1024] p-4 space-y-4 shadow-lg"
            >
              {/* Widget Header & Mini Live Preview */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                    <AnimatedOverlayRenderer
                      effectType={widget.effectType}
                      primaryColor={widget.primaryColor}
                      accentColor={widget.accentColor}
                      scale={0.5}
                      isWidget={true}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">{widget.title}</h3>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-cyan-400 uppercase">{widget.category.replace('_', ' ')}</span>
                      <span className="text-emerald-400">• Eco Mode</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveWidget(widget.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                  title="Remove Widget"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Position & Scale Sliders */}
              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Move className="h-3 w-3" />
                      <span>Horizontal Position (X)</span>
                    </span>
                    <span className="text-cyan-300 font-bold">{widget.x}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={widget.x}
                    onChange={(e) => onUpdateWidget({ ...widget, x: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Move className="h-3 w-3" />
                      <span>Vertical Position (Y)</span>
                    </span>
                    <span className="text-indigo-300 font-bold">{widget.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={widget.y}
                    onChange={(e) => onUpdateWidget({ ...widget, y: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Scale Multiplier</span>
                    <span className="text-emerald-400 font-bold">{widget.scale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="1.4"
                    step="0.1"
                    value={widget.scale}
                    onChange={(e) => onUpdateWidget({ ...widget, scale: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Guide Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-[#08131C] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-emerald-400" />
            <span>Works Without KWGT & Battery Friendly</span>
          </h3>
          <span className="font-mono text-xs text-emerald-300 font-bold">1-TAP SETUP</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Unlike bulky widget engines, Stellar uses standalone lightweight WebP/Canvas micro-renderers. They sleep automatically when your phone screen is turned off or when other apps are open.
        </p>

        <button
          onClick={onOpenExportModal}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20"
        >
          Open 1-Tap Real Phone Installation Guide
        </button>
      </div>
    </div>
  )
}
