import { css } from 'styled-components'

/// Breakpoints
/* prettier-ignore */
export const breakpoints = {
  sm: '40em', // 640px ~
  md: '48em',  // 768px ~
  lg: '64em', // 1024px ~
  xl: '80em', // 1280px ~
  '2xl': '96em' // 1536px ~
};

type CssParams = Parameters<typeof css>
const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>

export const respondTo = keys.reduce((acc, key) => {
  acc[key] = (...args: CssParams) => css`
    @media (min-width: ${breakpoints[key]}) {
      ${css(...args)};
    }
  `
  return acc
}, {} as Record<keyof typeof breakpoints, Function>)

export const clearfix = css`
  @mixin clearfix {
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }
`

export const absoluteCenter = css`
  @mixin absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
