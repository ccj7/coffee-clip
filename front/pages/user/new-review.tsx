import { VFC, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'
import Message from '../../components/Message'
import TextArea from '../../components/TextArea'
import { useForm, FormProvider } from 'react-hook-form'
import { Heading, Box, Button, Center, Spacer } from '@chakra-ui/react'
import PrimaryButton from '../../components/Button'
import { useRouter } from 'next/router'

const NewReview: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const methods = useForm()
  const router = useRouter()

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
          setMessage('投稿しました')
        }
      })
  }

  const onSubmit = (userNewReview: Review) => {
    if (currentUser) {
      postUser(userNewReview, currentUser)
    }
  }

  return (
    <>
    <Box>
      <Head>
        <title>新規投稿</title>
        <meta name="NewReview" content="プロフィール編集" />
      </Head>
      <UserHeader />
      <Box w={{ base: '80%', md: '65%' }} my="0" mx="auto">
        <Heading size="md" m={'16px'}>
          新規投稿
        </Heading>
        
           {!message && (
            <>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputForm
              theme="coffee_name"
              text="飲んだコーヒー"
              defaultValue=""
            />
            <ImageUpload theme="image" text="画像" size={'500px'} />
            <TextArea 
              theme="description"
              text="感想やおすすめポイント"
              validation={{
                required: true,
              }}
              errorMessage="必須項目です"
            />
            <Box>
              <Button mt={4} type="submit">
                投稿
              </Button>
            </Box>
          </form>
        </FormProvider>
             </>
          )}
        {message && (
            <>
              <Message message={message} />
              <Center>
                <PrimaryButton
                  text="timelineに戻る"
                  onclick={() => {
                    router.push('/user/timeline')
                  }}
                />
              </Center>
            </>
          )}
        </Box>
    </>
  )
}

NewReview.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default NewReview
