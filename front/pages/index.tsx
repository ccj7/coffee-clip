import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { VFC } from 'react'
import styles from '../styles/Home.module.css'

const Home: WithGetAccessControl<VFC> = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>COFFEE CLIP</title>
        <meta name="COFFEE CLIP" content="COFFEE CLIPのトップページです" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

Home.getAccessControl = async () => {
  return null
}
export default Home
