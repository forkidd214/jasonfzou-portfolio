import { css } from 'styled-components'

const base = css`
  html {
    font-size: 62.5%; //define the size of 1rem = 10px = 10/16 * 16px = 62.5% * 16px
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
    color: var(--text-color);
    background-color: var(--background-color);
  }
`

export default base
