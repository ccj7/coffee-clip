import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { VFC } from 'react'
import styles from '../styles/Home.module.css'
import { Spacer, Text, HStack, Box, Heading, VStack } from '@chakra-ui/react'
import PrimaryButton from '../components/Button'
import { useRouter } from 'next/router'

const Home: WithGetAccessControl<VFC> = () => {
  const router = useRouter()
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

        <Heading>Welcom to COFFEE CLIP</Heading>
        <Text>COFFEE専門のSNSです☕️</Text>
        <HStack>
          <VStack>
            <Text>USER</Text>
            <PrimaryButton
              text="signup"
              onclick={() => router.push('/user/signup')}
            />
            <PrimaryButton
              text="login"
              onclick={() => router.push('/user/signin')}
            />
          </VStack>
          <VStack>
            <Text>shop</Text>
            <PrimaryButton
              text="signup"
              onclick={() => router.push('/shop/signup')}
            />
            <PrimaryButton
              text="login"
              onclick={() => router.push('/shop/signin')}
            />
          </VStack>
        </HStack>
      </main>

      <footer></footer>
    </div>
  )
}

Home.getAccessControl = async () => {
  return null
}
export default Home
