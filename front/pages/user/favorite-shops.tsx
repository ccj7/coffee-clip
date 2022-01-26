// TODO　U-005 github issue#25

import Head from 'next/head'
import { useContext, VFC } from 'react'

import Header from '../../components/shop/Header'
import { useAuthContext } from '../../auth/AuthContext'

// 🌸１🌸
let isLogin = false
// 🌸１🌸

const LikeShops: WithGetAccessControl<VFC> = (props) => {
  // 🌸２🌸
  const { currentUser } = useAuthContext()
  if (currentUser) isLogin = true
  // 🌸２🌸

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

// 🌸３🌸
LikeShops.getAccessControl = () => {
  return !isLogin ? { type: 'replace', destination: '/user/signin' } : null
}
// 🌸３🌸

export default LikeShops
