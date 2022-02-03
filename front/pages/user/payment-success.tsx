import { VFC } from 'react'
import Head from 'next/head'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import { Box } from '@chakra-ui/react'
import BoxMessage from '../../components/BoxMessage'

const PatmentSuccess: WithGetAccessControl<VFC> = () => {

  return (
    <Box>
      <Head>
        <title>支払い完了</title>
      </Head>
      <UserHeader />
      <BoxMessage heading="支払いが完了しました。" buttonLabel="オンラインショップへ戻る" path="/user/onlineShop" />
    </Box>
  )
}

PatmentSuccess.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default PatmentSuccess
