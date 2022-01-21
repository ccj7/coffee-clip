// U-001 github issue#20

import Head from 'next/head'

import Header from '../../components/shop/Header'

function Timelime() {
  return (
    <div>
      <Head>
        <title>Timelime</title>
        <meta name="Timelime" content="タイムライン" />
      </Head>
      <Header />
    </div>
  )
}

export default Timelime
