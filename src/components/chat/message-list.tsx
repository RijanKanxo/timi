'use client'

import React from 'react'
import { Message } from '@/types/chat'
import { Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <Bot className="w-12 h-12 mx-auto text-neutral-400" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            Welcome to Timi
          </h3>
          <p className="text-neutral-600 text-sm sm:text-base">
            Your intelligent AI assistant. Configure your API settings to get started, then chat and explore AI capabilities.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 fade-in ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-200 text-neutral-700'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
            </div>
            
            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div
                className={`max-w-2xl ${
                  message.role === 'user' ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-neutral-900 text-white'
                      : 'glass-minimal text-neutral-900'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="whitespace-pre-wrap user-message">{message.content}</p>
                  ) : (
                    <div className="message-content prose prose-sm max-w-none prose-neutral">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                
                {message.timestamp && (
                  <p className={`text-xs text-neutral-500 mt-2 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-4 fade-in">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="max-w-2xl">
                <div className="px-4 py-3 rounded-2xl glass-minimal">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
