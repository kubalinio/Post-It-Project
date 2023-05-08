import './globals.css'

import { Roboto } from '@next/font/google'
import QueryWrapper from './auth/QueryWrapper'
import Nav from './auth/Nav'


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto'
})

export const metadata = {
  title: 'Post It Project',
  description: 'Welcome to Post It Project',
  icons: {
    icon: {
      url: '/favicon.png',
      type: 'image/png',
      sizes: '32x32'
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">



      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-gray-200`} >
        <QueryWrapper>

          <Nav />

          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
