# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-11

### Added
- Initial release of Timi Chat
- Support for multiple AI providers:
  - OpenAI (GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo)
  - Anthropic (Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku)
  - Google (Gemini Pro, Gemini Pro Vision)
  - OpenRouter (40+ models including Meta Llama, Mistral, etc.)
  - Mistral AI (Mistral Large, Mistral Medium)
  - Qwen (Qwen2.5 series)
  - Grok (xAI's conversational AI)
- Multi-chat management with automatic chat naming
- Chat history sidebar with delete functionality
- Minimalistic design with subtle grainy texture
- Responsive design for desktop and mobile
- Real-time message streaming
- Persistent chat storage in browser
- Configurable settings:
  - Model selection
  - Response length (token limit)
  - Creativity level (temperature)
  - Brief response mode
- Enhanced typography for better readability
- Professional header with Timi branding
- Settings panel with comprehensive options

### Technical Features
- Built with Next.js 14 and TypeScript
- Styled with Tailwind CSS
- State management with Zustand
- Markdown rendering with math and code syntax highlighting
- File processing utilities (prepared for future features)
- Comprehensive error handling
- Type-safe API integrations

### Developer Experience
- Hot reload development environment
- TypeScript for type safety
- ESLint configuration
- Proper project structure
- Environment variable management
- Comprehensive documentation

[1.0.0]: https://github.com/yourusername/timi-chat/releases/tag/v1.0.0
