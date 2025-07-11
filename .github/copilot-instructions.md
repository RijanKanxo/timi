# Copilot Instructions for LibreChat

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a LibreChat project - an open-source chatbot interface that supports multiple LLM providers including:
- OpenAI (GPT-3.5, GPT-4)
- Anthropic Claude
- Google Gemini
- OpenRouter
- Azure OpenAI
- And many more

## Key Technologies
- **Frontend**: React with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT-based auth system
- **Real-time**: WebSocket connections

## Development Guidelines
- Follow the existing code structure and patterns
- Use TypeScript when possible
- Follow the component-based architecture
- Maintain compatibility with the plugin system
- Test changes with multiple LLM providers

## Configuration
- Environment variables are managed in `.env` files
- Provider configurations are in `librechat.yaml`
- Custom endpoints can be added through the config system

## Common Tasks
- Adding new LLM providers
- Customizing the UI theme
- Implementing new conversation features
- Managing user authentication
- Configuring rate limiting and usage tracking
