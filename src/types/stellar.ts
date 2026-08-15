export type WidgetCategory =
  | 'clocks'
  | 'weather'
  | 'anime_characters'
  | 'themed_text'
  | 'battery_device'
  | 'quotes_facts'
  | 'fitness_steps'
  | 'tools_utility'
  | 'quick_shortcuts'
  | 'music_media'
  | 'popups_takeovers'

export type EffectType =
  // Clocks
  | 'clock_minimal_neon'
  | 'clock_world_orbital'
  | 'clock_digital_cyber'
  | 'clock_flip_retro'
  // Weather
  | 'weather_storm_radar'
  | 'weather_aurora_forecast'
  | 'weather_rain_glass'
  // Anime & Characters
  | 'anime_aura'
  | 'anime_chibi_companion'
  | 'spider_hero'
  | 'lightning_beast'
  | 'cyber_samurai'
  // Themed Text & Typography
  | 'neon_text_glitch'
  | 'hologram_typography'
  // Battery & Device Info
  | 'battery_plasma_arc'
  | 'device_hud_telemetry'
  // Quotes & Daily Facts
  | 'animated_quote_stream'
  | 'cosmic_facts_bubble'
  // Steps & Fitness
  | 'fitness_rings_pulse'
  | 'step_counter_odometer'
  // Tools: Compass & Calculator & Utilities
  | 'holo_reticle'
  | 'compass_gyro_sphere'
  | 'quick_calc_floating'
  // Quick Shortcuts & AI Launcher
  | 'quick_settings_tile'
  | 'ai_assistant_orb'
  | 'screen_time_zenith'
  // Music, Media, Notes, Memories, Games
  | 'audio_visualizer'
  | 'vinyl_player_spin'
  | 'live_photo_memory'
  | 'floating_astronaut'
  | 'mini_tap_game'
  | 'supernova'
  | 'sakura_drift'
  | 'neon_hearts'
  | 'cyber_glitch'
  | 'matrix_rain'

export interface ScreenEffect {
  id: string
  name: string
  category: WidgetCategory
  effectType: EffectType
  inspirationTag: string
  triggerKeywords: string[]
  primaryColor: string
  accentColor: string
  glowColor: string
  durationSec: number // 0 for continuous live widget
  description: string
  badge?: string
  rating: number
  downloads: string
  isTrending?: boolean
  efficiencyMode?: 'ultra_low_battery' | 'eco_60fps' | 'performance_120fps'
  settings: {
    intensity: number // 1 - 100
    speed: number // 0.5 - 3.0
    scale: number // 0.5 - 2.0
    screenShake: boolean
    bloom: number // 0 - 100
    particlesCount: number
  }
}

export interface PlacedWidget {
  id: string
  effectId: string
  title: string
  category: WidgetCategory
  effectType: EffectType
  x: number // percentage 0 - 100
  y: number // percentage 0 - 100
  size: 'sm' | 'md' | 'lg' | 'wide'
  primaryColor: string
  accentColor: string
  speed: number
  scale: number
  opacity: number
  // interactive local state
  customText?: string
  tapCount?: number
  weatherTemp?: string
  stepCount?: number
  batteryLevel?: number
}

export interface PhoneSettings {
  wallpaper: 'galaxy' | 'cyber' | 'sunset' | 'anime' | 'oled' | 'neoncity' | 'minimal_dark' | 'zen_sand'
  osMode: 'android' | 'ios'
  clockStyle: 'minimal' | 'bold' | 'neon' | 'cyber'
  showStatusIcons: boolean
  edgeLightingEnabled: boolean
  edgeLightingColor: string
  tapBurstEnabled: boolean
  tapBurstEffect: 'stars' | 'sparks' | 'hearts' | 'rings' | 'sakura'
  batteryEcoMode: boolean // reduces particle loops to save energy
}

