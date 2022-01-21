// TODO　U-003 github issue#21

import Head from 'next/head'

import Header from '../../components/shop/Header'

function FixProfile() {
  return (
    <div>
      <Head>
        <title>プロフィール編集</title>
        <meta name="FixProfile" content="プロフィール編集" />
      </Head>
      <Header />
    </div>
  )
}

export default FixProfile
