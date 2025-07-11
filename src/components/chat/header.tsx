'use client'

import React, { useState } from 'react'
import { Settings, Bot, Plus, History, Download, Menu, X } from 'lucide-react'

interface HeaderProps {
  onSettingsClick: () => void
  onNewChat?: () => void
  onExportChat?: () => void
  onShowHistory?: () => void
}

export function Header({ onSettingsClick, onNewChat, onExportChat, onShowHistory }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="glass-minimal border-b border-neutral-200 px-4 sm:px-6 py-4 fade-in">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-neutral-900">
            Timi
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Desktop buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={onNewChat}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200 hover-lift"
              title="New chat"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={onShowHistory}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200 hover-lift"
              title="Chat history"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              onClick={onExportChat}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200 hover-lift"
              title="Export chat"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onSettingsClick}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200 hover-lift"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200"
            >
              {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-2 min-w-[160px] z-50">
                <button
                  onClick={() => {
                    onNewChat?.()
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Chat</span>
                </button>
                <button
                  onClick={() => {
                    onShowHistory?.()
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md"
                >
                  <History className="w-4 h-4" />
                  <span>History</span>
                </button>
                <button
                  onClick={() => {
                    onExportChat?.()
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <hr className="my-1 border-neutral-200" />
                <button
                  onClick={() => {
                    onSettingsClick()
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
