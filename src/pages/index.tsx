import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const IndexPage: NextPage = () => (
  <>
    <Head>{/* <title></title> */}</Head>
    <main>
      <h1>Index Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nam
        magnam nulla explicabo ipsa, <Link href="#root">I AM A LINK</Link>{' '}
        nostrum ut dolorum dicta sed, blanditiis repellat neque maiores iste
        fugiat facere quam accusamus architecto animi.
      </p>
    </main>
  </>
)

export default IndexPage
