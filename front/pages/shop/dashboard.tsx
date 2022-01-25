import Head from 'next/head'

import Header from '../../components/shop/Header'
import Profile from '../../components/Profile'
import PrimaryButton from '../../components/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthContext } from '../auth/AuthContext'

let isLogin = false

function DashBoard() {
  const { currentUser } = useAuthContext()
  if (currentUser) isLogin = true

  const router = useRouter()
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
      <PrimaryButton
        text="編集"
        onclick={() => router.push('/shop/fix-shopInfo')}
      />
      <Spacer></Spacer>
      <PrimaryButton
        text="公開ページを作成"
        onclick={() => router.push(`/shop/top-page/${shopInfo.handle_name}`)}
      />
    </>
  )
}

DashBoard.getAccessControl = () => {
  // TODO return,destinationの後帰る
  return !isLogin ? { type: 'replace', destination: '/user/signin' } : null
}

export default DashBoard
