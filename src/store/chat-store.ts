import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Message } from '@/types/chat'

export interface Chat {
  id: string
  name: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatStore {
  chats: Chat[]
  currentChatId: string | null
  isLoading: boolean
  addMessage: (message: Message) => void
  updateMessage: (id: string, updates: Partial<Message>) => void
  deleteMessage: (id: string) => void
  clearMessages: () => void
  setLoading: (loading: boolean) => void
  createNewChat: () => string
  switchToChat: (chatId: string) => void
  renameChat: (chatId: string, name: string) => void
  deleteChat: (chatId: string) => void
  getCurrentMessages: () => Message[]
}

// Helper function to generate chat names
function generateChatName(firstMessage: string): string {
  const words = firstMessage.trim().split(' ').slice(0, 4)
  const name = words.join(' ')
  return name.length > 30 ? name.substring(0, 27) + '...' : name
}

// Helper function to generate IDs
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      isLoading: false,

      createNewChat: () => {
        const newChatId = generateId()
        const newChat: Chat = {
          id: newChatId,
          name: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        set((state) => ({
          chats: [...state.chats, newChat],
          currentChatId: newChatId
        }))
        
        return newChatId
      },

      switchToChat: (chatId) => {
        set({ currentChatId: chatId })
      },

      renameChat: (chatId, name) => {
        set((state) => ({
          chats: state.chats.map(chat =>
            chat.id === chatId ? { ...chat, name, updatedAt: new Date() } : chat
          )
        }))
      },

      deleteChat: (chatId) => {
        set((state) => {
          const remainingChats = state.chats.filter(chat => chat.id !== chatId)
          const newCurrentChatId = state.currentChatId === chatId 
            ? (remainingChats.length > 0 ? remainingChats[0].id : null)
            : state.currentChatId
          
          return {
            chats: remainingChats,
            currentChatId: newCurrentChatId
          }
        })
      },

      getCurrentMessages: () => {
        const state = get()
        if (!state.currentChatId) return []
        const currentChat = state.chats.find(chat => chat.id === state.currentChatId)
        return currentChat?.messages || []
      },

      addMessage: (message) => {
        set((state) => {
          let currentChatId = state.currentChatId
          let chats = [...state.chats]
          
          // If no current chat, create one
          if (!currentChatId) {
            const newChatId = generateId()
            const newChat: Chat = {
              id: newChatId,
              name: 'New Chat',
              messages: [],
              createdAt: new Date(),
              updatedAt: new Date()
            }
            chats.push(newChat)
            currentChatId = newChatId
          }
          
          // Update the current chat
          chats = chats.map(chat => {
            if (chat.id === currentChatId) {
              const updatedMessages = [...chat.messages, message]
              let chatName = chat.name
              
              // Auto-rename if it's the first user message and name is still "New Chat"
              if (message.role === 'user' && chat.name === 'New Chat' && chat.messages.length === 0) {
                chatName = generateChatName(message.content)
              }
              
              return {
                ...chat,
                name: chatName,
                messages: updatedMessages,
                updatedAt: new Date()
              }
            }
            return chat
          })
          
          return { chats, currentChatId }
        })
      },

      updateMessage: (id, updates) => {
        set((state) => ({
          chats: state.chats.map(chat => ({
            ...chat,
            messages: chat.messages.map(msg =>
              msg.id === id ? { ...msg, ...updates } : msg
            ),
            updatedAt: new Date()
          }))
        }))
      },

      deleteMessage: (id) => {
        set((state) => ({
          chats: state.chats.map(chat => ({
            ...chat,
            messages: chat.messages.filter(msg => msg.id !== id),
            updatedAt: new Date()
          }))
        }))
      },

      clearMessages: () => {
        set((state) => {
          if (!state.currentChatId) return state
          
          return {
            chats: state.chats.map(chat =>
              chat.id === state.currentChatId
                ? { ...chat, messages: [], updatedAt: new Date() }
                : chat
            )
          }
        })
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ 
        chats: state.chats,
        currentChatId: state.currentChatId
      }),
    }
  )
)
