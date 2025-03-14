import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "화이트데이 카드",
  description: "화이트데이를 맞아 당신에게 전하는 특별한 마음을 담은 카드입니다.",
  keywords: ["화이트데이", "카드", "선물", "사랑", "추억"],
  authors: [{ name: "당신의 사랑하는 사람" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://whiteday-card.vercel.app/",
    title: "화이트데이 카드 - 당신을 위한 특별한 선물",
    description: "화이트데이를 맞아 당신에게 전하는 특별한 마음을 담은 카드입니다.",
    siteName: "화이트데이 카드",
    images: [
      {
        url: "https://lh3.googleusercontent.com/d/1N0dqfcO2DqeFCQ-T1vEfyCuDog3Is1AN",
        width: 1200,
        height: 630,
        alt: "화이트데이 카드 미리보기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "화이트데이 카드 - 당신을 위한 특별한 선물",
    description: "화이트데이를 맞아 당신에게 전하는 특별한 마음을 담은 카드입니다.",
    images: ["https://lh3.googleusercontent.com/d/1N0dqfcO2DqeFCQ-T1vEfyCuDog3Is1AN"],
  },
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'