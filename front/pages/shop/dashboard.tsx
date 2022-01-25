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
    auth_id: '',
    handle_name: '',
    display_name: '',
    icon: '',
    address: '',
    map_url: '',
    hp_url: '',
    instagram_url: '',
    opening_hours: '',
    regular_day_off: '',
    concept: '',
    recommendation: {
      title: '',
      description: '',
      image: '',
    },
    selling_point: '',
    follower_handle_name: [''],
  }

  const [shopInfo, setShopInfo] = useState<any>(dammy)

  // console.log(shopInfo.display_name)
  //　user情報を取得
  useEffect(() => {
    const getShop = async (authId: string) => {
      // TODO: dammy変更してください
      const res: any = await axios.get(`/api/shops/${authId}`)
      setShopInfo(res.data)
    }
    // TODO: 直接入力しているauthIDを変更
    getShop('540PJipKIwXZUY422LmC2j3ZlvU2')
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
        icon={shopInfo.icon}
      />

      {/* <p>住所：{shopInfo.address}</p>
      <p>HP：{shopInfo.hp_url}</p>
      <p>instagram:{shopInfo.instagram_url}</p>
      <p>お気に入り　●（数を表示）</p> */}

      <PrimaryButton text="編集" />
      <Spacer></Spacer>
      <PrimaryButton text="公開ページを作成" />
    </>
  )
}

export default PhotoImage
