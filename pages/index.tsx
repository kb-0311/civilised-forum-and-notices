import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div style={{width:"100%" , height:"100vh"}} className="my-0 mx-auto -z-1 justify-center align-center flex-row-reversess min-w-fit bg-gradient-to-r from-orange-400 to-orange-500">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

    </div>
  )
}

export default Home
