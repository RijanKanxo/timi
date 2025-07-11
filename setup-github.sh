#!/bin/bash

# GitHub Setup Script for Timi Chat
# This script helps set up the project for GitHub publication

echo "🚀 Setting up Timi Chat for GitHub publication..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Create .env.local from .env.example if it doesn't exist
if [ ! -f ".env.local" ] && [ -f ".env.example" ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created. Please add your API keys."
else
    echo "ℹ️  .env.local already exists or .env.example not found"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Run build to ensure everything works
echo "🔨 Testing build..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix the issues before publishing."
    exit 1
fi

# Check if remote origin is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📡 No remote origin set. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/timi-chat.git"
else
    echo "✅ Remote origin is set"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Add your GitHub repository as remote (if not done):"
echo "   git remote add origin https://github.com/yourusername/timi-chat.git"
echo ""
echo "2. Update the following files with your information:"
echo "   - package.json (repository URLs, author)"
echo "   - README.md (replace 'yourusername' with your GitHub username)"
echo "   - SECURITY.md (update email addresses)"
echo ""
echo "3. Add your API keys to .env.local"
echo ""
echo "4. Take screenshots and add them to the docs folder"
echo ""
echo "5. Commit and push to GitHub:"
echo "   git add ."
echo "   git commit -m \"Initial commit: Timi Chat v1.0.0\""
echo "   git push -u origin main"
echo ""
echo "6. Create a release on GitHub for v1.0.0"
echo ""
echo "📚 Documentation created:"
echo "   - README.md (main project documentation)"
echo "   - CONTRIBUTING.md (contribution guidelines)"
echo "   - LICENSE (MIT license)"
echo "   - SECURITY.md (security policy)"
echo "   - CHANGELOG.md (version history)"
echo "   - docs/API.md (API documentation)"
echo "   - docs/DEPLOYMENT.md (deployment guide)"
echo "   - .github/ (issue templates, PR template, CI workflow)"
echo ""
echo "🔒 Security:"
echo "   - .env files are in .gitignore"
echo "   - Security policy created"
echo "   - CI workflow includes security audit"
echo ""
echo "Your project is now ready for GitHub! 🚀"
