import Head from 'next/head'

import Header from '../../components/shop/Header'
import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import InputForm from '../../components/InputForm'
import { Button } from '@chakra-ui/react'

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'

import { VFC } from 'react'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import axios from 'axios'

let isLogin = false

const Signup: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()
  if (currentUser) isLogin = true

  const methods = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase)
    console.log(data)

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)

        if (userCredential) {
          const postShopInfo = () => {
            const newShopInfo = {
              auth_id: userCredential.user.uid,
              handle_name: data.handle_name,
              display_name: data.display_name,
            }
            console.log(newShopInfo)
            axios.post('/shop', newShopInfo)
          }
          postShopInfo()
          router.push('/shop/signin')
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
        <title>Sign-Up</title>
        <meta name="Sign-Up" content="Shop サインアップ" />
      </Head>
      <Header />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm thema="display_name" text="shop name" />
          <InputForm thema="handle_name" text="shop id" />
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

Signup.getAccessControl = async () => {
  return (await isLoggedIn())
    ? { type: 'replace', destination: '/shop/dashboard' }
    : null
}

export default Signup
