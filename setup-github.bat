@echo off
echo 🚀 Setting up Timi Chat for GitHub publication...

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Create .env.local from .env.example if it doesn't exist
if not exist ".env.local" (
    if exist ".env.example" (
        echo 📝 Creating .env.local from .env.example...
        copy ".env.example" ".env.local"
        echo ✅ .env.local created. Please add your API keys.
    )
) else (
    echo ℹ️  .env.local already exists
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

REM Run build to ensure everything works
echo 🔨 Testing build...
npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed. Please fix the issues before publishing.
    pause
    exit /b 1
) else (
    echo ✅ Build successful
)

echo.
echo 🎉 Setup complete! Next steps:
echo.
echo 1. Add your GitHub repository as remote:
echo    git remote add origin https://github.com/yourusername/timi-chat.git
echo.
echo 2. Update the following files with your information:
echo    - package.json (repository URLs, author)
echo    - README.md (replace 'yourusername' with your GitHub username)
echo    - SECURITY.md (update email addresses)
echo.
echo 3. Add your API keys to .env.local
echo.
echo 4. Take screenshots and add them to the docs folder
echo.
echo 5. Commit and push to GitHub:
echo    git add .
echo    git commit -m "Initial commit: Timi Chat v1.0.0"
echo    git push -u origin main
echo.
echo 6. Create a release on GitHub for v1.0.0
echo.
echo 📚 Documentation created:
echo    - README.md (main project documentation)
echo    - CONTRIBUTING.md (contribution guidelines)
echo    - LICENSE (MIT license)
echo    - SECURITY.md (security policy)
echo    - CHANGELOG.md (version history)
echo    - docs/API.md (API documentation)
echo    - docs/DEPLOYMENT.md (deployment guide)
echo    - .github/ (issue templates, PR template, CI workflow)
echo.
echo 🔒 Security:
echo    - .env files are in .gitignore
echo    - Security policy created
echo    - CI workflow includes security audit
echo.
echo Your project is now ready for GitHub! 🚀
pause
