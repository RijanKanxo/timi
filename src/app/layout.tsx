import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Timi - Multi-LLM Chat Interface',
  description: 'A modern, minimalistic chat interface supporting multiple LLM providers',
  keywords: ['ai', 'chatbot', 'llm', 'openai', 'claude', 'gemini', 'timi'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
