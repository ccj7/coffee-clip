import { useState, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'

import UserHeader from '../../../../components/user/UserHeader'
import ShopTopPage from '../../../../components/ShopTopPage'
import { Box } from '@chakra-ui/react'

const ShopTopPageOfUser: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()
  const [ shopName, setShopName ] = useState()

  const router = useRouter()
  const { handle_name } = router.query

  return (
    <Box>
      <Head>
        <title>{shopName} - ショップ詳細</title>
      </Head>
      <UserHeader />
      <ShopTopPage handle_name={handle_name} isUser={true} setShopName={setShopName}/>
    </Box>
  )
}

ShopTopPageOfUser.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default ShopTopPageOfUser
