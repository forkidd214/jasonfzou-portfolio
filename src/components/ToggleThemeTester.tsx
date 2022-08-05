import styled from 'styled-components'
import * as React from 'react'
import { useTheme } from '@/context/theme-context'
import type { ThemeOption } from '@/context/theme-context'

interface WrapperProps {
  readonly system: boolean
}

const Wrapper = styled.div<WrapperProps>`
  width: 300px;
  margin: 2.5rem auto;
  padding: 2rem;
  background-color: #ffff0035;
  text-align: center;
  font-size: 3rem;
  color: ${(props) => (props.system ? '#989797' : 'green')};

  & > select {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid;
    cursor: pointer;
    color: red;
  }
`

export default function ToggleThemeTester() {
  const { themeOptions, theme, setTheme, resolvedTheme } = useTheme()
  const isSystem = theme === 'system'

  return (
    <Wrapper system={isSystem}>
      {theme ? (
        <>
          <h3>
            {isSystem ? 'system' : 'localStorage'}: {resolvedTheme}
          </h3>
          <select
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
