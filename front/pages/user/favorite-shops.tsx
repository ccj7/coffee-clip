// TODO　U-005 github issue#25

import Head from 'next/head'

import Header from '../../components/shop/Header'

function LikeShops() {
  return (
    <div>
      <Head>
        <title>お気に入りのshop</title>
        <meta name="favotite shops" content="お気に入りのショップ一覧" />
      </Head>
      <Header />
    </div>
  )
}

export default LikeShops
