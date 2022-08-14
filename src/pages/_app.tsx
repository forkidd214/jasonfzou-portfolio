import type { AppProps } from 'next/app'
import GlobleStyles from '@components/styles'
import { ThemeProvider } from 'contexts/theme-context'
import Layout from '@components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobleStyles />
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
