import { Button } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState, VFC } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

import Header from '../../../../components/shop/Header'
import InputForm from '../../../../components/InputForm'
import { useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'
import axios from 'axios'
import { useRouter } from 'next/router'
import ImageUpload from '../../../../components/ImageUpload'

type Data = {
  auth_id: string
  handle_name: string
  display_name: string
  icon: string
  address: string
  map_url: string
  hp_url: string
  instagram_url: string
  opening_hours: string
  regular_day_off: string
  concept: string
  recommendation: {
    title: string
    description: string
    image: string
  }
  selling_point: {
    text: string
    image: string
  }
  follower_handle_name: string[]
  __v: string
  _id: string
}

const FixShopInfo: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()
  const { handle_name } = router.query

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
    __v: '',
    _id: '',
  }
  const [shopInfo, setShopInfo] = useState<Data>(dammy)

  const methods = useForm()

  useEffect(() => {
    const getShop = async (handle: string | string[]) => {
      const res: any = await axios.get(`/api/shops/details/${handle}`)
      setShopInfo(res.data)
    }
    if (handle_name) {
      getShop(handle_name)
    }
  }, [handle_name])

  const onSubmit = (data: any) => {
    console.log(data)
    const putNewData = async () => {
      await axios.put(`/${currentUser}`, data)
    }
    putNewData()
    router.push('/shop/dashboard')
  }

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
          <ImageUpload size="sm" thema="icon" text="アイコン画像" />
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

          <ImageUpload
            size="sm"
            thema="recommendation.image"
            text="おすすめのコーヒー 写真"
          />

          <InputForm
            thema="selling_point.text"
            text="お店の魅力"
            defaultValue={shopInfo.recommendation.image}
          />

          <ImageUpload
            size="sm"
            thema="selling_point.image"
            text="お店の魅力　写真"
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
