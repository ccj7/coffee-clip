import { VFC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'
import { isLoggedIn } from '../../util'

import { useForm, FormProvider } from 'react-hook-form'
import InputForm from '../../components/InputForm'

import Header from '../../components/shop/Header'

import { Button } from '@chakra-ui/react'

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
    <div>
      <Head>
        <title>Sign-In</title>
        <meta name="Sign-In" content="Shop サインイン" />
      </Head>
      <Header />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm thema="email" text="メールアドレス" />
          <InputForm thema="password" text="パスワード" />
          <Button mt={4} type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

Signin.getAccessControl = async () => {
  return (await isLoggedIn())
    ? { type: 'replace', destination: '/shop/dashboard' }
    : null
}

export default Signin
