import { useEffect, useState, VFC } from 'react'
import Head from 'next/head'
import axios, { AxiosResponse } from 'axios'
import { useForm, FormProvider } from 'react-hook-form'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'
import Message from '../../components/Message'

import { Box, Button, Center, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Setting: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const methods = useForm()
  const router = useRouter()

  const [displayName, setDisplayName] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  
  type UserPostData = {
    display_name?: string
    icon?: string
  }

  // user情報を取得
  useEffect(() => {
    const getUser = async () => {
      const res: AxiosResponse = await axios.get(`/api/users/${currentUser}`)
      setDisplayName(res.data.display_name)
    }
    if (currentUser) {
      getUser()
    }
  }, [currentUser])

  const postUser = async (changeUserInfo: UserPostData) => {
    await axios
      .put(`/api/users/${currentUser}`, changeUserInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage('保存しました')
        }
      })
  }

  const onSubmit = (changeUserInfo: UserPostData) => {
    postUser(changeUserInfo)
  }

  return (
    <Box>
      <Head>
        <title>Setting</title>
        <meta name="Setting" content="ユーザープロフィール編集" />
      </Head>
      <UserHeader />
      <Box w={{ base: '80%', md: '65%' }} my="0" mx="auto" mb="50px">
        <Center mb="50px">
          <Heading size="md" mt="50px">
            ユーザープロフィール
          </Heading>
        </Center>
        {message && <Message message={message} />}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputForm
              theme="display_name"
              text="ユーザーネーム"
              defaultValue={displayName}
              validation={{
                required: true,
              }}
              errorMessage="必須項目です"
            />
            <ImageUpload size="sm" theme="icon" text="アイコン画像" />
            <Center>
              <Button
                type="submit" mr="15px" 
                backgroundColor="brand.color4"
                _hover={{ backgroundColor: '#b8b1aa' }}
                color="white"
              >
                保存
              </Button>
              <Button onClick={() => {
                  router.push("/user/mypage")
                }} >
                  キャンセル
                </Button>
            </Center>
          </form>
        </FormProvider>
      </Box>
    </Box>
  )
}

Setting.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default Setting
