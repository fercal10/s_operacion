import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <Head >
          <title>Dr.mas</title>
          <link rel="icon" href="/Logo-Dr.Plus.png" />
        </Head>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  )
}
