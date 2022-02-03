import { VFC, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'
import TextArea from '../../components/TextArea'
import { useForm, FormProvider } from 'react-hook-form'
import { Heading, Box, Button, Center } from '@chakra-ui/react'
import BoxMessage from '../../components/BoxMessage'

const NewReview: WithGetAccessControl<VFC> = () => {
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
          <Center mb="50px">
            <Heading size="md" mt="50px">
              新規投稿
            </Heading>
          </Center>

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
                    <Center>
                      <Button
                        type="submit"
                        backgroundColor="brand.color4"
                        _hover={{ backgroundColor: '#b8b1aa' }}
                        color="white"
                      >
                        投稿
                      </Button>
                    </Center>
                  </Box>
                </form>
              </FormProvider>
            </>
          )}
          {message && (
            <BoxMessage heading={message} buttonLabel="Time Lineに戻る" path="/user/timeline" />
          )}
        </Box>
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
