import styled from 'styled-components'
// import { respondTo } from '@components/styles'
import Head from 'next/head'
import ToggleTheme from '@components/toggle-theme'
import favicon from '../../public/favicon.ico'

const RootContainer = styled.div`
  min-height: 100vh;
  min-width: 375px;
  display: flex;
  flex-direction: column;
`

type LayoutProps = {
  children: React.ReactNode | undefined
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Jason F. Zou</title>
        <link rel="icon" href={favicon.src} type="image/x-icon" />
      </Head>
      <RootContainer id="#root">
        <header>Header</header>
        <ToggleTheme />
        <main>{children}</main>
        <footer>Footer</footer>
      </RootContainer>
    </>
  )
}
