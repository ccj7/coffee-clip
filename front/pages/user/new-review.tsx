// TODO　U-007 github issue#21

import { Heading } from '@chakra-ui/react'
import Head from 'next/head'

import Header from '../../components/shop/Header'

import { VFC } from 'react'
import { useAuthContext } from '../auth/AuthContext'

let isLogin = false

const NewReview: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  if (currentUser) isLogin = true
  return (
    <div>
      <Head>
        <title>新規投稿</title>
        <meta name="NewReview" content="プロフィール編集" />
      </Head>
      <Header />
      <Heading>新規投稿画面です</Heading>
    </div>
  )
}

NewReview.getAccessControl = () => {
  return !isLogin ? { type: 'replace', destination: '/user/signin' } : null
}

export default NewReview
