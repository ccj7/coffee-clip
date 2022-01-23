// TODO　U-002 github issue#23

import Head from 'next/head'
import ShopCard from '../../components/user/ShopCard'

import UserHeader from '../../components/user/UserHeader'

function Shoplist() {
  const shoplist = [
    {
      display_name: 'Arasuna Coffee',
      handle_name: '@arasuna_kiyosumi',
      image: 'ここにImg',
      description: '美味しいコーヒー提供してま〜す',
      url: '/',
    },
    {
      display_name: 'Arasuna Coffee2',
      handle_name: '@arasuna_kiyosumi',
      image: 'ここにImg',
      description:
        '清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。',
      url: '/',
    },
    {
      display_name: 'Arasuna Coffee3',
      handle_name: '@arasuna_kiyosumi',
      image: 'ここにImg',
      description:
        '清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。',
      url: '/',
    },
  ]

  return (
    <div>
      <Head>
        <title>ショップ一覧</title>
        <meta name="shoplist" content="ショップ一覧" />
      </Head>
      <UserHeader />
      <section className='flex flex-wrap'>
      { shoplist.map((shop, key) => {
        return (
        <ShopCard
         key={key}
         display_name={shop.display_name}
         handle_name={shop.handle_name}
         image={shop.image}
         description={shop.description}
         url={shop.url}
         />
        )})
      }
      </section>
    </div>
  )
}

export default Shoplist
