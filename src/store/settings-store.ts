import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Provider, Settings } from '@/types/chat'

interface SettingsStore extends Settings {
  updateProvider: (provider: Provider) => void
  updateApiKey: (provider: Provider, apiKey: string) => void
  updateModel: (provider: Provider, model: string) => void
  updateTemperature: (temperature: number) => void
  updateMaxTokens: (maxTokens: number) => void
  updateSystemPrompt: (prompt: string) => void
  resetSettings: () => void
}

const defaultSettings: Settings = {
  currentProvider: 'openai',
  apiKeys: {
    openai: '',
    anthropic: '',
    google: '',
    openrouter: '',
    mistral: '',
    qwen: '',
    grok: '',
  },
  models: {
    openai: 'gpt-4',
    anthropic: 'claude-3-5-sonnet-20241022',
    google: 'gemini-1.5-pro',
    openrouter: 'anthropic/claude-3.5-sonnet',
    mistral: 'mistral-large',
    qwen: 'qwen-max',
    grok: 'grok-beta',
  },
  temperature: 0.3,
  maxTokens: 500,
  systemPrompt: 'You are Timi, a helpful AI assistant. Be concise and direct in your responses. Avoid unnecessary explanations and get straight to the point. Keep responses brief but complete.',
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      updateProvider: (provider) => {
        set({ currentProvider: provider })
      },

      updateApiKey: (provider, apiKey) => {
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: apiKey },
        }))
      },

      updateModel: (provider, model) => {
        set((state) => ({
          models: { ...state.models, [provider]: model },
        }))
      },

      updateTemperature: (temperature) => {
        set({ temperature })
      },

      updateMaxTokens: (maxTokens) => {
        set({ maxTokens })
      },

      updateSystemPrompt: (prompt) => {
        set({ systemPrompt: prompt })
      },

      resetSettings: () => {
        set(defaultSettings)
      },
    }),
    {
      name: 'settings-storage',
    }
  )
)
