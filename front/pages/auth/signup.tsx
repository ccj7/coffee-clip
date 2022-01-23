import Head from 'next/head'

import Header from '../../components/shop/Header'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'

function Signup() {

  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    console.log(data)
    console.log(process.env.NEXT_PUBLIC_FIREBASE_APIKEY)
    const auth = getAuth(firebase)

    try {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          router.push('/user/mypage')
        })
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    }
  }
  return (
    <div>
      <Head>
        <title>Signup</title>
        <meta name="Signup" content="ユーザー登録" />
      </Head>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} />
        <input {...register('password')} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Signup
