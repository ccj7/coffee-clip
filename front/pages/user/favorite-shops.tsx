// TODO　U-005 github issue#25

import Head from 'next/head'
import { VFC } from 'react'

import Header from '../../components/shop/Header'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

const LikeShops: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()

  return (
    <div>
      <Head>
        <title>お気に入りのshop</title>
        <meta name="favotite shops" content="お気に入りのショップ一覧" />
      </Head>
      <Header />
      <p>ログインのテストです</p>
    </div>
  )
}

LikeShops.getAccessControl = async () => {
  return ! await isLoggedIn() ? { type: 'replace', destination: '/user/signin' } : null
}

export default LikeShops
