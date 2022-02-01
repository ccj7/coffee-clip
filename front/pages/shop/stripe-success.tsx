import { VFC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import Header from '../../components/shop/Header'
import PrimaryButton from '../../components/Button'

import { Text } from '@chakra-ui/react'

const stripeSuccess: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="dashboard" content="ダッシュボード" />
      </Head>
      <Header />
      <Text>店舗オーナー用のメニュー</Text>
      <Text>口座情報の更新</Text>
      <PrimaryButton
        text="登録が成功しました"
        onclick={() => router.push('/shop/dashboard')}
      />
    </>
  )
}

stripeSuccess.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}

export default stripeSuccess
