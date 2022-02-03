import { useRef, useState, VFC } from 'react'
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
import Alert from '../../components/Alert'

import { Box, Button, Heading, Center, HStack, Link } from '@chakra-ui/react'
import { FiCoffee } from 'react-icons/fi'
import { async } from '@firebase/util'

const Signup: WithGetAccessControl<VFC> = () => {
  const [alert, setAlert] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const methods = useForm()
  const router = useRouter()

  const checkHandleName = async (handleName: string) => {
    const res = await axios.get(`/api/users/handle/${handleName}`)

    return res.data
  }

  const postUserInfo = (data: UserSignUpInfo, uid: string) => {
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
      .then(() => router.push('/user/timeline'))
      .catch((err: any) => console.error(err))
  }

  const onSubmit = async (data: any) => {
    if (await checkHandleName(data.handle_name)) {
      setAlert(true)
      setMessage('ご記入いただいたユーザーIDは既に使用されています')
    }
    if (!(await checkHandleName(data.handle_name))) {
      const auth = getAuth(firebase)
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          if (userCredential) {
            const user = userCredential.user
            postUserInfo(data, user.uid)
          }
        })
        .catch((error: any) => {
          const errorCode = error.code
          if (String(errorCode) === 'auth/email-already-in-use') {
            setAlert(true)
            setMessage('ご記入いただいたメールアドレスは既に使用されています')
          }
        })
    }
  }
  return (
    <Box
      background="#988d83"
      backgroundImage="linear-gradient(62deg, #988d83 0%, #f7dcae 100%)"
      pb="90px"
    >
      <Head>
        <title>ユーザー Sign-Up</title>
        <meta name="Sign-Up" content="ユーザー サインアップ" />
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
                Welcome to COFFEE CLIP
              </Heading>
            </HStack>
          </Center>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputForm
                theme="display_name"
                text="ユーザーネーム"
                validation={{
                  required: true,
                }}
                errorMessage="必須項目です"
              />
              <InputForm
                theme="handle_name"
                text="ユーザーID"
                validation={{
                  required: true,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
                }}
                errorMessage="必須項目です・20文字以内の半角英数記号で入力してください"
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
                  pattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
                }}
                errorMessage="必須項目です・6文字以上のの半角英数記号で入力してください"
              />
              <ImageUpload size="sm" theme="icon" text="アイコン画像" />
              <Center mt="10px">
                <Button
                  backgroundColor="brand.color2"
                  color="white"
                  _hover={{ background: '#c58573' }}
                  mt={4}
                  type="submit"
                >
                  アカウントを作成
                </Button>
              </Center>
            </form>
          </FormProvider>
          <Center mt="30px" fontSize="sm">
            <Link href="/user/signin">
              COFFEE CLIPのアカウントをお持ちですか？ログインはこちら
            </Link>
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
