import { useState, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'

import { isLoggedIn } from '../../util'

import Header from '../../components/Header'
import InputForm from '../../components/InputForm'
import Alert from '../../components/Alert'

import { Box, Button, Heading, Center, HStack, Link } from '@chakra-ui/react'
import { FiCoffee } from 'react-icons/fi'

const Signin: WithGetAccessControl<VFC> = () => {
  const [alert, setAlert] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const methods = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase)

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        router.push('/user/timeline')
      })
      .catch((error: any) => {
        const errorCode = error.code
        if (
          String(errorCode) === 'auth/user-not-found' ||
          String(errorCode) === 'auth/wrong-password'
        ) {
          setAlert(true)
          setMessage(
            'ご入力いただいたメールアドレスまたはパスワードは間違っています'
          )
        }
        if (String(errorCode) === 'auth/too-many-requests') {
          setAlert(true)
          setMessage('しばらくしてからログインしてください')
        }
      })
  }
  return (
    <Box
      background="#988d83"
      backgroundImage="linear-gradient(62deg, #988d83 0%, #f7dcae 100%)"
      pb="400px"
    >
      <Head>
        <title>Sign-In</title>
        <meta name="Sign-In" content="ユーザーサインイン" />
      </Head>
      <Header />
      <Alert alert={alert} setAlert={setAlert} message={message} />

      <Box w={{ base: '80%', md: '65%' }} ml="auto" mr="auto">
        <Box
          my={12}
          p={8}
          mt="70px"
          borderRadius="16px"
          backgroundColor="orange.50"
          boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
        >
          <Center h="50px" mb="25px">
            <HStack color="brand.color1">
              <FiCoffee />
              <Heading as="h2" size="md">
                Welcome Back!
              </Heading>
            </HStack>
          </Center>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputForm
                theme="email"
                text="メールアドレス"
                type="email"
                validation={{
                  required: true,
                }}
                errorMessage="必須項目です"
              />
              <InputForm
                theme="password"
                text="パスワード"
                type="password"
                validation={{
                  required: true,
                  minLength: 6,
                }}
                errorMessage="必須項目です・6文字以上入力してください"
              />
              <Center mt="10px">
                <Button
                  backgroundColor="brand.color2"
                  color="white"
                  _hover={{ background: '#c58573' }}
                  mt={4}
                  type="submit"
                >
                  ログイン
                </Button>
              </Center>
            </form>
          </FormProvider>
          <Center mt="30px" fontSize="sm">
            <Link href="/user/signup">
              COFFEE CLIPのアカウントを作成する場合はこちら
            </Link>
          </Center>
        </Box>
      </Box>
    </Box>
  )
}

Signin.getAccessControl = async () => {
  return (await isLoggedIn())
    ? { type: 'replace', destination: '/user/timeline' }
    : null
}

export default Signin
