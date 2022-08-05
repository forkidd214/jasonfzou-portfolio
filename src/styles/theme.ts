import { css } from 'styled-components'

const theme = css`
  :root,
  :root[data-theme='light'] {
    --color-black: 0 0%;
    --color-primary: 250 30%;
    --color-secondary: 188 80%;

    --background-color: hsl(var(--color-black) 90%);
    --heading-color: hsl(var(--color-primary) 30%);
    --text-color: hsl(var(--color-black) 10%);
    --link-color: hsl(var(--color-secondary) 30%);
  }

  /* // Fallback styles if JS disabled
  @media (prefers-color-scheme: dark) {
    :root {
      --background-color: hsl(var(--color-black) 10%);
      --heading-color: hsl(var(--color-primary) 70%);
      --text-color: hsl(var(--color-black) 90%);
      --link-color: hsl(var(--color-secondary) 80%);
    }
  } */

  :root[data-theme='dark'] {
    --background-color: hsl(var(--color-black) 10%);
    --heading-color: hsl(var(--color-primary) 70%);
    --text-color: hsl(var(--color-black) 90%);
    --link-color: hsl(var(--color-secondary) 70%);
  }
`

export default theme
