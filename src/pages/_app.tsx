import type { AppProps } from 'next/app'
import Styles from '@styles'
import { ThemeProvider } from 'contexts/theme-context'
import Layout from '@components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Styles />
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
