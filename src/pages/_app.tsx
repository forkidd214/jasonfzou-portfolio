// import '../styles/globals.css'
import GlobalStyle from '@/styles/GlobalStyles'
import type { AppProps } from 'next/app'

import { ThemeProvider } from 'context/theme-context'
import Layout from '@/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
