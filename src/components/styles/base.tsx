import { css } from 'styled-components'
import { cssVars } from './theme'

const base = css`
  html {
    font-size: 62.5%; //define the size of 1rem = 10px = 10/16 * 16px = 62.5% * 16px
  }

  body {
    font-family: ${cssVars.typography.font.family.text};
    font-weight: 500;
    font-size: ${cssVars.typography.font.size.sm};
    line-height: 1.5;
    background-color: ${cssVars.color.background};
    color: ${cssVars.color.text};
  }

  // prettier-ignore
  h1, h2, h3, h4, h5, h6 {
    font-family: ${cssVars.typography.font.family.heading};
    font-weight: 700;
    text-align: center;
    color: ${cssVars.color.primary.dark};
  }

  a {
    color: ${cssVars.color.white};
    background-color: ${cssVars.color.primary.light};
  }
`

export default base
