'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function MessageInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message..." 
}: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t border-neutral-200 bg-white">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                minHeight: '52px',
                maxHeight: '200px',
                height: 'auto',
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="flex items-center justify-center w-12 h-12 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
