import { Button, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState, VFC } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

import Header from '../../components/shop/Header'
import InputForm from '../../components/InputForm'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import axios from 'axios'
import { useRouter } from 'next/router'
import ImageUpload from '../../components/ImageUpload'

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
  const [isSubmited, setIsSubmited] = useState<boolean>(false)
  const [isPublic, setIsPublic] = useState<string | null>(null)

  const methods = useForm({ shouldUnregister: false })

  useEffect(() => {
    console.log(currentUser)

    const getShop = async (authId: string) => {
      const res: any = await axios.get(`/api/shops/${authId}`)
      setShopInfo(res.data)
    }
    if (currentUser) {
      getShop(currentUser)
    }
  }, [])

  const onSubmit = (data: any) => {
    console.log(data)
    // const putNewData = async () => {
    //   await axios.put(`/${currentUser}`, data)
    // }
    // putNewData()
    // router.push('/shop/dashboard')
  }

  const publish = () => {
    setIsSubmited(true)
    setIsPublic('published')
  }
  const draft = () => {
    setIsSubmited(true)
    setIsPublic('drafted')
  }
  return (
    <div>
      <Head>
        <title>shop Top Page</title>
        <meta name="shopTopPage" content="shop Top Page" />
      </Head>
      <Header />
      {!isSubmited && (
        <>
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
              <Button type="submit" mt={4} onClick={publish}>
                公開する
              </Button>
              <Button mt={4} type="submit" onClick={draft}>
                下書きに保存
              </Button>
            </form>
          </FormProvider>
        </>
      )}
      {isPublic === 'published' && (
        <>
          <Text>ユーザーにショップ情報を公開しました</Text>
        </>
      )}
      {isPublic === 'drafted' && (
        <>
          <Text>下書きに保存しました</Text>
          <Text>ユーザーにはまだショップ情報は公開されていません</Text>
        </>
      )}
    </div>
  )
}

FixShopInfo.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}
export default FixShopInfo
