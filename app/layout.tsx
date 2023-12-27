import './globals.css'
import type { Metadata } from 'next'
// import { Fira_Code } from 'next/font/google'
import { GeistMono } from 'geist/font'

// const fira = Fira_Code({ subsets: ['latin'] , weight:['300','400','500','600','700'] });

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Created by Techlism @ https://github.com/techlism',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>{children}</body>
    </html>
  )
}
