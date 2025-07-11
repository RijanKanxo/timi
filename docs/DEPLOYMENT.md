# Deployment Guide

This guide covers various deployment options for Timi Chat.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git repository
- API keys for your chosen LLM providers

## Environment Variables

Before deploying, ensure you have all necessary environment variables:

```bash
# Required for OpenAI
OPENAI_API_KEY=your_openai_api_key

# Required for Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Required for Google
GOOGLE_API_KEY=your_google_api_key

# Required for OpenRouter
OPENROUTER_API_KEY=your_openrouter_api_key

# Optional providers
MISTRAL_API_KEY=your_mistral_api_key
QWEN_API_KEY=your_qwen_api_key
GROK_API_KEY=your_grok_api_key
```

## Vercel (Recommended)

Vercel provides the easiest deployment experience for Next.js applications.

### 1. Prepare Repository

```bash
# Make sure your code is in a Git repository
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts to configure your project
# Add environment variables when prompted
```

#### Option B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your repository
5. Configure environment variables
6. Deploy

### 3. Configure Environment Variables

In the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all your API keys
4. Redeploy if needed

### 4. Custom Domain (Optional)

1. Go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Netlify

### 1. Build Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Deploy

#### Option A: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

#### Option B: Git Integration

1. Connect your repository to Netlify
2. Configure build settings
3. Add environment variables
4. Deploy

## Railway

### 1. Prepare Railway Configuration

Create `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add environment variables
railway variables set OPENAI_API_KEY=your_key

# Deploy
railway up
```

## DigitalOcean App Platform

### 1. App Spec Configuration

Create `.do/app.yaml`:

```yaml
name: timi-chat
services:
- name: web
  source_dir: /
  github:
    repo: yourusername/timi-chat
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: OPENAI_API_KEY
    value: YOUR_OPENAI_API_KEY
    type: SECRET
```

### 2. Deploy

1. Go to DigitalOcean App Platform
2. Create new app from GitHub
3. Configure environment variables
4. Deploy

## AWS Amplify

### 1. Amplify Configuration

Create `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 2. Deploy

1. Go to AWS Amplify Console
2. Connect your repository
3. Configure build settings
4. Add environment variables
5. Deploy

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. Build and Run

```bash
# Build image
docker build -t timi-chat .

# Run container
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_key \
  -e ANTHROPIC_API_KEY=your_key \
  timi-chat
```

### 3. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
```

## VPS/Server Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx (optional, for reverse proxy)
sudo apt install nginx
```

### 2. Deploy Application

```bash
# Clone repository
git clone https://github.com/yourusername/timi-chat.git
cd timi-chat

# Install dependencies
npm ci

# Build application
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'timi-chat',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      OPENAI_API_KEY: 'your_key_here',
      // Add other environment variables
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Nginx Configuration (Optional)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] Application starts without errors
- [ ] All AI providers are working
- [ ] Chat functionality is working
- [ ] Settings are persisted
- [ ] Mobile responsiveness is working
- [ ] HTTPS is configured (for production)
- [ ] Domain is pointing to the correct server
- [ ] Monitoring is set up (optional)
- [ ] Backup strategy is in place (optional)

## Monitoring and Maintenance

### Health Checks

Add a health check endpoint in your Next.js app:

```typescript
// pages/api/health.ts
export default function handler(req: any, res: any) {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
}
```

### Log Monitoring

- Set up log aggregation (e.g., LogDNA, Papertrail)
- Monitor for errors and performance issues
- Set up alerts for critical issues

### Performance Monitoring

- Use tools like Vercel Analytics or Google Analytics
- Monitor Core Web Vitals
- Track API response times
- Monitor user engagement metrics

## Troubleshooting

### Common Issues

1. **Build failures**: Check Node.js version and dependencies
2. **API errors**: Verify environment variables and API keys
3. **404 errors**: Ensure proper routing configuration
4. **Performance issues**: Check bundle size and optimize if needed
5. **CORS errors**: Configure proper headers for your domain

### Debug Mode

Enable debug logging by setting:

```bash
DEBUG=* npm start
```

For production debugging, add console.log statements or use a logging service.
