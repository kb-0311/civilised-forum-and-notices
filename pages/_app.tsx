import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import client from './api/apollo-client'

function MyApp({ Component, pageProps :{session , ...pageProps} }: any) {
  return (
    <ApolloProvider client={client} >
      <SessionProvider session={session}>
        <Toaster/>
          <div className="h-screen  bg-gradient-to-r from-orange-400 to-orange-500 overflow-x-hidden overflow-y-scroll bg-slate-200">
            <Header />
            <Component {...pageProps} />
          </div>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
