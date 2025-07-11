import { APIRequest, Provider, ProviderConfig } from '@/types/chat'

const PROVIDER_CONFIGS: Record<Provider, ProviderConfig> = {
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    headers: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }),
    formatRequest: (messages, model, options = {}) => ({
      model,
      messages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
    }),
    parseResponse: (response) => response.choices[0].message.content,
  },
  anthropic: {
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com/v1/messages',
    models: ['claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307', 'claude-3-opus-20240229'],
    headers: (apiKey: string) => ({
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    }),
    formatRequest: (messages, model, options = {}) => ({
      model,
      messages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
    }),
    parseResponse: (response) => response.content[0].text,
  },
  google: {
    name: 'Google',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
    headers: () => ({
      'Content-Type': 'application/json',
    }),
    formatRequest: (messages, model, options = {}) => ({
      contents: messages.map(msg => ({
        parts: [{ text: msg.content }],
        role: msg.role === 'assistant' ? 'model' : 'user',
      })),
    }),
    parseResponse: (response) => response.candidates[0].content.parts[0].text,
  },
  openrouter: {
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    models: [
      'openai/gpt-4',
      'openai/gpt-4-turbo',
      'openai/gpt-3.5-turbo',
      'anthropic/claude-3.5-sonnet',
      'anthropic/claude-3-opus',
      'anthropic/claude-3-haiku',
      'google/gemini-pro',
      'google/gemini-pro-vision',
      'meta-llama/llama-3.1-405b-instruct',
      'meta-llama/llama-3.1-70b-instruct',
      'meta-llama/llama-3.1-8b-instruct',
      'mistralai/mistral-large',
      'mistralai/mistral-medium',
      'mistralai/mixtral-8x7b-instruct',
      'perplexity/llama-3.1-sonar-large-128k-online',
      'cohere/command-r-plus',
      'databricks/dbrx-instruct',
      'microsoft/wizardlm-2-8x22b',
      'qwen/qwen-2-72b-instruct',
      'deepseek/deepseek-coder',
    ],
    headers: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
      'X-Title': 'Timi Chat',
    }),
    formatRequest: (messages, model, options = {}) => ({
      model,
      messages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
    }),
    parseResponse: (response) => response.choices[0].message.content,
  },
  mistral: {
    name: 'Mistral AI',
    baseUrl: 'https://api.mistral.ai/v1/chat/completions',
    models: ['mistral-large', 'mistral-medium', 'mistral-small'],
    headers: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }),
    formatRequest: (messages, model, options = {}) => ({
      model,
      messages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
    }),
    parseResponse: (response) => response.choices[0].message.content,
  },
  qwen: {
    name: 'Qwen',
    baseUrl: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    models: ['qwen-max', 'qwen-plus', 'qwen-turbo'],
    headers: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }),
    formatRequest: (messages, model, options = {}) => ({
      model,
      input: {
        messages,
      },
      parameters: {
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
      },
    }),
    parseResponse: (response) => response.output.choices[0].message.content,
  },
  grok: {
    name: 'Grok (xAI)',
    baseUrl: 'https://api.x.ai/v1/chat/completions',
    models: ['grok-beta', 'grok-vision-beta'],
    headers: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }),
    formatRequest: (messages, model, options = {}) => ({
      model,
      messages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
    }),
    parseResponse: (response) => response.choices[0].message.content,
  },
}

export async function callLLMAPI(request: APIRequest): Promise<string> {
  const config = PROVIDER_CONFIGS[request.provider]
  if (!config) {
    throw new Error(`Unsupported provider: ${request.provider}`)
  }

  let url = config.baseUrl
  
  // Special handling for Google Gemini
  if (request.provider === 'google') {
    url = `${config.baseUrl}/${request.model}:generateContent?key=${request.apiKey}`
  }

  const headers = config.headers(request.apiKey)
  const body = config.formatRequest(request.messages, request.model, {
    maxTokens: request.maxTokens,
    temperature: request.temperature,
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.error?.message || 
        errorData.message || 
        `HTTP ${response.status}: ${response.statusText}`
      )
    }

    const data = await response.json()
    return config.parseResponse(data)
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred')
  }
}

export function getProviderDisplayName(provider: Provider): string {
  return PROVIDER_CONFIGS[provider]?.name || provider
}

export function getAvailableModels(provider: Provider): string[] {
  return PROVIDER_CONFIGS[provider]?.models || []
}
