// TODO　U-001 github issue#20

import Head from 'next/head'

import Header from '../../components/shop/Header'
import UserHeader from '../../components/user/UserHeader'

function Setting() {
  return (
    <div>
      <Head>
        <title>Setting</title>
        <meta name="Setting" content="Setting" />
      </Head>
      <UserHeader />
    </div>
  )
}

export default Setting
