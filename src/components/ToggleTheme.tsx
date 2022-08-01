import styled from 'styled-components'
import { useState } from 'react'

const ToggleButton = styled.button`
  display: block;
  cursor: pointer;
  padding: 1rem;
  background-color: teal;
  border-radius: 5px;
`

export default function ToggleTheme() {
  const [mode, setMode] = useState('light')

  const handleClick = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)

    // update meta
    const meta: any = document.querySelector('meta[name=color-scheme]')
    if (meta) {
      meta.content = newMode === 'dark' ? 'dark light' : 'light dark'
    }
    // update data-color-mode
    document.documentElement.setAttribute('data-color-mode', newMode)
  }

  return (
    <ToggleButton type="button" onClick={handleClick}>
      Current coloe mode: {mode}
    </ToggleButton>
  )
}
