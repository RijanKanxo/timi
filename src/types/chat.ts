export type Provider = 'openai' | 'anthropic' | 'google' | 'openrouter' | 'mistral' | 'qwen' | 'grok'

export type Model = 
  // OpenAI
  | 'gpt-4'
  | 'gpt-4-turbo'
  | 'gpt-3.5-turbo'
  // Anthropic
  | 'claude-3-5-sonnet-20241022'
  | 'claude-3-haiku-20240307'
  | 'claude-3-opus-20240229'
  // Google
  | 'gemini-1.5-pro'
  | 'gemini-1.5-flash'
  // Mistral
  | 'mistral-large'
  | 'mistral-medium'
  | 'mistral-small'
  // Qwen
  | 'qwen-max'
  | 'qwen-plus'
  | 'qwen-turbo'
  // Grok
  | 'grok-beta'
  | 'grok-vision-beta'
  // OpenRouter Models
  | 'openai/gpt-4'
  | 'openai/gpt-4-turbo'
  | 'openai/gpt-3.5-turbo'
  | 'anthropic/claude-3.5-sonnet'
  | 'anthropic/claude-3-opus'
  | 'anthropic/claude-3-haiku'
  | 'google/gemini-pro'
  | 'google/gemini-pro-vision'
  | 'meta-llama/llama-3.1-405b-instruct'
  | 'meta-llama/llama-3.1-70b-instruct'
  | 'meta-llama/llama-3.1-8b-instruct'
  | 'mistralai/mistral-large'
  | 'mistralai/mistral-medium'
  | 'mistralai/mixtral-8x7b-instruct'
  | 'perplexity/llama-3.1-sonar-large-128k-online'
  | 'cohere/command-r-plus'
  | 'databricks/dbrx-instruct'
  | 'microsoft/wizardlm-2-8x22b'
  | 'qwen/qwen-2-72b-instruct'
  | 'deepseek/deepseek-coder'

export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  provider?: Provider
  isLoading?: boolean
  isError?: boolean
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
}

export interface APIMessage {
  role: MessageRole
  content: string
}

export interface APIRequest {
  provider: Provider
  apiKey: string
  model: string
  messages: APIMessage[]
  maxTokens?: number
  temperature?: number
}

export interface ProviderConfig {
  name: string
  baseUrl: string
  models: string[]
  headers: (apiKey: string) => Record<string, string>
  formatRequest: (messages: APIMessage[], model: string, options?: any) => any
  parseResponse: (response: any) => string
}

export interface Settings {
  currentProvider: Provider
  apiKeys: Record<Provider, string>
  models: Record<Provider, Model>
  temperature: number
  maxTokens: number
  systemPrompt: string
}
