// TODO　U-003 github issue#21

import Head from 'next/head'
import { VFC } from 'react'

import Header from '../../components/shop/Header'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

const FixProfile: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
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

FixProfile.getAccessControl = async () => {
  return ! await isLoggedIn() ? { type: 'replace', destination: '/user/signin' } : null
}

export default FixProfile
