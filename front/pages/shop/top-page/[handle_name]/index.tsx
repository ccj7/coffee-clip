import { useContext, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AuthContext, useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'

import Header from '../../../../components/shop/Header'
import ShopTopPage from '../../../../components/ShopTopPage'

const ShopTopPageOfShop: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useContext(AuthContext)

  const router = useRouter()
  const { handle_name } = router.query

  return (
    <div>
      <Head>
        <title>shop Top Page</title>
        <meta name="shopTopPage" content="shop Top Page" />
      </Head>
      <Header />

      <ShopTopPage handle_name={handle_name} isUser={false} />
    </div>
  )
}

ShopTopPageOfShop.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}

export default ShopTopPageOfShop
