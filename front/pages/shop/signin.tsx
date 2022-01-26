import Head from 'next/head'

import Header from '../../components/shop/Header'
import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import InputForm from '../../components/InputForm'
import { Button } from '@chakra-ui/react'

import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'

import { VFC } from 'react'
import { useAuthContext } from '../auth/AuthContext'

let isLogin = false

const Signin: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()
  if (currentUser) isLogin = true

  const methods = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase)

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user)
        router.push('/shop/dashboard')
      }).catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        router.push('/index')
      })
  }
  return (
    <div>
      <Head>
        <title>Sign-In</title>
        <meta name="Sign-In" content="Shop サインイン" />
      </Head>
      <Header />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm
            thema="email"
            text="メールアドレス"
          />
          <InputForm
            thema="password"
            text="パスワード"
          />
          <Button mt={4} type="submit">
            Submit
          </Button>
          </form>
      </FormProvider>
    </div>
  )
}

Signin.getAccessControl = () => {
  return isLogin ? { type: 'replace', destination: '/user/mypage' } : null
}

export default Signin
