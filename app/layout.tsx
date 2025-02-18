import './globals.css'
import { Inter } from 'next/font/google'
import TopNav from "@/app/components/topNav";
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rubarb',
  description: 'the recipe site of the future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={`accent-background p-4 text-gray-900`}>
            <TopNav />
            {children}
        </body>
    </html>
  )
}
