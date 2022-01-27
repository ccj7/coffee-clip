// TODO　U-007 github issue#41

import Head from 'next/head'
import axios from 'axios'
import UserHeader from '../../components/user/UserHeader'
import InputForm from '../../components/InputForm'
import ImageUpload from '../../components/ImageUpload'
import { VFC, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form' 
import { Heading, Box, Button } from '@chakra-ui/react'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

interface Review {
  image?: string
  description?: string
}

const NewReview: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()

  // base64に変換したもの（propsで渡す）
  const [base64Code, setBase64Code] = useState("")

  const methods = useForm()

  const postUser = async (userNewReview: Review, authId: string) => {
    console.log(userNewReview)
    console.log(authId)
    // TODO: ここが動いていません！
    // await axios.post(`/api/users/${authId}/reviews`, userNewReview, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
  }

  const onSubmit = (userNewReview: Review) => {
    userNewReview.image = base64Code
    console.log(userNewReview)
    
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
      <Heading size='md' m={'16px'}>新規投稿</Heading>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
         <ImageUpload 
            base64Code={base64Code}
            setBase64Code={setBase64Code}
            size={"500px"} />
          <InputForm
            thema="description"
            text="感想やおすすめポイント"
            defaultValue=""
          />
          <Box><Button mt={4} type="submit">投稿</Button></Box>
        </form>
      </FormProvider>
    </Box>
  )
}

NewReview.getAccessControl = async () => {
  return ! await isLoggedIn() ? { type: 'replace', destination: '/user/signin' } : null
}


export default NewReview
