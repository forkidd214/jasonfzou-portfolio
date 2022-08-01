// import '../styles/globals.css'
import GlobalStyle from '@/styles/GlobalStyles'
import type { AppProps } from 'next/app'

import Layout from '@/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
