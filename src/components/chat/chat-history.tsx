'use client'

import React from 'react'
import { Chat } from '@/store/chat-store'
import { X, MessageSquare, Trash2 } from 'lucide-react'

interface ChatHistoryProps {
  chats: Chat[]
  currentChatId: string | null
  isOpen: boolean
  onClose: () => void
  onSelectChat: (chatId: string) => void
  onDeleteChat: (chatId: string) => void
  onNewChat: () => void
}

export function ChatHistory({ 
  chats, 
  currentChatId, 
  isOpen, 
  onClose, 
  onSelectChat, 
  onDeleteChat,
  onNewChat 
}: ChatHistoryProps) {
  if (!isOpen) return null

  // Sort chats by most recent first
  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-neutral-200 z-50 slide-up">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">Chat History</h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4 border-b border-neutral-200">
            <button
              onClick={() => {
                onNewChat()
                onClose()
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              New Chat
            </button>
          </div>
          
          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {sortedChats.length === 0 ? (
              <div className="p-4 text-center text-neutral-500">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No chats yet</p>
                <p className="text-xs mt-1">Start a conversation to see your chat history</p>
              </div>
            ) : (
              <div className="p-2">
                {sortedChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                      chat.id === currentChatId
                        ? 'bg-neutral-100 border border-neutral-200'
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div 
                      className="flex-1 min-w-0"
                      onClick={() => {
                        onSelectChat(chat.id)
                        onClose()
                      }}
                    >
                      <h3 className="font-medium text-neutral-900 truncate text-sm">
                        {chat.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-neutral-500">
                          {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-xs text-neutral-400">•</span>
                        <span className="text-xs text-neutral-500">
                          {new Date(chat.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteChat(chat.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-500 transition-all"
                      title="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
