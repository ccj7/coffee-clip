// TODO　U-003 github issue#21

import Head from 'next/head'
import axios from 'axios'

import UserHeader from '../../components/user/UserHeader'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form' 
import { Box, Button, Heading, Image } from '@chakra-ui/react'
import InputForm from '../../components/InputForm'

// TODO: 全体的に型をちゃんと定義する
function Setting() {
  
  // user情報を取得
  useEffect(() => {
    const getUser = async (authId: string) => {
      const res: any = await axios.get(`/api/users/${authId}`)
      setDisplayName(res.data.display_name)
    }

    // TODO: 実際の値に変更
    getUser("4E5Jby73IVRAypSDyV3IfFcQwXz1")
  }, [])

  // アップロードされた画像のデータ
  const [image, setImage] = useState("")
  // base64に変換したもの
  const [base64Code, setBase64Code] = useState("")
  // getしてきたuser情報を入れておく予定
  const [displayName, setDisplayName] = useState<any>()

  const methods = useForm()

  // アップされた画像データをimageにセット
  const handleChangeImage = (e: any) => {
    setImage(e.target.files[0])
  }

  // base64を生成する関数
  const encodeToBase64 = async (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result as string
      console.log(base64)

      setBase64Code(base64)
    }
  }

  // 画像をアップロードする関数
  const uploadImage = () => {
    encodeToBase64(image)
  }

  // サーバーに送る
  const onSubmit = (changeUserInfo: any) => {
    changeUserInfo.base64 = base64Code
    // TODO: changeUserInfoを送る
    console.log(changeUserInfo)
  }

  return (
    <Box>
      <Head>
        <title>Setting</title>
        <meta name="Setting" content="ユーザープロフィール編集" />
      </Head>
      <UserHeader />
      <Heading size='md' m={'16px'}>ユーザープロフィール</Heading>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm
           thema="display_name"
           text="ユーザーネーム"
           defaultValue={displayName}
           />
          <input type="file" accept="image/png, image/jpeg" onChange={handleChangeImage}/>
          <Button type="submit" onClick={uploadImage}>アップロード</Button>
          { base64Code &&
            <Image w={"300px"} src={base64Code} />
          }
          <Box><Button mt={4} type="submit">保存</Button></Box>
        </form>
      </FormProvider>
    </Box>
  )
}

export default Setting
