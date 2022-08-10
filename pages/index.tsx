import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div style={{width:"100%" }} className="mx-auto my-16 -z-1 justify-center align-center flex-row-reversess min-w-fit">
      <Head>
        <title>CIVILISED FORUM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='h-screen max-w-5xl  mx-auto'>
        <PostBox/>
      </div>
    </div>
  )
}

export default Home
