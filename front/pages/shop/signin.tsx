import { VFC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'
import { isLoggedIn } from '../../util'

import { useForm, FormProvider } from 'react-hook-form'
import InputForm from '../../components/InputForm'
import Header from '../../components/Header'

import { Box, Button, Heading, Center, HStack, Text } from '@chakra-ui/react'
import { FiCoffee } from 'react-icons/fi'
import Link from 'next/link'

const Signin: WithGetAccessControl<VFC> = () => {
  const methods = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase)

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        router.push('/shop/dashboard')
      })
      .catch((error: any) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }
  return (
    <Box
      background="#988d83"
      backgroundImage="linear-gradient(62deg, #988d83 0%, #f7dcae 100%)"
      pb='400px'>
      <Head>
        <title>Sign-In</title>
        <meta name="Sign-In" content="Shop サインイン" />
      </Head>
      <Header />
      <Box
        w={{ base: '80%', md: '65%' }}
        ml="auto" mr="auto">
        <Box
            my={12} p={8} mt='70px'
            borderRadius='16px'
            backgroundColor='orange.50'
            boxShadow='0px 2px 6px rgba(0, 0, 0, 0.3)'>
            <Box mb='25px'>
              <Center h='50px'>
                <HStack color='brand.color1'>
                  <FiCoffee /> 
                  <Heading as='h2' size='md'>Welcome Back!</Heading>
                </HStack>
              </Center>
              <Center>
                <Text fontSize='sm'>店舗向けログイン画面</Text>
              </Center>
            </Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm thema="email" text="メールアドレス" />
          <InputForm thema="password" text="パスワード" />
          <Center mt='10px'>
            <Button
              backgroundColor='brand.color2'
              color='white'
              _hover={{background: '#c58573'}}
              mt={4}
              type="submit">
              ログイン
            </Button>
          </Center>
        </form>
      </FormProvider>
      <Center mt='30px' fontSize='sm'>
          <Link href='/shop/signup'>COFFEE CLIPの店舗アカウントを作成する場合はこちら</Link>
        </Center>
      </Box>
      </Box>
    </Box>
  )
}

Signin.getAccessControl = async () => {
  return (await isLoggedIn())
    ? { type: 'replace', destination: '/shop/dashboard' }
    : null
}

export default Signin
