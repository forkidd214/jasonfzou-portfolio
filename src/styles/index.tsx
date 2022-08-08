import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import normalize from '@styles/_normalize'
import reset from '@styles/_reset'
import theme from '@styles/theme'
import base from '@styles/base'

const VendersHead = () => (
  <Head>
    <style>
      @import
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      url("https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600&family=Roboto:wght@300;400;700&display=swap")
    </style>
  </Head>
)

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}
  ${theme}
  ${base}
`

const Styles = () => (
  <>
    <VendersHead />
    <GlobalStyle />
  </>
)

export default Styles
