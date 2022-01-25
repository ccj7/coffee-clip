// TODO　U-005 github issue#25

import Head from 'next/head'
import { VFC } from 'react'

import Header from '../../components/shop/Header'

const LikeShops: WithGetAccessControl<VFC> = (props) => {
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

LikeShops.getAccessControl = () => {
  // TODO return,destinationの後帰る
  return !true ? { type: 'replace', destination: '/user/signin' } : null
}
export default LikeShops
