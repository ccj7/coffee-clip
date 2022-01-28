import Head from 'next/head'
import { VFC } from 'react'

import Header from '../../components/shop/Header'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import UserHeader from '../../components/user/UserHeader'

const Search: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  return (
    <div>
      <Head>
        <title>検索結果</title>
        <meta name="Search" content="Search" />
      </Head>
      <UserHeader />
    </div>
  )
}

Search.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default Search
