import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { VFC } from 'react'
import styles from '../styles/Home.module.css'
import { Spacer, Text, HStack, Box } from '@chakra-ui/react'

const Home: WithGetAccessControl<VFC> = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>COFFEE CLIP</title>
        <meta name="COFFEE CLIP" content="COFFEE CLIPのトップページです" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box w={'100%'}>
          <HStack p="2" bg="gray.800" color="white">
            <Text fontSize="3xl">COFFEE CLIP</Text>
            <Spacer></Spacer>
          </HStack>
        </Box>

        <Text>Welcom to COFFEE CLIP</Text>
      </main>

      <footer></footer>
    </div>
  )
}

Home.getAccessControl = async () => {
  return null
}
export default Home
