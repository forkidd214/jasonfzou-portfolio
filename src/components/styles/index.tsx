// import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import normalize from './_normalize'
import reset from './_reset'
import theme from './theme'
import base from './base'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}
  ${theme}
  ${base}
`

export default GlobalStyle
export * from './constants'
export * from './mixins'
export { cssVars } from './theme'
