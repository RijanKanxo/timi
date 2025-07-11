# Timi - Multi-LLM Chat Interface

A modern, minimalistic chat interface that supports multiple Large Language Model (LLM) providers. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Timi Screenshot](./docs/screenshot.png)

## Features

- 🤖 **Multiple AI Providers**: Support for OpenAI, Anthropic Claude, Google Gemini, OpenRouter, Mistral, Qwen, and Grok
- 💬 **Multi-Chat Management**: Create and manage multiple chat sessions with automatic naming
- 🎨 **Minimalistic Design**: Clean, professional interface with subtle grainy texture
- 📱 **Responsive**: Fully responsive design that works on desktop and mobile
- ⚡ **Real-time**: Instant message streaming and responses
- 💾 **Persistent Storage**: Chat history is saved locally in browser storage
- 🔧 **Configurable**: Adjustable settings for response length, temperature, and model selection

## Supported AI Models

### OpenAI
- GPT-4o, GPT-4o Mini
- GPT-4 Turbo, GPT-4
- GPT-3.5 Turbo

### Anthropic
- Claude 3.5 Sonnet, Claude 3 Opus
- Claude 3 Sonnet, Claude 3 Haiku

### Google
- Gemini Pro, Gemini Pro Vision

### OpenRouter (40+ models)
- Meta Llama models
- Mistral AI models
- Anthropic models via OpenRouter
- And many more...

### Other Providers
- Mistral AI (Mistral Large, Mistral Medium)
- Qwen (Qwen2.5 series)
- Grok (xAI's model)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for your chosen LLM providers

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/timi-chat.git
cd timi-chat
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:
```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Google
GOOGLE_API_KEY=your_google_api_key

# OpenRouter
OPENROUTER_API_KEY=your_openrouter_api_key

# Mistral
MISTRAL_API_KEY=your_mistral_api_key

# Qwen
QWEN_API_KEY=your_qwen_api_key

# Grok
GROK_API_KEY=your_grok_api_key
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with minimalistic design
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── providers.tsx     # Context providers
│   └── chat/             # Chat-related components
│       ├── chat-history.tsx      # Chat history sidebar
│       ├── chat-interface.tsx    # Main chat interface
│       ├── header.tsx            # Application header
│       ├── message-input.tsx     # Message input component
│       ├── message-list.tsx      # Message display component
│       └── settings-panel.tsx    # Settings configuration
├── lib/                   # Utility libraries
│   ├── api.ts            # API integration for LLM providers
│   ├── file-processor.ts # File processing utilities
│   └── utils.ts          # General utility functions
├── store/                 # State management
│   ├── chat-store.ts     # Chat state management (Zustand)
│   └── settings-store.ts # Settings state management
└── types/                 # TypeScript type definitions
    └── chat.ts           # Chat-related types
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with your API keys. You only need to add keys for the providers you plan to use.

### Settings

The application includes a settings panel where you can:
- Choose your preferred AI provider and model
- Adjust response length (token limit)
- Set creativity level (temperature)
- Configure brief response mode

## API Integration

The app integrates with multiple LLM providers through their respective APIs:

- **OpenAI**: Uses the official OpenAI API
- **Anthropic**: Uses Claude API via Anthropic
- **Google**: Uses Gemini API
- **OpenRouter**: Provides access to 40+ models through a single API
- **Mistral**: Direct integration with Mistral AI
- **Qwen**: Alibaba's large language model
- **Grok**: xAI's conversational AI model

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Adding New Providers

To add a new LLM provider:

1. Update `src/types/chat.ts` with new provider and models
2. Add API integration in `src/lib/api.ts`
3. Update the settings store in `src/store/settings-store.ts`
4. Add environment variables for API keys

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Markdown rendering with [react-markdown](https://github.com/remarkjs/react-markdown)
- State management with [Zustand](https://github.com/pmndrs/zustand)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/timi-chat/issues) on GitHub.

---

Made with ❤️ for the AI community
