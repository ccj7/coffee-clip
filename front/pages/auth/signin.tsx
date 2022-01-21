import Head from 'next/head'

import Header from '../../components/shop/Header'
import { useForm } from 'react-hook-form'

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'

function Signup() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data: any) => {
    // firebaseする
    console.log(data)
    console.log(process.env.NEXT_PUBLIC_FIREBASE_APIKEY)

    const auth = getAuth(firebase)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      onAuthStateChanged(auth, (user) => {
        // setCurrentUser(user?.uid);
      })
      // history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Head>
        <title>Signin</title>
        <meta name="Signin" content="ログイン画面" />
      </Head>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true, maxLength: 20 })} />
        <input {...register('password')} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Signup
