import { useState, VFC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useForm, FormProvider } from 'react-hook-form'
import axios from 'axios'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'
import { isLoggedIn } from '../../util'

import Header from '../../components/shop/Header'
import InputForm from '../../components/InputForm'
import Message from '../../components/Message'

import { Button } from '@chakra-ui/react'

type newShopInfo = {
  auth_id: string
  handle_name: string
  display_name: string
}

const Signup: WithGetAccessControl<VFC> = () => {
  const [message, setMessage] = useState<string>()

  const methods = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const auth = getAuth(firebase)

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        if (userCredential) {
          const postShopInfo = () => {
            const newShopInfo: newShopInfo = {
              auth_id: userCredential.user.uid,
              handle_name: data.handle_name,
              display_name: data.display_name,
            }
            axios.post('/api/shops', newShopInfo)
          }
          postShopInfo()
          router.push('/shop/dashboard')
        }
      })
      .catch((error: any) => {
        const errorCode = error.code
        const errorMessage = error.message
        if(errorCode === 'auth/email-already-in-use') {
          setMessage('そのアドレスはすでに登録されています')
        }
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
      { message && <Message message={message} /> }
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
