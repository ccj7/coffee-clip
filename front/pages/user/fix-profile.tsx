// TODO　U-003 github issue#21

import Head from 'next/head'
import { VFC } from 'react'

import Header from '../../components/shop/Header'
import { useAuthContext } from '../auth/AuthContext'

let isLogin = false

const FixProfile: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  if (currentUser) isLogin = true
  return (
    <div>
      <Head>
        <title>プロフィール編集</title>
        <meta name="FixProfile" content="プロフィール編集" />
      </Head>
      <Header />
    </div>
  )
}

FixProfile.getAccessControl = () => {
  return !isLogin ? { type: 'replace', destination: '/user/signin' } : null
}

export default FixProfile