export const PRESET_EFFECTS: ScreenEffect[] = [
  // 1. CLOCKS
  {
    id: 'fx-clock-cyber',
    name: 'Cyber Horizon Digital Clock',
    category: 'clocks',
    effectType: 'clock_digital_cyber',
    inspirationTag: 'Clocks & Time',
    triggerKeywords: ['clock', 'time', 'digital', 'cyber', 'hour'],
    primaryColor: '#00F2FE',
    accentColor: '#3B82F6',
    glowColor: '#7928CA',
    durationSec: 0,
    description: 'Clean high-precision digital clock widget with glowing seconds pulse, calendar telemetry, and ultra-low battery mode.',
    badge: 'KWGT-FREE',
    rating: 4.9,
    downloads: '1.4M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 80,
      speed: 1.0,
      scale: 1.0,
      screenShake: false,
      bloom: 60,
      particlesCount: 10,
    },
  },
  {
    id: 'fx-clock-world',
    name: 'Orbital World Clock Sphere',
    category: 'clocks',
    effectType: 'clock_world_orbital',
    inspirationTag: 'World Clocks',
    triggerKeywords: ['world', 'timezone', 'london', 'tokyo', 'newyork'],
    primaryColor: '#38BDF8',
    accentColor: '#818CF8',
    glowColor: '#C084FC',
    durationSec: 0,
    description: 'Dual timezone orbital world clock tracking London, Tokyo & NY with rotating planetary time bands.',
    badge: 'POPULAR',
    rating: 4.8,
    downloads: '890K',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 75,
      speed: 0.8,
      scale: 1.0,
      screenShake: false,
      bloom: 50,
      particlesCount: 8,
    },
  },
  {
    id: 'fx-clock-minimal',
    name: 'Neon Silhouette Minimalist Clock',
    category: 'clocks',
    effectType: 'clock_minimal_neon',
    inspirationTag: 'Minimal Clocks',
    triggerKeywords: ['minimal', 'analog', 'clean', 'watch', 'dial'],
    primaryColor: '#F43F5E',
    accentColor: '#FB7185',
    glowColor: '#FECDD3',
    durationSec: 0,
    description: 'Ultra-clean aesthetic analog clock with glowing second hand sweeping seamlessly with zero jitter.',
    badge: 'AESTHETIC',
    rating: 5.0,
    downloads: '1.1M',
    isTrending: false,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 70,
      speed: 1.0,
      scale: 1.0,
      screenShake: false,
      bloom: 45,
      particlesCount: 6,
    },
  },

  // 2. WEATHER
  {
    id: 'fx-weather-aurora',
    name: 'Aurora Borealis Live Forecast',
    category: 'weather',
    effectType: 'weather_aurora_forecast',
    inspirationTag: 'Live Weather',
    triggerKeywords: ['weather', 'forecast', 'aurora', 'temp', 'sunny'],
    primaryColor: '#10B981',
    accentColor: '#06B6D4',
    glowColor: '#3B82F6',
    durationSec: 0,
    description: 'Live atmospheric weather widget showing real-time 24°C temperature, conditions, and shimmering aurora glow.',
    badge: 'LIVE WIDGET',
    rating: 4.9,
    downloads: '2.1M',
    isTrending: true,
    efficiencyMode: 'eco_60fps',
    settings: {
      intensity: 85,
      speed: 0.9,
      scale: 1.0,
      screenShake: false,
      bloom: 70,
      particlesCount: 20,
    },
  },
  {
    id: 'fx-weather-storm',
    name: 'Doppler Radar Storm Widget',
    category: 'weather',
    effectType: 'weather_storm_radar',
    inspirationTag: 'Weather Radar',
    triggerKeywords: ['rain', 'storm', 'radar', 'clouds', 'thunderstorm'],
    primaryColor: '#00F2FE',
    accentColor: '#2563EB',
    glowColor: '#60A5FA',
    durationSec: 0,
    description: 'Interactive animated precipitation radar sweep with lightning cloud indicator and humidity gauge.',
    badge: 'SMART',
    rating: 4.8,
    downloads: '730K',
    isTrending: false,
    efficiencyMode: 'eco_60fps',
    settings: {
      intensity: 80,
      speed: 1.1,
      scale: 1.0,
      screenShake: false,
      bloom: 65,
      particlesCount: 15,
    },
  },

  // 3. ANIME & CHARACTERS IN A SHOW
  {
    id: 'fx-anime-aura',
    name: 'Super Saiyan Ki Energy Aura',
    category: 'anime_characters',
    effectType: 'anime_aura',
    inspirationTag: 'Anime & Shonen',
    triggerKeywords: ['anime', 'goku', 'aura', 'saiyan', 'powerup', 'fire'],
    primaryColor: '#FBBF24',
    accentColor: '#F59E0B',
    glowColor: '#EF4444',
    durationSec: 3.5,
    description: 'Blazing golden energy flame pillars surging upward with crackling sparks and power surge aura.',
    badge: 'HOT',
    rating: 4.9,
    downloads: '2.9M',
    isTrending: true,
    efficiencyMode: 'eco_60fps',
    settings: {
      intensity: 92,
      speed: 1.5,
      scale: 1.1,
      screenShake: true,
      bloom: 88,
      particlesCount: 40,
    },
  },
  {
    id: 'fx-anime-chibi',
    name: 'Chibi Anime Companion Widget',
    category: 'anime_characters',
    effectType: 'anime_chibi_companion',
    inspirationTag: 'Anime Companion',
    triggerKeywords: ['chibi', 'cat', 'pet', 'companion', 'cute'],
    primaryColor: '#F472B6',
    accentColor: '#C084FC',
    glowColor: '#FDE047',
    durationSec: 0,
    description: 'Adorable animated anime pocket companion blinking, reacting to taps, and floating happily on your home screen.',
    badge: 'CUTE #1',
    rating: 5.0,
    downloads: '1.9M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 75,
      speed: 1.0,
      scale: 1.0,
      screenShake: false,
      bloom: 50,
      particlesCount: 12,
    },
  },
  {
    id: 'fx-spider',
    name: 'Web Slinger & Spider-Sense',
    category: 'anime_characters',
    effectType: 'spider_hero',
    inspirationTag: 'Hero Series',
    triggerKeywords: ['spiderman', 'spider', 'web', 'peter', 'miles', 'hero'],
    primaryColor: '#EF4444',
    accentColor: '#3B82F6',
    glowColor: '#F59E0B',
    durationSec: 3.5,
    description: 'Trending superhero web tendril barrage shooting across screen corners with radiating spider-sense electrical pulses.',
    badge: 'VIRAL #1',
    rating: 4.9,
    downloads: '3.4M',
    isTrending: true,
    efficiencyMode: 'eco_60fps',
    settings: {
      intensity: 95,
      speed: 1.4,
      scale: 1.1,
      screenShake: true,
      bloom: 85,
      particlesCount: 35,
    },
  },
  {
    id: 'fx-beast',
    name: 'Electric Beast Thunder Burst',
    category: 'anime_characters',
    effectType: 'lightning_beast',
    inspirationTag: 'Power Show',
    triggerKeywords: ['beast', 'lightning', 'thunder', 'storm', 'power', 'mrbeast'],
    primaryColor: '#00F2FE',
    accentColor: '#3B82F6',
    glowColor: '#10B981',
    durationSec: 3.0,
    description: 'Electrifying cyan and cobalt lightning strikes cascading across your phone screen with shockwave plasma.',
    badge: 'POPULAR',
    rating: 4.8,
    downloads: '2.3M',
    isTrending: true,
    efficiencyMode: 'eco_60fps',
    settings: {
      intensity: 90,
      speed: 1.6,
      scale: 1.0,
      screenShake: true,
      bloom: 90,
      particlesCount: 35,
    },
  },

  // 4. BATTERY & DEVICE INFO
  {
    id: 'fx-battery-plasma',
    name: 'Plasma Arc Battery Gauge',
    category: 'battery_device',
    effectType: 'battery_plasma_arc',
    inspirationTag: 'Battery & Power',
    triggerKeywords: ['battery', 'charge', 'power', 'percent', 'plasma'],
    primaryColor: '#10B981',
    accentColor: '#06B6D4',
    glowColor: '#3B82F6',
    durationSec: 0,
    description: 'Animated 88% charging arc ring with electric fluid level and fast battery charging indicators.',
    badge: 'ENERGY SMART',
    rating: 4.9,
    downloads: '1.6M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 80,
      speed: 0.8,
      scale: 1.0,
      screenShake: false,
      bloom: 60,
      particlesCount: 10,
    },
  },
  {
    id: 'fx-device-hud',
    name: 'Device Telemetry & RAM HUD',
    category: 'battery_device',
    effectType: 'device_hud_telemetry',
    inspirationTag: 'Device Monitor',
    triggerKeywords: ['ram', 'storage', 'cpu', 'device', 'specs'],
    primaryColor: '#00F2FE',
    accentColor: '#8B5CF6',
    glowColor: '#06B6D4',
    durationSec: 0,
    description: 'Real-time Android RAM (4.2GB / 8GB), 28°C CPU temp, and storage breakdown with animated gauges.',
    badge: 'PRO MONITOR',
    rating: 4.8,
    downloads: '940K',
    isTrending: false,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 85,
      speed: 1.0,
      scale: 1.0,
      screenShake: false,
      bloom: 65,
      particlesCount: 8,
    },
  },

  // 5. FITNESS & STEP COUNTERS
  {
    id: 'fx-fitness-rings',
    name: 'Pulse Activity Fitness Rings',
    category: 'fitness_steps',
    effectType: 'fitness_rings_pulse',
    inspirationTag: 'Health & Activity',
    triggerKeywords: ['fitness', 'steps', 'calories', 'workout', 'health', 'walk'],
    primaryColor: '#F43F5E',
    accentColor: '#10B981',
    glowColor: '#06B6D4',
    durationSec: 0,
    description: 'Animated triple activity rings displaying 8,420 Steps, 460 kcal, and 45 active minutes with milestone sparks.',
    badge: 'HEALTH',
    rating: 4.9,
    downloads: '1.2M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 85,
      speed: 0.9,
      scale: 1.0,
      screenShake: false,
      bloom: 60,
      particlesCount: 10,
    },
  },
  {
    id: 'fx-step-counter',
    name: 'Odometer Step Counter & Goal',
    category: 'fitness_steps',
    effectType: 'step_counter_odometer',
    inspirationTag: 'Step Tracker',
    triggerKeywords: ['steps', 'tracker', 'walk', 'distance', 'pedometer'],
    primaryColor: '#00F5A0',
    accentColor: '#00D9F5',
    glowColor: '#059669',
    durationSec: 0,
    description: 'Dynamic animated rolling digit step counter tracking your 10,000 steps daily target with progress bar.',
    badge: 'FITNESS',
    rating: 4.7,
    downloads: '680K',
    isTrending: false,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 80,
      speed: 1.0,
      scale: 1.0,
      screenShake: false,
      bloom: 50,
      particlesCount: 6,
    },
  },

  // 6. QUOTES & FACTS
  {
    id: 'fx-quote-stream',
    name: 'Daily Inspiration Animated Quote',
    category: 'quotes_facts',
    effectType: 'animated_quote_stream',
    inspirationTag: 'Mindset & Quotes',
    triggerKeywords: ['quote', 'daily', 'inspire', 'motivation', 'mindset'],
    primaryColor: '#FBBF24',
    accentColor: '#F472B6',
    glowColor: '#F59E0B',
    durationSec: 0,
    description: 'Elegant typography card delivering daily curated wisdom with gentle luminous breathing underlines.',
    badge: 'WISDOM',
    rating: 4.9,
    downloads: '1.5M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 75,
      speed: 0.7,
      scale: 1.0,
      screenShake: false,
      bloom: 55,
      particlesCount: 8,
    },
  },

  // 7. TOOLS: COMPASS & CALCULATOR
  {
    id: 'fx-compass-sphere',
    name: 'Magnetic Gyro 3D Compass',
    category: 'tools_utility',
    effectType: 'compass_gyro_sphere',
    inspirationTag: 'Sensors & Gyro',
    triggerKeywords: ['compass', 'heading', 'north', 'direction', 'gyro'],
    primaryColor: '#00F2FE',
    accentColor: '#3B82F6',
    glowColor: '#10B981',
    durationSec: 0,
    description: '3D floating magnetic compass with smooth 128° SE heading needle and calibrated azimuth ring.',
    badge: 'TOOL',
    rating: 4.8,
    downloads: '810K',
    isTrending: false,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 85,
      speed: 0.8,
      scale: 1.0,
      screenShake: false,
      bloom: 60,
      particlesCount: 12,
    },
  },
  {
    id: 'fx-quick-calc',
    name: 'Floating Glass Mini Calculator',
    category: 'tools_utility',
    effectType: 'quick_calc_floating',
    inspirationTag: 'Quick Tools',
    triggerKeywords: ['calc', 'calculator', 'math', 'maths', 'quick'],
    primaryColor: '#A855F7',
    accentColor: '#EC4899',
    glowColor: '#8B5CF6',
    durationSec: 0,
    description: 'Interactive tap-to-compute frosted glass mini calculator for instant calculations without opening apps.',
    badge: 'INTERACTIVE',
    rating: 4.9,
    downloads: '1.1M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 80,
      speed: 1.0,
      scale: 1.0,
      screenShake: false,
      bloom: 50,
      particlesCount: 6,
    },
  },

  // 8. QUICK SHORTCUTS & AI LAUNCHER
  {
    id: 'fx-ai-orb',
    name: 'AI Gemini Assistant Live Orb',
    category: 'quick_shortcuts',
    effectType: 'ai_assistant_orb',
    inspirationTag: 'AI & Smart Tools',
    triggerKeywords: ['ai', 'gemini', 'assistant', 'ask', 'prompt', 'smart'],
    primaryColor: '#38BDF8',
    accentColor: '#818CF8',
    glowColor: '#EC4899',
    durationSec: 0,
    description: 'Pulsing multi-color AI neural core widget ready for 1-tap smart prompts and instant device actions.',
    badge: 'AI GEMINI',
    rating: 5.0,
    downloads: '3.2M',
    isTrending: true,
    efficiencyMode: 'eco_60fps',
    settings: {
      intensity: 90,
      speed: 1.1,
      scale: 1.0,
      screenShake: false,
      bloom: 85,
      particlesCount: 18,
    },
  },
  {
    id: 'fx-screen-time',
    name: 'Zenith Screen Time & Usage',
    category: 'quick_shortcuts',
    effectType: 'screen_time_zenith',
    inspirationTag: 'Digital Wellbeing',
    triggerKeywords: ['screentime', 'usage', 'wellbeing', 'focus', 'hours'],
    primaryColor: '#34D399',
    accentColor: '#38BDF8',
    glowColor: '#6EE7B7',
    durationSec: 0,
    description: 'Minimal digital wellbeing ring tracking 2h 45m screen time with calming ambient focus aura.',
    badge: 'WELLBEING',
    rating: 4.8,
    downloads: '620K',
    isTrending: false,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 70,
      speed: 0.8,
      scale: 1.0,
      screenShake: false,
      bloom: 50,
      particlesCount: 8,
    },
  },

  // 9. MUSIC, MEDIA & MEMORIES
  {
    id: 'fx-audio-eq',
    name: 'Cyber Reactive Waveform',
    category: 'music_media',
    effectType: 'audio_visualizer',
    inspirationTag: 'Music & Beats',
    triggerKeywords: ['music', 'audio', 'sound', 'equalizer', 'beat', 'spotify'],
    primaryColor: '#A855F7',
    accentColor: '#06B6D4',
    glowColor: '#3B82F6',
    durationSec: 0,
    description: 'Bouncing animated neon equalizer bars with dynamic rhythmic frequency waves for currently playing music.',
    badge: 'MUSIC SYNC',
    rating: 4.8,
    downloads: '1.7M',
    isTrending: true,
    efficiencyMode: 'eco_60fps',
    settings: {
      intensity: 90,
      speed: 1.5,
      scale: 1.0,
      screenShake: false,
      bloom: 80,
      particlesCount: 20,
    },
  },
  {
    id: 'fx-vinyl-player',
    name: 'Retro Glowing Vinyl Player',
    category: 'music_media',
    effectType: 'vinyl_player_spin',
    inspirationTag: 'Retro Audio',
    triggerKeywords: ['vinyl', 'track', 'album', 'song', 'lofi'],
    primaryColor: '#EC4899',
    accentColor: '#8B5CF6',
    glowColor: '#F43F5E',
    durationSec: 0,
    description: 'Smoothly spinning vinyl disc with tonearm and album artwork reflection on your home screen.',
    badge: 'LO-FI',
    rating: 4.9,
    downloads: '1.3M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 80,
      speed: 0.8,
      scale: 1.0,
      screenShake: false,
      bloom: 60,
      particlesCount: 8,
    },
  },
  {
    id: 'fx-tap-game',
    name: 'Cosmic Clicker & Micro-Game',
    category: 'quick_shortcuts',
    effectType: 'mini_tap_game',
    inspirationTag: 'Interactive Game',
    triggerKeywords: ['game', 'tap', 'clicker', 'score', 'play'],
    primaryColor: '#F59E0B',
    accentColor: '#EF4444',
    glowColor: '#FCD34D',
    durationSec: 0,
    description: 'Interactive home screen mini tap game — tap the glowing star to increase score and trigger particle fireworks.',
    badge: 'PLAYABLE',
    rating: 4.9,
    downloads: '850K',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 85,
      speed: 1.2,
      scale: 1.0,
      screenShake: false,
      bloom: 70,
      particlesCount: 15,
    },
  },
  {
    id: 'fx-astro-widget',
    name: 'Floating Spaceman Companion',
    category: 'music_media',
    effectType: 'floating_astronaut',
    inspirationTag: 'Cosmic Companion',
    triggerKeywords: ['astro', 'astronaut', 'space', 'cosmonaut'],
    primaryColor: '#38BDF8',
    accentColor: '#818CF8',
    glowColor: '#C084FC',
    durationSec: 0,
    description: 'Animated cute astronaut floating tethered on your home screen with zero-gravity micro-drifting.',
    badge: 'WIDGET',
    rating: 4.9,
    downloads: '1.4M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 75,
      speed: 0.9,
      scale: 1.0,
      screenShake: false,
      bloom: 65,
      particlesCount: 10,
    },
  },

  // 10. THEMED TEXT & TYPOGRAPHY
  {
    id: 'fx-neon-text',
    name: 'Holographic Cyber Neon Text',
    category: 'themed_text',
    effectType: 'neon_text_glitch',
    inspirationTag: 'Custom Text',
    triggerKeywords: ['text', 'quote', 'name', 'custom', 'word'],
    primaryColor: '#00F2FE',
    accentColor: '#F43F5E',
    glowColor: '#A855F7',
    durationSec: 0,
    description: 'Customizable luminous neon sign for your home screen with subtle cybernetic glitch flicker.',
    badge: 'CUSTOM TEXT',
    rating: 4.8,
    downloads: '920K',
    isTrending: false,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 85,
      speed: 1.0,
      scale: 1.0,
      screenShake: false,
      bloom: 75,
      particlesCount: 10,
    },
  },

  // 11. VIRAL POP-UPS & TAKEOVERS
  {
    id: 'fx-supernova',
    name: 'Stellar Supernova Cosmic Blast',
    category: 'popups_takeovers',
    effectType: 'supernova',
    inspirationTag: 'Cosmic & Space',
    triggerKeywords: ['stellar', 'supernova', 'space', 'galaxy', 'star', 'cosmos'],
    primaryColor: '#00F2FE',
    accentColor: '#7928CA',
    glowColor: '#EC4899',
    durationSec: 4.0,
    description: 'Breathtaking celestial star explosion with multi-layer coronal rays, orbiting dust rings, and chromatic bloom.',
    badge: 'FEATURED',
    rating: 5.0,
    downloads: '3.6M',
    isTrending: true,
    efficiencyMode: 'eco_60fps',
    settings: {
      intensity: 88,
      speed: 1.0,
      scale: 1.0,
      screenShake: false,
      bloom: 95,
      particlesCount: 30,
    },
  },
  {
    id: 'fx-sakura',
    name: 'Sakura Petal Dream Breeze',
    category: 'popups_takeovers',
    effectType: 'sakura_drift',
    inspirationTag: 'Aesthetic & Chill',
    triggerKeywords: ['sakura', 'cherry', 'blossom', 'pink', 'spring', 'chill', 'love'],
    primaryColor: '#F472B6',
    accentColor: '#FB7185',
    glowColor: '#FEE2E2',
    durationSec: 4.5,
    description: 'Gentle, romantic flurry of animated pink cherry blossom petals drifting across your phone with warm sunbeams.',
    badge: 'AESTHETIC',
    rating: 4.9,
    downloads: '2.5M',
    isTrending: true,
    efficiencyMode: 'ultra_low_battery',
    settings: {
      intensity: 70,
      speed: 0.8,
      scale: 0.9,
      screenShake: false,
      bloom: 60,
      particlesCount: 16,
    },
  },
]

