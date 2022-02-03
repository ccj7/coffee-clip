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
import TextArea from '../../../../components/TextArea'

import {
  Box,
  Button,
  Radio,
  Stack,
  RadioGroup,
  FormLabel,
  Center,
  Heading,
} from '@chakra-ui/react'
import BoxMessage from '../../../../components/BoxMessage'

const FixShopInfo: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()
  const { handle_name } = router.query

  const [shopInfo, setShopInfo] = useState<ShopData | null>(null)
  const [publishState, setPublishState] = useState<string>()
  const [message, setMessage] = useState<string>()
  const [displayFormState, setDisplayFormState] = useState<boolean>(true)

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
    const putNewData = async () => {
      if (data.publish_state === '0') {
        data.publish_state = true
      } else {
        data.publish_state = false
      }
      axios.put(`/api/shops/${currentUser}`, data).then((res) => {
        if (res.status === 200) {
          setDisplayFormState(false)
          setMessage('保存しました')
        }
      })
    }
    putNewData()
  }

  return (
    <Box>
      <Head>
        <title>店舗ページ 編集</title>
      </Head>
      <Header />
      <Box w={{ base: '80%', md: '65%' }} my="0" mx="auto" mb="50px">
        <Center mb="50px">
          <Heading size="md" mt="50px">
            店舗ページ 編集
          </Heading>
        </Center>
        {shopInfo && displayFormState && (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputForm
                theme="display_name"
                text="お店の名前"
                defaultValue={shopInfo.display_name}
                validation={{
                  required: true,
                }}
                errorMessage="必須項目です"
              />
              <ImageUpload theme="icon" text="アイコン画像" />
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
              <TextArea
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
              <TextArea
                theme="recommendation.description"
                text="おすすめのコーヒー 紹介文"
                defaultValue={shopInfo.recommendation.description}
              />
              <ImageUpload
                theme="recommendation.image"
                text="おすすめのコーヒー 写真"
              />
              <TextArea
                theme="selling_point.text"
                text="お店の魅力"
                defaultValue={shopInfo.selling_point.text}
              />
              <ImageUpload theme="selling_point.image" text="お店の魅力 写真" />
              <RadioGroup onChange={setPublishState} value={publishState}>
                <FormLabel fontSize="sm" htmlFor="publish_state">
                  公開ステータス
                </FormLabel>
                <Stack spacing={4} direction="row">
                  <Radio
                    backgroundColor="white"
                    colorScheme="gray"
                    value="0"
                    {...methods.register('publish_state')}
                  >
                    公開する
                  </Radio>
                  <Radio
                    backgroundColor="white"
                    colorScheme="gray"
                    value="1"
                    {...methods.register('publish_state')}
                  >
                    非公開にする
                  </Radio>
                </Stack>
              </RadioGroup>
              <Center mt="40px">
                <Button
                  type="submit"
                  mr="15px"
                  backgroundColor="brand.color4"
                  _hover={{ backgroundColor: '#b8b1aa' }}
                  color="white"
                >
                  保存
                </Button>
                <Button
                  onClick={() => {
                    router.push('/shop/dashboard')
                  }}
                >
                  キャンセル
                </Button>
              </Center>
            </form>
          </FormProvider>
        )}
        {message && (
          <BoxMessage
            heading={message}
            buttonLabel="ダッシュボードに戻る"
            path="/shop/dashboard"
          />
        )}
      </Box>
    </Box>
  )
}

FixShopInfo.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}
export default FixShopInfo
