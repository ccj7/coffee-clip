import { VFC, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'
import Message from '../../components/Message'
import { useForm, FormProvider } from 'react-hook-form'
import { Heading, Box, Button } from '@chakra-ui/react'

const PatmentSuccess: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const methods = useForm()
  const [message, setMessage] = useState<string>()

  const postUser = async (userNewReview: Review, authId: string) => {
    axios
      .post(`/api/users/${authId}/reviews`, userNewReview, {
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

  const onSubmit = (userNewReview: Review) => {
    if (currentUser) {
      postUser(userNewReview, currentUser)
    }
  }

  return (
    <Box>
      <Head>
        <title>新規投稿</title>
        <meta name="NewReview" content="プロフィール編集" />
      </Head>
      <UserHeader />
      <Box w={{ base: '80%', md: '65%' }} my="0" mx="auto">
        <Heading size="md" m={'16px'}>
          支払いが完了しました。
        </Heading>
        {message && <Message message={message} />}
      </Box>
    </Box>
  )
}

PatmentSuccess.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default PatmentSuccess
