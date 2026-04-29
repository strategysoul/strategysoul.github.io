import { Playfair_Display, DM_Sans } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Sweta Kumari | StrategySoul',
  description: 'Strategy-driven product professional at the intersection of tech, strategy, and product.',
  authors: [{ name: 'Sweta Kumari' }],
  icons: { icon: '/favicon-knight.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>

      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
