import { css } from 'styled-components'

const base = css`
  html {
    font-size: 62.5%; //define the size of 1rem = 10px = 10/16 * 16px = 62.5% * 16px
  }

  body {
    font-family: Mulish, system-ui, -apple-system, sans-serif;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.5;
    background-color: var(--color-background);
    color: var(--color-text);
  }

  // prettier-ignore
  h1, h2, h3, h4, h5, h6 {
    font-family: Roboto, system-ui, -apple-system, sans-serif;
    font-weight: 700;
    text-align: center;
    color: var(--color-heading);
  }

  a {
    color: var(--color-link);
  }
`

export default base
