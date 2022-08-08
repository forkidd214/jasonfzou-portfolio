import styled from 'styled-components'
import * as React from 'react'
import { useTheme } from '@contexts/theme-context'
import type { ThemeOption } from '@contexts/theme-context'

interface WrapperProps {
  readonly system: boolean
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: fit-content;
  margin: 2.5rem auto;
  padding: 0.5rem;
  text-align: center;
  font-size: 2rem;
  border: 1px solid;
  border-radius: 10px;

  & svg {
    color: ${(props) => !props.system && `#FECC51`};
    height: 2.5rem;
  }

  & > select {
    position: relative;
    padding: 0.5rem;
    border: 1px solid;
    border-radius: 10px;
    cursor: pointer;
  }
`

export default function ToggleTheme() {
  const { themeOptions, theme, setTheme, resolvedTheme } = useTheme()
  const isSystem = theme === 'system'

  return (
    <Wrapper system={isSystem}>
      {theme ? (
        <>
          <label htmlFor="theme-select">
            {resolvedTheme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
              setTheme(ev.target.value as ThemeOption)
            }
          >
            {themeOptions.map((themeOption) => (
              <option key={themeOption} value={themeOption}>
                {themeOption.toUpperCase()}
              </option>
            ))}
          </select>
        </>
      ) : null}
    </Wrapper>
  )
}
