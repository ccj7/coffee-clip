import { Button } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState, VFC } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

import Header from '../../components/shop/Header'
import InputForm from '../../components/InputForm'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import axios from 'axios'
import { useRouter } from 'next/router'

const FixShopInfo: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()

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
    selling_point: {
      text: '',
      image: '',
    },
    follower_handle_name: [''],
  }
  const [shopInfo, setShopInfo] = useState<any>(dammy)

  const methods = useForm()

  useEffect(() => {
    console.log(currentUser)

    const getShop = async (authId: string) => {
      // TODO: dammy変更してください
      const res: any = await axios.get(`/api/shops/${authId}`)
      setShopInfo(res.data)
    }
    // TODO: 直接入力しているauthIDを変更
    if (currentUser) {
      getShop(currentUser)
    }
  }, [])

  const onSubmit = (data: any) => {
    console.log(data)
    const putNewData = async () => {
      await axios.put(`/${currentUser}`, data)
    }
    putNewData()
    router.push('/shop/dashboard')
  }

  // TODO　画像処理とseeling POINTのinput追加
  return (
    <div>
      <Head>
        <title>shop Top Page</title>
        <meta name="shopTopPage" content="shop Top Page" />
      </Head>
      <Header />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm
            thema="handle_name"
            text="shop ID"
            defaultValue={shopInfo.handle_name}
          />
          <InputForm
            thema="display_name"
            text="お店の名前"
            defaultValue={shopInfo.display_name}
          />
          <InputForm
            thema="icon"
            text="アイコン"
            defaultValue={shopInfo.image}
          />
          <InputForm
            thema="address"
            text="住所"
            defaultValue={shopInfo.address}
          />
          <InputForm
            thema="map_url"
            text="googlemap URL"
            defaultValue={shopInfo.map_url}
          />
          <InputForm
            thema="hp_url"
            text="HP URL"
            defaultValue={shopInfo.hp_url}
          />
          <InputForm
            thema="instagram_url"
            text="instagram URL"
            defaultValue={shopInfo.instagram_url}
          />
          <InputForm
            thema="opening_hours"
            text="営業時間"
            defaultValue={shopInfo.opening_hours}
          />
          <InputForm
            thema="regular_day_off"
            text="定休日"
            defaultValue={shopInfo.regular_day_off}
          />
          <InputForm
            thema="concept"
            text="お店のプロフィール文"
            defaultValue={shopInfo.concept}
          />
          <InputForm
            thema="recommendation.title"
            text="おすすめのコーヒー 名前"
            defaultValue={shopInfo.recommendation.title}
          />
          <InputForm
            thema="recommendation.description"
            text="おすすめのコーヒー 紹介文"
            defaultValue={shopInfo.recommendation.description}
          />
          <InputForm
            thema="recommendation.description"
            text="おすすめのコーヒー 写真"
            defaultValue={shopInfo.recommendation.image}
          />
          <InputForm
            thema="selling_point.text"
            text="お店の魅力"
            defaultValue={shopInfo.recommendation.image}
          />
          <InputForm
            thema="selling_point.image"
            text="お店の魅力　写真"
            defaultValue={shopInfo.recommendation.image}
          />
          <Button mt={4} type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

FixShopInfo.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}
export default FixShopInfo
