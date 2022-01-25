// TODO　U-003 github issue#21

import Head from 'next/head'
// import axios from 'axios'

import UserHeader from '../../components/user/UserHeader'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form' 
import { Box, Button, Heading } from '@chakra-ui/react'
import InputForm from '../../components/InputForm'

// TODO: 全体的に型をちゃんと定義する
function Setting() { 

  const [image, setImage] = useState("");
  const [base64Code, setBase64Code] = useState("");

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

      // この時点でセットされるようにする
      setBase64Code(base64)
    }
  }

  // アップロードする関数
  const uploadImage = () => {
    encodeToBase64(image)
    
    // ここでbase64Codeを使ってfetchする
  }


  // 仮データ
  const dammy = {
    auth_id: '1',
    display_name: 'Kaori'
  }
  const [userInfo, setUserInfo] = useState<any>(dammy)
  const methods = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Box>
      <Head>
        <title>Setting</title>
        <meta name="Setting" content="Setting" />
      </Head>
      <UserHeader />
      <Heading size='md' m={'16px'}>ユーザープロフィール</Heading>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm
           thema="display_name"
           text="ユーザーネーム"
           defaultValue={userInfo.display_name}
           />
          <input type="file" accept="image/*" onChange={handleChangeImage}/>
          <Button type="submit" onClick={uploadImage}>アップロード</Button>

          <Box><Button mt={4} type="submit">保存</Button></Box>
        </form>
      </FormProvider>
    </Box>
  )
}

export default Setting
