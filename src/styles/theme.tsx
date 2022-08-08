/* eslint-disable no-restricted-syntax */
import { css } from 'styled-components'

const colorPalette = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
}

const themes = {
  light: {
    color: {
      background: colorPalette.white,
      text: colorPalette.slate[500],
      heading: colorPalette.slate[900],
      link: colorPalette.indigo[700],
    },
  },
  dark: {
    color: {
      background: colorPalette.slate[900],
      text: colorPalette.slate[400],
      heading: colorPalette.slate[100],
      link: colorPalette.indigo[300],
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

const lightTheme = toVars(themes.light)
const darkTheme = toVars(themes.dark)

const theme = css`
  :root,
  :root[data-theme='light'] {
    ${lightTheme}
  }

  // Fallback styles if JS disabled
  @media (prefers-color-scheme: dark) {
    :root {
      ${darkTheme}
    }
  }
  :root[data-theme='dark'] {
    ${darkTheme}
  }
`

export default theme
