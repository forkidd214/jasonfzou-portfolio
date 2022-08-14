/* eslint-disable no-restricted-syntax */
import { css } from 'styled-components'
import { colors, fonts } from './constants'

const commonTheme = {
  typography: {
    font: {
      family: {
        text: `Mulish, ${fonts}`,
        heading: `Roboto, ${fonts}`,
      },
      size: {
        xs: '1.4rem',
        sm: '1.6rem',
        md: '2.0rem',
        lg: '2.4rem',
        xl: '3rem',
      },
    },
  },
}

const themes = {
  // default theme: light
  light: {
    ...commonTheme,
    color: {
      white: colors.white,
      black: colors.black,
      background: colors.white,
      text: colors.slate[500],
      heading: colors.slate[900],

      primary: {
        base: colors.indigo[700],
        light: colors.indigo[500],
        dark: colors.indigo[900],
      },
      secondary: {
        base: colors.violet[700],
        light: colors.violet[500],
        dark: colors.violet[900],
      },
      tertiary: {
        base: colors.blue[700],
        light: colors.blue[500],
        dark: colors.blue[900],
      },
    },
  },
  dark: {
    color: {
      background: colors.slate[900],
      text: colors.slate[400],
      heading: colors.slate[100],

      primary: {
        base: colors.indigo[200],
        light: colors.indigo[400],
        dark: colors.indigo[50],
      },
      secondary: {
        base: colors.violet[200],
        light: colors.violet[400],
        dark: colors.violet[50],
      },
      tertiary: {
        base: colors.blue[200],
        light: colors.blue[400],
        dark: colors.blue[50],
      },
    },
  },
}

// converts the nested theme object with theme values into one with
// the theme variables as the value
// you can get TypeScript autocomplete with generics on this function:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toVarNames<T>(obj: T, prefix: string = '-'): T {
  const vars: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      vars[key] = toVarNames(value, `${prefix}-${key}`)
    } else {
      vars[key] = `var(${prefix}-${key})`
    }
  }
  return vars
}

// converts the nested theme object into a flat object with `--path-to-value` keys
function toVars(obj: Object | string, prefix = '-') {
  const vars: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      const nestedVars = toVars(value, `${prefix}-${key}`)
      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        vars[nestedKey] = nestedValue
      }
    } else {
      vars[`${prefix}-${key}`] = value
    }
  }
  return vars
}

const cssVars = toVarNames(themes.light)

const lightVars = toVars(themes.light)
const darkVars = toVars(themes.dark)

const theme = css`
  :root,
  :root[data-theme='light'] {
    ${lightVars}
  }

  // Fallback styles if JS disabled
  @media (prefers-color-scheme: dark) {
    :root {
      ${darkVars}
    }
  }

  :root[data-theme='dark'] {
    ${darkVars}
  }
`

export default theme
export { cssVars }
