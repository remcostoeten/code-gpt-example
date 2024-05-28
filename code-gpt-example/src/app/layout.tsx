import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { cn } from "@/core/lib/utils"
import { ReactNode } from "react"
import { TopNav } from "@/components/theme/topnav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeGPT",
  description: "AI Generated Code Prompts",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.className,
          "w-screen h-screen bg-white dark:bg-black text-black dark:text-white",
        )}
      >
        <div className="flex flex-col min-h-screen">
          <TopNav />
        </div>
        {children}
      </body>
    </html>
  )
}
