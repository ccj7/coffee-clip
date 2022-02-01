import { VFC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import Header from '../../components/shop/Header'
import PrimaryButton from '../../components/Button'

import { Text } from '@chakra-ui/react'

const RegisterPage: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()

  const getSetLink = async () => {
    // TODO エンドポイント確認
    const result = await axios.post('/api/create-connect-account', {
      name: 'test',
      email: 'test@mail.com',
    })
    await router.push(result.data.url)
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="dashboard" content="ダッシュボード" />
      </Head>
      <Header />
      <Text>店舗オーナー用のメニュー</Text>
      <PrimaryButton
        text="店舗の銀行口座を登録する"
        onclick={() => getSetLink()}
      />
    </>
  )
}

RegisterPage.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}

export default RegisterPage
