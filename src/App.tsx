import { useState } from 'react'
import { Header } from './components/Header'
import { PhoneSimulator } from './components/phone/PhoneSimulator'
import { TrendingLibrary } from './components/discovery/TrendingLibrary'
import { AnimationStudio } from './components/studio/AnimationStudio'
import { WidgetManager } from './components/widgets/WidgetManager'
import { QuickControlSidebar } from './components/sidebar/QuickControlSidebar'
import { FullscreenTestModal } from './components/fullscreen/FullscreenTestModal'
import { RealPhoneExportModal } from './components/export/RealPhoneExportModal'
import {
  PRESET_EFFECTS,
  INITIAL_WIDGETS,
  ScreenEffect,
  PlacedWidget,
  PhoneSettings,
} from './types/stellar'

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'trending' | 'studio' | 'widgets'>('simulator')
  const [effects, setEffects] = useState<ScreenEffect[]>(PRESET_EFFECTS)
  const [activeEffect, setActiveEffect] = useState<ScreenEffect | null>(PRESET_EFFECTS[0])
  const [placedWidgets, setPlacedWidgets] = useState<PlacedWidget[]>(INITIAL_WIDGETS)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const [phoneSettings, setPhoneSettings] = useState<PhoneSettings>({
    wallpaper: 'galaxy',
    osMode: 'android',
    clockStyle: 'bold',
    showStatusIcons: true,
    edgeLightingEnabled: false,
    edgeLightingColor: '#00F2FE',
    tapBurstEnabled: true,
    tapBurstEffect: 'stars',
    batteryEcoMode: true,
  })

  // Trigger effect on phone
  const handleTriggerEffect = (effect: ScreenEffect) => {
    setActiveEffect(effect)
  }

  // Add an effect as an animated floating widget on the home screen
  const handleAddAsWidget = (effect: ScreenEffect) => {
    const newWidget: PlacedWidget = {
      id: `widget-${Date.now()}`,
      effectId: effect.id,
      title: effect.name.split(' ')[0] + ' ' + (effect.name.split(' ')[1] || 'Widget'),
      category: effect.category,
      effectType: effect.effectType,
      x: 50,
      y: 50,
      size: 'md',
      primaryColor: effect.primaryColor,
      accentColor: effect.accentColor,
      speed: effect.settings.speed,
      scale: 1.0,
      opacity: 100,
    }
    setPlacedWidgets((prev) => [...prev, newWidget])
    setActiveTab('simulator')
  }

  // Save new custom effect from Studio
  const handleSaveCustomEffect = (customEffect: ScreenEffect) => {
    setEffects((prev) => [customEffect, ...prev])
    setActiveEffect(customEffect)
    setActiveTab('simulator')
  }

  // Update existing widget parameters
  const handleUpdateWidget = (updated: PlacedWidget) => {
    setPlacedWidgets((prev) => prev.map((w) => (w.id === updated.id ? updated : w)))
  }

  // Remove widget
  const handleRemoveWidget = (id: string) => {
    setPlacedWidgets((prev) => prev.filter((w) => w.id !== id))
  }

  // Add sample widget
  const handleAddSampleWidget = () => {
    handleAddAsWidget(effects[1] || PRESET_EFFECTS[0])
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050713] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenFullscreen={() => setIsFullscreenOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        activeEffectName={activeEffect?.name}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Ambient Cosmic Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-indigo-950/20 via-cyan-950/10 to-transparent pointer-events-none filter blur-3xl" />

        {/* Tab 1: Interactive Phone Simulator Mode */}
        {activeTab === 'simulator' && (
          <div className="flex flex-1 overflow-hidden">
            {/* Quick Controls & Presets Sidebar */}
            <QuickControlSidebar
              effects={effects}
              activeEffect={activeEffect}
              onTriggerEffect={handleTriggerEffect}
              onAddAsWidget={handleAddAsWidget}
              phoneSettings={phoneSettings}
              onUpdatePhoneSettings={setPhoneSettings}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />

            {/* Central Phone Simulator Stage */}
            <main className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
              <PhoneSimulator
                activeEffect={activeEffect}
                placedWidgets={placedWidgets}
                onUpdateWidget={handleUpdateWidget}
                onRemoveWidget={handleRemoveWidget}
                phoneSettings={phoneSettings}
                onUpdatePhoneSettings={setPhoneSettings}
                onTriggerEffect={handleTriggerEffect}
                presetEffects={effects}
                onOpenExportModal={() => setIsExportModalOpen(true)}
              />
            </main>
          </div>
        )}

        {/* Tab 2: Trending Screen Effects & Pop-ups Library */}
        {activeTab === 'trending' && (
          <div className="flex flex-1 overflow-hidden">
            <TrendingLibrary
              effects={effects}
              onSelectEffect={(fx) => {
                handleTriggerEffect(fx)
                setActiveTab('simulator')
              }}
              onAddAsWidget={handleAddAsWidget}
              activeEffectId={activeEffect?.id}
            />
          </div>
        )}

        {/* Tab 3: Animation & Widget Studio */}
        {activeTab === 'studio' && (
          <div className="flex flex-1 overflow-hidden">
            <AnimationStudio
              onSaveEffect={handleSaveCustomEffect}
              onTestEffect={(fx) => {
                handleTriggerEffect(fx)
                setActiveTab('simulator')
              }}
              onAddAsWidget={handleAddAsWidget}
            />
          </div>
        )}

        {/* Tab 4: Active Widgets Manager */}
        {activeTab === 'widgets' && (
          <div className="flex flex-1 overflow-hidden">
            <WidgetManager
              widgets={placedWidgets}
              onUpdateWidget={handleUpdateWidget}
              onRemoveWidget={handleRemoveWidget}
              onAddSampleWidget={handleAddSampleWidget}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Fullscreen Testing & Showcase Takeover Modal */}
      <FullscreenTestModal
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        presetEffects={effects}
        initialEffect={activeEffect}
      />

      {/* Real Physical Phone 1-Tap Export Modal */}
      <RealPhoneExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        placedWidgets={placedWidgets}
        activeEffect={activeEffect}
      />
    </div>
  )
}
