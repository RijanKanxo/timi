'use client'

import React, { useState } from 'react'
import { X, Save, Eye, EyeOff } from 'lucide-react'
import { Provider, Model } from '@/types/chat'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  currentProvider: Provider
  onProviderChange: (provider: Provider) => void
  apiKeys: Record<Provider, string>
  onApiKeyChange: (provider: Provider, apiKey: string) => void
  currentModel: Record<Provider, Model>
  onModelChange: (provider: Provider, model: Model) => void
}

export function SettingsPanel({
  isOpen,
  onClose,
  currentProvider,
  onProviderChange,
  apiKeys,
  onApiKeyChange,
  currentModel,
  onModelChange,
}: SettingsPanelProps) {
  const [showApiKeys, setShowApiKeys] = useState<Record<Provider, boolean>>({
    openai: false,
    anthropic: false,
    google: false,
    openrouter: false,
  })

  const [tempApiKeys, setTempApiKeys] = useState(() => ({
    openai: apiKeys?.openai || '',
    anthropic: apiKeys?.anthropic || '',
    google: apiKeys?.google || '',
    openrouter: apiKeys?.openrouter || '',
  }))

  // Update tempApiKeys when apiKeys prop changes
  React.useEffect(() => {
    setTempApiKeys({
      openai: apiKeys?.openai || '',
      anthropic: apiKeys?.anthropic || '',
      google: apiKeys?.google || '',
      openrouter: apiKeys?.openrouter || '',
    })
  }, [apiKeys])

  const providers: { id: Provider; name: string; models: { id: Model; name: string }[] }[] = [
    {
      id: 'openai',
      name: 'OpenAI',
      models: [
        { id: 'gpt-4', name: 'GPT-4' },
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
      ],
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      models: [
        { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet' },
        { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' },
      ],
    },
    {
      id: 'google',
      name: 'Google Gemini',
      models: [
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
      ],
    },
    {
      id: 'openrouter',
      name: 'OpenRouter',
      models: [
        { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
        { id: 'google/gemini-pro', name: 'Gemini Pro' },
        { id: 'openai/gpt-4', name: 'GPT-4' },
      ],
    },
  ]

  const handleSave = () => {
    Object.entries(tempApiKeys).forEach(([provider, apiKey]) => {
      onApiKeyChange(provider as Provider, apiKey)
    })
    onClose()
  }

  const toggleApiKeyVisibility = (provider: Provider) => {
    setShowApiKeys(prev => ({ ...prev, [provider]: !prev[provider] }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-minimal w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-neutral-900">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-neutral-700 transition-colors rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                AI Provider
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => onProviderChange(provider.id)}
                    className={`p-4 text-left border rounded-lg transition-all duration-200 hover-lift ${
                      currentProvider === provider.id
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 hover:border-neutral-400 bg-white text-neutral-900'
                    }`}
                  >
                    <div className="font-medium text-sm">{provider.name}</div>
                    <div className="text-xs opacity-75 mt-1">
                      {currentProvider === provider.id ? 'Currently selected' : 'Click to select'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {providers.map((provider) => (
              <div key={provider.id} className="bg-neutral-50 p-4 sm:p-6 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  {provider.name} Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      API Key
                    </label>
                    <div className="relative">
                      <input
                        type={showApiKeys[provider.id] ? 'text' : 'password'}
                        value={tempApiKeys[provider.id] || ''}
                        onChange={(e) =>
                          setTempApiKeys(prev => ({ ...prev, [provider.id]: e.target.value }))
                        }
                        placeholder={`Enter your ${provider.name} API key`}
                        className="w-full px-3 py-2 pr-10 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => toggleApiKeyVisibility(provider.id)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        {showApiKeys[provider.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Model
                    </label>
                    <select
                      value={currentModel[provider.id] || provider.models[0]?.id}
                      onChange={(e) => onModelChange(provider.id, e.target.value as Model)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200"
                    >
                      {provider.models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-4 sm:p-6 border-t border-neutral-200 flex-shrink-0 bg-neutral-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-all duration-200 hover-lift"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all duration-200 hover-lift"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}
