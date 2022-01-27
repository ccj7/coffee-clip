// TODO　U-003 github issue#21

import Head from 'next/head'
import axios from 'axios'
import UserHeader from '../../components/user/UserHeader'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'
import { useEffect, useState, VFC } from 'react'
import { useForm, FormProvider } from 'react-hook-form' 
import { Box, Button, Heading, Image } from '@chakra-ui/react'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

// TODO: 全体的に型をちゃんと定義する
const Setting: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  
  // user情報を取得
  useEffect(() => {
    const getUser = async (authId: string) => {
      const res: any = await axios.get(`/api/users/${authId}`)
      setDisplayName(res.data.display_name)
    }

    // TODO: 実際の値に変更
    getUser("h1ERSr4qUNUoviCQlzZ0648p1cA2")
  }, [])

  // base64に変換したもの（propsで渡す）
  const [base64Code, setBase64Code] = useState("")
  // getしてきたuser情報を入れておく予定
  const [displayName, setDisplayName] = useState<any>("")

  const methods = useForm()

  // TODO: エンドポイントができたらサーバーに送る関数
  // const postUser = async (changeUserInfo: any) => {
  //   await axios.post(`/api/users`, changeUserInfo, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  // }

  const onSubmit = (changeUserInfo: any) => {
    changeUserInfo.icon = base64Code
    // TODO: changeUserInfoを送る
    console.log(changeUserInfo)

    // postUser(changeUserInfo)
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
          <ImageUpload 
            base64Code={base64Code}
            setBase64Code={setBase64Code}
            size={"300px"} />
          <Box><Button mt={4} type="submit">保存</Button></Box>
        </form>
      </FormProvider>
    </Box>
  )
}

Setting.getAccessControl = async () => {
  return ! await isLoggedIn() ? { type: 'replace', destination: '/user/signin' } : null
}

export default Setting
