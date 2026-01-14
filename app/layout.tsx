import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "iRun Clube+",
  description: "A corrida que recompensa você!",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
