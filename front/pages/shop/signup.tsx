import { useState, VFC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useForm, FormProvider } from 'react-hook-form'
import axios from 'axios'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'
import { isLoggedIn } from '../../util'

import Header from '../../components/Header'
import InputForm from '../../components/InputForm'
import Message from '../../components/Message'

import { Button, Box, Heading, HStack, Center, Link } from '@chakra-ui/react'
import { FiCoffee } from 'react-icons/fi'

type newShopInfo = {
  auth_id: string
  handle_name: string
  display_name: string
}

const Signup: WithGetAccessControl<VFC> = () => {
  const [message, setMessage] = useState<string>()

  const methods = useForm()
  const router = useRouter()

  const postShopInfo = (authId: string, data: any) => {
    const newShopInfo: newShopInfo = {
      auth_id: authId,
      handle_name: data.handle_name,
      display_name: data.display_name,
    }
    axios
      .post('/api/shops', newShopInfo)
      .then(() => {
        router.push('/shop/dashboard')
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase)

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        if (userCredential) {
          postShopInfo(userCredential.user.uid, data)
        }
      })
      .catch((error: any) => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/email-already-in-use') {
          setMessage('そのアドレスはすでに登録されています')
        }
        console.log(errorCode, errorMessage)
      })
  }
  return (
    <Box
      background="#988d83"
      backgroundImage="linear-gradient(62deg, #988d83 0%, #f7dcae 100%)"
      pb="135px"
    >
      <Head>
        <title>Sign-Up</title>
        <meta name="Sign-Up" content="Shop サインアップ" />
      </Head>
      <Header />
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
                Welcome to COFFEE CLIP
              </Heading>
            </HStack>
          </Center>
          {message && <Message message={message} />}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputForm
                theme="display_name"
                text="店舗名"
                validation={{
                  required: true,
                }}
                errorMessage="必須項目です"
              />
              <InputForm
                theme="handle_name"
                text="店舗のID名"
                validation={{
                  required: true,
                  maxLength: 20,
                }}
                errorMessage="必須項目です・20文字以内で入力してください"
              />
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
                  店舗アカウントを作成
                </Button>
              </Center>
            </form>
          </FormProvider>
          <Center mt="30px" fontSize="sm">
            <Link href="/shop/signin">
              COFFEE CLIPの店舗アカウントをお持ちですか？ログインはこちら
            </Link>
          </Center>
        </Box>
      </Box>
    </Box>
  )
}

Signup.getAccessControl = async () => {
  return (await isLoggedIn())
    ? { type: 'replace', destination: '/shop/dashboard' }
    : null
}

export default Signup
