import { VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'

import UserHeader from '../../../../components/user/UserHeader'
import ShopTopPage from '../../../../components/ShopTopPage'

const ShopTopPageOfUser: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()
  const { handle_name } = router.query

  return (
    <>
      <Head>
        <title>shop Top Page</title>
        <meta name="shopTopPage" content="shop Top Page" />
      </Head>
      <UserHeader />

      <ShopTopPage handle_name={handle_name} isUser={true} />
    </>
  )
}

ShopTopPageOfUser.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default ShopTopPageOfUser
