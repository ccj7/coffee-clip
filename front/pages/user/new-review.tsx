// TODO　U-007 github issue#21

import { Heading } from '@chakra-ui/react'
import Head from 'next/head'

import Header from '../../components/shop/Header'

function NewReview() {
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

export default NewReview
