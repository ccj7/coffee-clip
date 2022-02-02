import Head from 'next/head'
import { useEffect, useState, VFC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import Header from '../../../../components/shop/Header'
import InputForm from '../../../../components/InputForm'
import { useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'
import axios from 'axios'
import { useRouter } from 'next/router'
import ImageUpload from '../../../../components/ImageUpload'
import Message from '../../../../components/Message'

import {
  Box,
  Button,
  Radio,
  Stack,
  RadioGroup,
  FormLabel,
} from '@chakra-ui/react'

const FixShopInfo: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()
  const { handle_name } = router.query

  const [shopInfo, setShopInfo] = useState<ShopData | null>(null)
  const [publishState, setPublishState] = useState<string>()
  const [message, setMessage] = useState<string>()

  const methods = useForm({ shouldUnregister: false })

  useEffect(() => {
    const getShop = async (handle: string | string[]) => {
      const res: any = await axios.get(`/api/shops/details/${handle}`)
      setShopInfo(res.data)
      if (res.data.publish_state) {
        setPublishState('0')
      } else {
        setPublishState('1')
      }
    }
    if (handle_name) {
      getShop(handle_name)
    }
  }, [handle_name])

  const onSubmit = (data: any) => {
    console.log(data)
    const putNewData = async () => {
      if (data.publish_state === '0') {
        data.publish_state = true
      } else {
        data.publish_state = false
      }
      console.log(data)
      axios.put(`/api/shops/${currentUser}`, data).then((res) => {
        if (res.status === 200) {
          setMessage('保存しました！')
        }
      })
    }
    putNewData()

    router.push('/shop/dashboard')
  }

  return (
    <Box>
      <Head>
        <title>shop Top Page</title>
        <meta name="shopTopPage" content="shop Top Page" />
      </Head>
      <Header />
      {shopInfo && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputForm
              theme="display_name"
              text="お店の名前"
              defaultValue={shopInfo.display_name}
            />
            <ImageUpload size="sm" theme="icon" text="アイコン画像" />
            <InputForm
              theme="address"
              text="住所"
              defaultValue={shopInfo.address}
            />
            <InputForm
              theme="map_url"
              text="googlemap URL"
              defaultValue={shopInfo.map_url}
            />
            <InputForm
              theme="hp_url"
              text="HP URL"
              defaultValue={shopInfo.hp_url}
            />
            <InputForm
              theme="instagram_url"
              text="instagram URL"
              defaultValue={shopInfo.instagram_url}
            />
            <InputForm
              theme="opening_hours"
              text="営業時間"
              defaultValue={shopInfo.opening_hours}
            />
            <InputForm
              theme="regular_day_off"
              text="定休日"
              defaultValue={shopInfo.regular_day_off}
            />
            <InputForm
              theme="concept"
              text="お店のプロフィール文"
              defaultValue={shopInfo.concept}
            />
            <InputForm
              theme="recommendation.title"
              text="おすすめのコーヒー 名前"
              defaultValue={shopInfo.recommendation.title}
            />
            <InputForm
              theme="recommendation.description"
              text="おすすめのコーヒー 紹介文"
              defaultValue={shopInfo.recommendation.description}
            />

            <ImageUpload
              size="sm"
              theme="recommendation.image"
              text="おすすめのコーヒー 写真"
            />

            <InputForm
              theme="selling_point.text"
              text="お店の魅力"
              defaultValue={shopInfo.selling_point.text}
            />

            <ImageUpload
              size="sm"
              theme="selling_point.image"
              text="お店の魅力　写真"
            />
            <RadioGroup onChange={setPublishState} value={publishState}>
              <FormLabel htmlFor="publish_state">公開ステータス</FormLabel>
              <Stack spacing={4} direction="row">
                <Radio value="0" {...methods.register('publish_state')}>
                  公開する
                </Radio>
                <Radio value="1" {...methods.register('publish_state')}>
                  非公開にする
                </Radio>
              </Stack>
            </RadioGroup>
            <Button mt={4} type="submit">
              Submit
            </Button>
          </form>
          {message && <Message message={message} />}
        </FormProvider>
      )}
    </Box>
  )
}

FixShopInfo.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}
export default FixShopInfo
