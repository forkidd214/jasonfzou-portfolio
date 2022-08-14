import type { NextPage } from 'next'
// import Head from 'next/head'
import Link from 'next/link'

import styled from 'styled-components'
import { respondTo } from '@components/styles'

const Wrapper = styled.div`
  ${respondTo.sm`
    padding: 0 15%;
  `}

  ${respondTo.lg`
    padding: 0 25%
  `}
`

const IndexPage: NextPage = () => (
  <Wrapper>
    <h1>Index Page</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nam magnam
      nulla explicabo ipsa, <Link href="#root">I AM A LINK</Link> nostrum ut
      dolorum dicta sed, blanditiis repellat neque maiores iste fugiat facere
      quam accusamus architecto animi.
    </p>
  </Wrapper>
)

export default IndexPage
