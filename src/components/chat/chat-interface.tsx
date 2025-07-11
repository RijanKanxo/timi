'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Header } from './header'
import { MessageList } from './message-list'
import { MessageInput } from './message-input'
import { SettingsPanel } from './settings-panel'
import { ChatHistory } from './chat-history'
import { useChatStore } from '@/store/chat-store'
import { useSettingsStore } from '@/store/settings-store'
import { Message } from '@/types/chat'
import { generateId } from '@/lib/utils'
import { callLLMAPI } from '@/lib/api'

export function ChatInterface() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { 
    chats,
    getCurrentMessages, 
    addMessage, 
    updateMessage, 
    clearMessages, 
    createNewChat,
    switchToChat,
    deleteChat,
    currentChatId 
  } = useChatStore()
  const messages = getCurrentMessages()
  const { 
    currentProvider, 
    apiKeys, 
    models,
    systemPrompt,
    maxTokens,
    temperature,
    updateProvider,
    updateApiKey,
    updateModel 
  } = useSettingsStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleNewChat = () => {
    createNewChat()
  }

  const handleExportChat = () => {
    const chatData = {
      messages,
      exportedAt: new Date().toISOString(),
      provider: currentProvider
    }
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `timi-chat-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShowHistory = () => {
    setIsHistoryOpen(true)
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const apiKey = apiKeys[currentProvider]
    if (!apiKey) {
      console.error(`Please configure your ${currentProvider.toUpperCase()} API key in settings`)
      setIsSettingsOpen(true)
      return
    }

    setIsLoading(true)

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
      provider: currentProvider
    }
    addMessage(userMessage)

    // Add assistant message placeholder
    const assistantMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      provider: currentProvider,
      isLoading: true
    }
    addMessage(assistantMessage)

    try {
      // Prepare messages for API with system prompt
      const apiMessages = [
        { role: 'system' as any, content: systemPrompt },
        ...messages.map(msg => ({ role: msg.role as any, content: msg.content })),
        { role: 'user' as any, content }
      ]

      const response = await callLLMAPI({
        provider: currentProvider,
        apiKey,
        model: models[currentProvider],
        messages: apiMessages,
        maxTokens,
        temperature
      })

      updateMessage(assistantMessage.id, {
        content: response,
        isLoading: false
      })
    } catch (error) {
      console.error('Error calling API:', error)
      updateMessage(assistantMessage.id, {
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        isLoading: false,
        isError: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      <Header 
        onSettingsClick={() => setIsSettingsOpen(true)}
        onNewChat={handleNewChat}
        onExportChat={handleExportChat}
        onShowHistory={handleShowHistory}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          <MessageList 
            messages={messages}
            isLoading={isLoading}
          />
          <div ref={messagesEndRef} />
          
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={isLoading}
            placeholder="Type your message..."
          />
        </div>
      </div>

      {isSettingsOpen && (
        <SettingsPanel 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          currentProvider={currentProvider}
          onProviderChange={updateProvider}
          apiKeys={apiKeys}
          onApiKeyChange={updateApiKey}
          currentModel={models}
          onModelChange={updateModel}
        />
      )}

      <ChatHistory
        chats={chats}
        currentChatId={currentChatId}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectChat={switchToChat}
        onDeleteChat={deleteChat}
        onNewChat={handleNewChat}
      />
    </div>
  )
}
