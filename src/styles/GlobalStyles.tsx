import { createGlobalStyle } from 'styled-components'
import normalize from '@/styles/_normalize'
import reset from '@/styles/_reset'
import theme from '@/styles/theme'
import base from '@/styles/base'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}
  ${theme}
  ${base}
`

export default GlobalStyle
