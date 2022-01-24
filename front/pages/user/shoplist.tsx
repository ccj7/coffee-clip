// TODO　U-002 github issue#23

import Head from 'next/head'
import ShopCard from '../../components/user/ShopCard'
import UserHeader from '../../components/user/UserHeader'
import { Box, Flex } from '@chakra-ui/react'

function Shoplist() {
  const shoplist = [
    {
      display_name: 'Arasuna Coffee',
      handle_name: '@arasuna_kiyosumi',
      image: 'https://picsum.photos/300/200/?random',
      description: '美味しいコーヒー提供してま〜す',
      url: '/',
    },
    {
      display_name: 'Arasuna Coffee2',
      handle_name: '@arasuna_kiyosumi',
      image: 'https://picsum.photos/300/200/?random',
      description:
        '清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。',
      url: '/',
    },
    {
      display_name: 'Arasuna Coffee3',
      handle_name: '@arasuna_kiyosumi',
      image: 'https://picsum.photos/300/200/?random',
      description:
        '清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。',
      url: '/',
    },
  ];

  return (
    <Box>
      <Head>
        <title>ショップ一覧</title>
        <meta name="shoplist" content="ショップ一覧" />
      </Head>
      <UserHeader />
      <Flex>
        { shoplist.map((shop, key) => {
          return (
            <ShopCard
            key={key}
            display_name={shop.display_name}
            handle_name={shop.handle_name}
            image={shop.image}
            description={shop.description}
            url={shop.url} />
          )})
        }
      </Flex>
    </Box>
  )
}

export default Shoplist
