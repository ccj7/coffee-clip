import Head from 'next/head'

import Header from '../../components/shop/Header'
import Profile from '../../components/Profile'
import PrimaryButton from '../../components/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Spacer } from '@chakra-ui/react'

function PhotoImage() {
  // TODO: dammyデータ削除 & Interfaceをサーバー側のスキーマから流用して作成
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
      // TODO: dammy変更してください
      const res: any = await axios.get('/api/shops')
      console.log(res.data)
      setShopInfo(res.data[0])
    }
    // TODO: testはdummyの値です
    getShop('test')
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="dashboard" content="ダッシュボード" />
      </Head>
      <Header />
      <Profile
        display_name={shopInfo.display_name}
        handle_name={shopInfo.handle_name}
      />

      {/* <p>住所：{shopInfo.address}</p>
      <p>HP：{shopInfo.hp_url}</p>
      <p>instagram:{shopInfo.instagram_url}</p>
      <p>お気に入り　●（数を表示）</p> */}

      {/* TODO 謎の丸括弧を削除する */}
      <PrimaryButton text="編集" />
      <Spacer></Spacer>
      <PrimaryButton text="公開ページを作成" />
    </>
  )
}

export default PhotoImage
