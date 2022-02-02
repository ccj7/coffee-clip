import { VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import axios from 'axios'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'
import { isLoggedIn } from '../../util'

import Header from '../../components/Header'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'

import { Box, Button, Heading, Center, HStack, Link } from '@chakra-ui/react'
import { FiCoffee } from 'react-icons/fi'

const Signup: WithGetAccessControl<VFC> = () => {
  const methods = useForm()
  const router = useRouter()

  function userPost(data: UserSignUpInfo, uid: string) {
    axios
      .post(
        '/api/users',
        {
          display_name: data.display_name,
          handle_name: data.handle_name,
          auth_id: uid,
          icon: data.icon,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => console.log(res))
      .catch((res) => console.log(res))
  }

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase)
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        if (userCredential) {
          const user = userCredential.user
          userPost(data, user.uid)
          router.push('/user/timeline')
        }
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
      pb='90px'>
      <Head>
        <title>ユーザー Sign-Up</title>
        <meta name="Sign-Up" content="ユーザー サインアップ" />
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
          <Center h='50px' mb='25px'>
            <HStack color='brand.color1'>
              <FiCoffee /> 
              <Heading as='h2' size='md'>Welcome to COFFEE CLIP</Heading>
            </HStack>
          </Center>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputForm thema="display_name" text="ユーザーネーム" />
              <InputForm thema="handle_name" text="ユーザーID" />
              <InputForm thema="email" text="メールアドレス" />
              <InputForm thema="password" text="パスワード" />
              <ImageUpload size="sm" thema="icon" text="アイコン画像" />
              <Center mt='10px'>
                <Button
                  backgroundColor='brand.color2'
                  color='white'
                  _hover={{background: '#c58573'}}
                  mt={4}
                  type="submit">
                  アカウントを作成
                </Button>
              </Center>
            </form>
          </FormProvider>
          <Center mt='30px' fontSize='sm'>
            <Link href='/user/signin'>COFFEE CLIPのアカウントをお持ちですか？ログインはこちら</Link>
          </Center>
        </Box>
      </Box>
    </Box>
  )
}

Signup.getAccessControl = async () => {
  return (await isLoggedIn())
    ? { type: 'replace', destination: '/user/timeline' }
    : null
}

export default Signup
