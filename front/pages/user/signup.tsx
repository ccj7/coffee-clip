import { VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import axios from 'axios'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import Header from '../../components/shop/Header'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'

import { Button } from '@chakra-ui/react'

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
    <div>
      <Head>
        <title>ユーザー Sign-Up</title>
        <meta name="Sign-Up" content="ユーザー サインアップ" />
      </Head>
      <Header />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm thema="display_name" text="ユーザーネーム" />
          <InputForm thema="handle_name" text="ユーザーID" />
          <InputForm thema="email" text="メールアドレス" />
          <InputForm thema="password" text="パスワード" />
          <ImageUpload size="sm" thema="icon" text="アイコン画像" />
          <Button mt={4} type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

Signup.getAccessControl = async () => {
  return (await isLoggedIn())
    ? { type: 'replace', destination: '/user/timeline' }
    : null
}

export default Signup
