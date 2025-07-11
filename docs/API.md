# API Documentation

This document describes the API integrations and how to add new providers to Timi Chat.

## Current Providers

### OpenAI
- **Base URL**: `https://api.openai.com/v1`
- **Authentication**: Bearer token
- **Models**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- **Endpoint**: `/chat/completions`

### Anthropic
- **Base URL**: `https://api.anthropic.com`
- **Authentication**: x-api-key header
- **Models**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- **Endpoint**: `/v1/messages`

### Google
- **Base URL**: `https://generativelanguage.googleapis.com`
- **Authentication**: API key as query parameter
- **Models**: Gemini Pro, Gemini Pro Vision
- **Endpoint**: `/v1beta/models/{model}:generateContent`

### OpenRouter
- **Base URL**: `https://openrouter.ai/api/v1`
- **Authentication**: Bearer token
- **Models**: 40+ models from various providers
- **Endpoint**: `/chat/completions`

### Mistral
- **Base URL**: `https://api.mistral.ai`
- **Authentication**: Bearer token
- **Models**: Mistral Large, Mistral Medium
- **Endpoint**: `/v1/chat/completions`

### Qwen
- **Base URL**: `https://dashscope.aliyuncs.com`
- **Authentication**: Bearer token
- **Models**: Qwen2.5 series
- **Endpoint**: `/compatible-mode/v1/chat/completions`

### Grok (xAI)
- **Base URL**: `https://api.x.ai`
- **Authentication**: Bearer token
- **Models**: Grok Beta
- **Endpoint**: `/v1/chat/completions`

## Adding a New Provider

To add a new AI provider, follow these steps:

### 1. Update Types

Add the new provider to `src/types/chat.ts`:

```typescript
export enum AIProvider {
  // ... existing providers
  NEW_PROVIDER = 'new-provider',
}

export const AI_MODELS = {
  // ... existing models
  'new-provider': [
    'new-model-1',
    'new-model-2',
  ],
} as const;
```

### 2. Add API Integration

Add the API function to `src/lib/api.ts`:

```typescript
async function callNewProviderAPI(
  messages: ChatMessage[],
  model: string,
  apiKey: string,
  settings: any
): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch('https://api.newprovider.com/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      max_tokens: settings.maxTokens,
      temperature: settings.temperature,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.body!;
}
```

### 3. Update Main API Function

Add the new provider to the main `sendMessage` function:

```typescript
export async function sendMessage(
  messages: ChatMessage[],
  settings: ChatSettings
): Promise<ReadableStream<Uint8Array>> {
  // ... validation code

  switch (settings.provider) {
    // ... existing cases
    case AIProvider.NEW_PROVIDER:
      if (!process.env.NEW_PROVIDER_API_KEY) {
        throw new Error('New Provider API key not configured');
      }
      return callNewProviderAPI(
        messages,
        settings.model,
        process.env.NEW_PROVIDER_API_KEY,
        settings
      );
    
    default:
      throw new Error(`Unsupported provider: ${settings.provider}`);
  }
}
```

### 4. Update Settings Store

Add the provider to `src/store/settings-store.ts`:

```typescript
const defaultSettings: ChatSettings = {
  provider: AIProvider.OPENAI,
  model: 'gpt-4o',
  maxTokens: 500,
  temperature: 0.3,
  briefResponses: true,
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: defaultSettings,
  // ... rest of the store
}));
```

### 5. Update Environment Variables

Add the new API key to `.env.example`:

```bash
# New Provider API Key
NEW_PROVIDER_API_KEY=your_new_provider_api_key_here
```

### 6. Update Documentation

- Add the provider to README.md
- Update this API documentation
- Add any specific setup instructions

## Error Handling

All API functions should handle common errors:

- **Network errors**: Connection timeouts, DNS failures
- **Authentication errors**: Invalid API keys, expired tokens
- **Rate limiting**: 429 status codes
- **Server errors**: 5xx status codes
- **Invalid requests**: 4xx status codes

Example error handling:

```typescript
if (!response.ok) {
  if (response.status === 401) {
    throw new Error('Invalid API key');
  } else if (response.status === 429) {
    throw new Error('Rate limit exceeded');
  } else if (response.status >= 500) {
    throw new Error('Provider server error');
  } else {
    throw new Error(`API call failed: ${response.statusText}`);
  }
}
```

## Stream Processing

All providers should return a `ReadableStream<Uint8Array>` for consistent streaming:

```typescript
// For Server-Sent Events (SSE)
const stream = new ReadableStream({
  start(controller) {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    
    function pump(): Promise<void> {
      return reader.read().then(({ done, value }) => {
        if (done) {
          controller.close();
          return;
        }
        
        const text = decoder.decode(value, { stream: true });
        // Process SSE format and extract content
        controller.enqueue(new TextEncoder().encode(content));
        return pump();
      });
    }
    
    return pump();
  }
});
```

## Testing

Test new providers with:

1. **Valid requests**: Ensure messages are sent and received correctly
2. **Error scenarios**: Test with invalid API keys, network failures
3. **Rate limiting**: Verify graceful handling of rate limits
4. **Streaming**: Confirm real-time message streaming works
5. **Different models**: Test with all supported models for the provider

## Rate Limiting

Consider implementing rate limiting for production use:

- Track API calls per user/session
- Implement exponential backoff for retries
- Queue requests during high traffic
- Show rate limit status to users
