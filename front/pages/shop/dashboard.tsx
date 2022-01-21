import Head from 'next/head'

import Header from '../../components/shop/Header'
import Profile from '../../components/Profile'
import PrimaryButton from '../../components/Button'
import { useEffect, useState } from 'react'

function PhotoImage() {
  const dammy = {
    auth_id: '1',
    handle_name: 'arasuna_coffee',
    display_name: 'Arasuna Coffee',
    icon: 'image',
    address: '東京都コードクリサリス',
    map_url: 'googlemap URL',
    hp_url: 'HPURL',
    instagram_url: 'instagram URL',
    opening_hours: '9:00~10:00',
    regular_day_off: '月曜日',
    concept: '美味しいコーヒー提供してま〜す',
    recommendation: {
      title: 'グリッチ',
      description: '酸味が特徴！',
      image: 'image',
    },
    selling_point: 'image',
    follower_handle_name: ['ccmizki'],
  }
  const [shopInfo, setShopInfo] = useState<any>(dammy)

  console.log(shopInfo.display_name)
  //　user情報を取得
  useEffect(() => {
    const getShop = async (authId: string) => {
      //　🚫エラーになるのでコメントアウトしてます！
      //   const res: any = await axios.get(`/api/shops/${authId}`)
      //   setShopInfo(res)
    }
    getShop('test')
  }, [])

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="dashboard" content="ダッシュボード" />
      </Head>
      <Header />
      <Profile shopInfo={dammy} />
      <p>住所：{dammy.address}</p>
      <p>HP：{dammy.HP}</p>
      <p>instagram:{dammy.instagram}</p>
      <p>お気に入り　●（数を表示）</p>
      <PrimaryButton text="編集" />
      <PrimaryButton text="公開ページを作成" />
      <></>
    </div>
  )
}

export default PhotoImage