export const INITIAL_WIDGETS: PlacedWidget[] = [
  {
    id: 'placed-1',
    effectId: 'fx-clock-cyber',
    title: 'Cyber Time & Date',
    category: 'clocks',
    effectType: 'clock_digital_cyber',
    x: 50,
    y: 22,
    size: 'wide',
    primaryColor: '#00F2FE',
    accentColor: '#3B82F6',
    speed: 1.0,
    scale: 1.0,
    opacity: 100,
  },
  {
    id: 'placed-2',
    effectId: 'fx-weather-aurora',
    title: 'Aurora Weather 24°',
    category: 'weather',
    effectType: 'weather_aurora_forecast',
    x: 30,
    y: 44,
    size: 'md',
    primaryColor: '#10B981',
    accentColor: '#06B6D4',
    speed: 0.9,
    scale: 0.95,
    opacity: 95,
    weatherTemp: '24°C',
  },
  {
    id: 'placed-3',
    effectId: 'fx-battery-plasma',
    title: 'Plasma Battery 88%',
    category: 'battery_device',
    effectType: 'battery_plasma_arc',
    x: 72,
    y: 44,
    size: 'sm',
    primaryColor: '#10B981',
    accentColor: '#3B82F6',
    speed: 0.8,
    scale: 0.95,
    opacity: 95,
    batteryLevel: 88,
  },
  {
    id: 'placed-4',
    effectId: 'fx-ai-orb',
    title: 'Gemini Assistant Core',
    category: 'quick_shortcuts',
    effectType: 'ai_assistant_orb',
    x: 50,
    y: 64,
    size: 'md',
    primaryColor: '#38BDF8',
    accentColor: '#EC4899',
    speed: 1.0,
    scale: 0.9,
    opacity: 100,
  },
]
