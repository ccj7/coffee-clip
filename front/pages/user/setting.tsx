import Head from 'next/head'
import axios from 'axios'
import UserHeader from '../../components/user/UserHeader'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'
import Message from '../../components/Message'
import { useEffect, useState, VFC } from 'react'
import { useForm, FormProvider } from 'react-hook-form' 
import { Box, Button, Heading } from '@chakra-ui/react'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

// TODO: 全体的に型をちゃんと定義する
const Setting: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  
  // user情報を取得
  useEffect(() => {
    const getUser = async () => {
      const res: any = await axios.get(`/api/users/${currentUser}`)
      setDisplayName(res.data.display_name)
    }
    if(currentUser) {
      getUser()
    }
  }, [currentUser])

  // getしてきたuser情報を入れておく予定
  const [displayName, setDisplayName] = useState<any>('')
  const [message, setMessage] = useState<String>('')
  const methods = useForm()

  const postUser = async (changeUserInfo: any) => {
    await axios.put(`/api/users/${currentUser}`, changeUserInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status === 200) {
        setMessage('保存しました')
      }
    })
  }

  const onSubmit = (changeUserInfo: any) => {
    postUser(changeUserInfo)
  }

  return (
    <Box>
      <Head>
        <title>Setting</title>
        <meta name="Setting" content="ユーザープロフィール編集" />
      </Head>
      <UserHeader />
      <Heading size='md' m={'16px'}>ユーザープロフィール</Heading>
      {message && <Message message={message} />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm
            thema="display_name"
            text="ユーザーネーム"
            defaultValue={displayName}
          />
          <ImageUpload size="sm" thema="icon" text="アイコン画像" />
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
