import {
  Box,
  Center,
  HStack,
  Icon,
  Spacer,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

import Header from '../../components/shop/Header'
import InputForm from '../../components/InputForm'

function FixShopInfo() {
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

  const onSubmit = (data: any) => {
    console.log(data)
  }

  // useEffect(() => {
  //   setValue('handle_name', shopInfo.handle_name)
  //   setValue('display_name', shopInfo.display_name)
  //   // setValue(icon, 'image',
  //   setValue('address', shopInfo.address)
  //   setValue('map_url', shopInfo.map_url)
  //   setValue('hp_url', shopInfo.hp_url)
  //   setValue('instagram_url', shopInfo.instagram_url)
  //   setValue('opening_hours', shopInfo.opening_hours)
  //   setValue('regular_day_off', shopInfo.regular_day_off)
  //   setValue('concept', shopInfo.concept)
  //   setValue('recommendation', shopInfo.recommendation)
  //   setValue('selling_point', shopInfo.selling_point)
  // }, [])

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

export default FixShopInfo
