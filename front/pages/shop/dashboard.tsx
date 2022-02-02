import { useEffect, useState, VFC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios, { AxiosResponse } from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import Header from '../../components/shop/Header'
import Profile from '../../components/Profile'
import PrimaryButton from '../../components/Button'
import { shopInitialData } from '../../initial_data/shopInitialDdata'

import { Spacer } from '@chakra-ui/react'

const DashBoard: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()
  const [shopInfo, setShopInfo] = useState<ShopData>(shopInitialData)
  const getShop = async (authId: string) => {
    try {
      const res: AxiosResponse = await axios.get(`/api/shops/${authId}`)
      setShopInfo(res.data)       
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      getShop(currentUser)
    }
  }, [currentUser])

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="dashboard" content="ダッシュボード" />
      </Head>
      <Header />
      {shopInfo && (
        <Profile
          display_name={shopInfo.display_name}
          handle_name={shopInfo.handle_name}
          icon={shopInfo.icon}
        />
      )}
      <PrimaryButton
        text="編集"
        onclick={() =>
          router.push(`/shop/fix-shopinfo/${shopInfo.handle_name}`)
        }
      />
      <Spacer></Spacer>
      <PrimaryButton
        text="店舗ページを確認"
        onclick={() => router.push(`/shop/top-page/${shopInfo.handle_name}`)}
      />
    </>
  )
}

DashBoard.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}

export default DashBoard
