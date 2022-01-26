import { Button } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState, VFC } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

import Header from '../../components/shop/Header'
import InputForm from '../../components/InputForm'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import axios from 'axios'

const FixShopInfo: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()
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
    const newData = {
      handle_name: 'arasuna_coffee',
      display_name: 'Arasuna Coffee',
      icon: 'image',
      address: '東京都コードクリサリス',
      map_url: 'googlemap URL',
      hp_url: 'HPURL',
      instagram_url: 'instagram URL',
      opening_hours: '8:00~10:00',
      regular_day_off: '月曜日',
      concept: 'ひきたてのコーヒーをどうぞ',
      recommendation: {
        title: 'グリッチ',
        description: '酸味が特徴！',
        image: 'image',
      },
      selling_point: '駅から近いです！',
    }
    const put = () => {
      axios.put('/:authId')
    }
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
          {/* TODO イメージの変更*/}
          <p> イメージの変更も加えます</p>
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
    ? { type: 'replace', destination: '/user/signin' }
    : null
}
export default FixShopInfo
