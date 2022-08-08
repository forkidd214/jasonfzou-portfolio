import * as React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
// import Terser from 'terser'

/**
 * define types
 */
const THEME_OPTIONS = ['system', 'light', 'dark'] as const
type ThemeOptions = typeof THEME_OPTIONS
export type ThemeOption = typeof THEME_OPTIONS[number]
type ResolvedThemeOption = Exclude<ThemeOption, 'system'>

type ThemeScoutProps = {
  defaultTheme: ThemeOption // most of time, only impact initial render
  storageKey: string
  attribute: string // camelCase naming like [data-color-mode] => "colorMode"
  currentThemeCssProp: string // should follow css properties grammer like "--xxx-xx"
}

type ThemeProviderProps = Partial<ThemeScoutProps> & {
  children: React.ReactNode
}

type UseThemeProps = {
  themeOptions: ThemeOptions
  theme?: ThemeOption
  setTheme: (nextTheme: ThemeOption) => void
  resolvedTheme?: ResolvedThemeOption
}

/**
 * make theme context
 */
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined)
ThemeContext.displayName = 'ThemeContext'

const ThemeProvider = ({
  defaultTheme = 'system',
  storageKey = 'theme',
  attribute = 'theme',
  currentThemeCssProp = '--current-theme',
  children,
}: ThemeProviderProps) => {
  const [theme, rawSetTheme] = React.useState<ThemeOption | undefined>(
    undefined
  )
  const [resolvedTheme, setResolvedTheme] = React.useState<
    ResolvedThemeOption | undefined
  >(undefined)

  // helpers
  const getThemeFromString = React.useCallback(
    (str: string | null) =>
      THEME_OPTIONS.find((e) => e === str) ?? defaultTheme,
    [defaultTheme]
  )

  const applyTheme = React.useCallback(
    (nextTheme: ThemeOption, nextResolvedTheme: ResolvedThemeOption) => {
      // update localstorage
      if (nextTheme === 'system') {
        window.localStorage.removeItem(storageKey)
      } else {
        window.localStorage.setItem(storageKey, nextResolvedTheme)
      }
      // update data attritube & color-scheme
      const root = window.document.documentElement
      root.style.setProperty(currentThemeCssProp, nextTheme)
      root.dataset[attribute] = nextResolvedTheme
      root.style.colorScheme = nextResolvedTheme
    },
    [attribute, currentThemeCssProp, storageKey]
  )

  // initiate theme state onMount from ThemeScout
  React.useEffect(() => {
    // get initialTheme from the css property that set in ThemeScout
    const root = window.document.documentElement
    const initialTheme = getThemeFromString(
      root.style.getPropertyValue(currentThemeCssProp)
    )

    // initiate state
    rawSetTheme(initialTheme)
    setResolvedTheme(getResolvedTheme(initialTheme))
  }, [attribute, defaultTheme, getThemeFromString, currentThemeCssProp])

  // define setTheme
  const setTheme = React.useCallback(
    (nextTheme: ThemeOption) => {
      // strong type checking
      // const nextTheme = getThemeFromString(nextThemeString)
      // const nextTheme = nextThemeString as ThemeOption

      // resolve next theme
      const nextResolvedTheme = getResolvedTheme(nextTheme)

      // update state
      rawSetTheme(nextTheme)
      setResolvedTheme(nextResolvedTheme)

      // apply theme
      applyTheme(nextTheme, nextResolvedTheme)
    },
    [applyTheme]
  )

  // event listner for system preference
  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemPreferenceChange = () => {
      // ignore if persist theme storageKey in localstroage
      const storageValue = window.localStorage.getItem(storageKey)
      const hasStorageKey = typeof storageValue === 'string'
      if (hasStorageKey) {
        return
      }
      setTheme('system')
    }
    mql.addEventListener('change', handleSystemPreferenceChange)
    return () => mql.removeEventListener('change', handleSystemPreferenceChange)
  }, [setTheme, storageKey])

  // event listner for localStorage
  React.useEffect(() => {
    const handleLocalStorageChange = (ev: StorageEvent) => {
      if (ev.key !== storageKey) {
        return
      }
      // if storageValue is valid, then set theme to it
      // otherwise fallback to defaultTheme
      const nextTheme = getThemeFromString(
        window.localStorage.getItem(storageKey)
      )
      setTheme(nextTheme)
    }
    window.addEventListener('storage', handleLocalStorageChange)
    return () => window.removeEventListener('storage', handleLocalStorageChange)
  }, [getThemeFromString, setTheme, storageKey])

  // make context value
  const contextValue = React.useMemo(
    () => ({
      themeOptions: THEME_OPTIONS,
      theme,
      setTheme,
      resolvedTheme,
    }),
    [resolvedTheme, setTheme, theme]
  )

  return (
    <>
      <ThemeScout
        {...{ defaultTheme, storageKey, attribute, currentThemeCssProp }}
      />
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

/**
 * Pre-injected script
 * - Tell ThemeProvider that here's the initial theme, go and initiate states based on it
 * - pre-set styles before react tree mounts to avoid the initial flicking
 *
 * If JS disabled, styles auto fallback to @media(prefers-color-scheme: dark)
 */
const ThemeScout = React.memo(
  ({
    defaultTheme,
    storageKey,
    attribute,
    currentThemeCssProp,
  }: ThemeScoutProps) => {
    /*--------------------------------------------------------------------
    // Only used in DEV to generate minified script
    // or using online REPL https://try.terser.org/
    const getInitialTheme = () => {
      const defaultThemePlaceholder: string = 'DEFAUL_TTHEME_PLACEHOLDER'
      const storageKeyPlaceholder: string = 'STORAGE_KEY_PLACEHOLDER'
      const attributePlaceholder: string = 'ATTRIBUTE_PLACEHOLDER'
      const currentThemeCssPropPlaceholder: string = 'CURRENT_THEME_CSS_PROP'

      const root = window.document.documentElement
      const storageValue = window.localStorage.getItem(storageKeyPlaceholder)
      const hasStorageKey = typeof storageValue === 'string'
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      const hasMediaQueryPreference = typeof mql.matches === 'boolean'
      const systemTheme =
        hasMediaQueryPreference && mql.matches ? 'dark' : 'light'

      const initialTheme = hasStorageKey
        ? storageValue
        : defaultThemePlaceholder
      const resolvedInitialTheme =
        initialTheme !== 'system' ? initialTheme : systemTheme

      root.style.setProperty(currentThemeCssPropPlaceholder, initialTheme)
      root.dataset[attributePlaceholder] = resolvedInitialTheme
      root.style.colorScheme = resolvedInitialTheme
    }

    const boundFn = String(getInitialTheme)
      .replace('DEFAUL_TTHEME_PLACEHOLDER', defaultTheme)
      .replace('STORAGE_KEY_PLACEHOLDER', storageKey)
      .replace('ATTRIBUTE_PLACEHOLDER', attribute)
      .replace('CURRENT_THEME_CSS_PROP', currentThemeCssProp)

    const calledFn = Terser.minify(`(${boundFn})()`).code
    if (!calledFn) {
      throw new Error(
        `Failed on "Terser.minify(getInitialTheme).code", please contact Jason Zou`
      )
    }
    --------------------------------------------------------------------*/

    const calledFn = `
    (()=>{const e=window.document.documentElement,t=window.localStorage.getItem("${storageKey}"),o="string"==typeof t,m=window.matchMedia("(prefers-color-scheme: dark)"),c="boolean"==typeof m.matches&&m.matches?"dark":"light",r=o?t:"${defaultTheme}",s="system"!==r?r:c;e.style.setProperty("${currentThemeCssProp}",r),e.dataset.${attribute}=s,e.style.colorScheme=s})(); 
    `

    return (
      <script
        id="theme-scout"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: calledFn,
        }}
      />
    )
  },
  // never re-render
  () => true
)
ThemeScout.displayName = 'ThemeScout'

/**
 * Helpers
 */
function getSystemTheme() {
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const hasMediaQueryPreference = typeof mql.matches === 'boolean'
  return hasMediaQueryPreference && mql.matches ? 'dark' : 'light'
}

function getResolvedTheme(theme: ThemeOption) {
  return theme !== 'system' ? theme : getSystemTheme()
}

export { ThemeProvider, useTheme }
