import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thai Ngoc Quyen',
  description: 'NgocQuyen Portfolio',
  generator: 'Thai Ngoc Quyen',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Thai Ngoc Quyen',
    description: 'Check out my portfolio!',
    url: 'https://thaingocquyen.vercel.app',
    siteName: 'Thai Ngoc Quyen',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thai Ngoc Quyen Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thai Ngoc Quyen',
    description: 'Check out my portfolio!',
    images: ['/og-image.png'],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
