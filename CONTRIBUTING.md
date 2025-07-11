# Contributing to Timi Chat

Thank you for your interest in contributing to Timi Chat! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/timi-chat/issues)
2. If not, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node.js version)

### Suggesting Features

1. Check existing [Issues](https://github.com/yourusername/timi-chat/issues) for similar suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use case and motivation
   - Possible implementation approach

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/timi-chat.git
   cd timi-chat
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy environment file:
   ```bash
   cp .env.example .env.local
   ```
5. Add your API keys to `.env.local`
6. Start development server:
   ```bash
   npm run dev
   ```

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test your changes thoroughly
4. Run linting and type checking:
   ```bash
   npm run lint
   npm run type-check
   ```
5. Commit your changes:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Create a Pull Request

### Pull Request Guidelines

- Use a clear, descriptive title
- Describe what changes you made and why
- Include screenshots for UI changes
- Make sure all tests pass
- Keep changes focused and atomic
- Update documentation if needed

### Code Style

- Follow existing code patterns
- Use TypeScript for type safety
- Follow React and Next.js best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Adding New AI Providers

To add support for a new AI provider:

1. Update `src/types/chat.ts`:
   - Add new provider to `AIProvider` enum
   - Add models to `AIModel` type

2. Update `src/lib/api.ts`:
   - Add API integration function
   - Handle provider-specific request/response format

3. Update `src/store/settings-store.ts`:
   - Add provider to default settings
   - Update provider options

4. Update documentation:
   - Add provider to README.md
   - Update environment variables example

### Testing

- Test your changes across different browsers
- Test with different AI providers
- Test responsive design on mobile devices
- Verify accessibility features work properly

### Documentation

- Update README.md for new features
- Add inline code comments for complex logic
- Update type definitions
- Include examples in documentation

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the project's coding standards

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Ask in pull request comments
- Contact the maintainers

Thank you for contributing to Timi Chat! 🚀
