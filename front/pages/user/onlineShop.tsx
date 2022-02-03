import { VFC, useEffect, useState } from 'react'
import Head from 'next/head'
import cafe_sweet_001 from '../../img/cafe_sweet_001.jpg'
import arasuna_001 from '../../img/arasuna_001.jpg'
import moon_bucks_001 from '../../img/moon_bucks_001.jpg'
import fourth_coffee_001 from '../../img/4th_coffee_001.jpg'

import { isLoggedIn } from '../../util'

import OnlineShopCard from '../../components/user/OnlineShopCard'
import UserHeader from '../../components/user/UserHeader'

import { Box, Text, Heading, Center, SimpleGrid } from '@chakra-ui/react'

const onlineShop: WithGetAccessControl<VFC> = (props) => {
  const [products, setProducts] = useState<any[]>([
    {
      handle_name: 'toutor',
      name: 'コロンビア',
      price: '1,100',
      price_ID: 'price_1KOcaMCy4RvxOO5U34poYyvy',
      image: cafe_sweet_001,
      concept: '酸味と甘味が重厚だが突出せずバランスが良い。',
    },
    {
      handle_name: 'arasuna',
      name: 'モカ',
      price: '980',
      price_ID: 'price_1KOcZHCy4RvxOO5UQI87a6Xb',
      image: arasuna_001,
      concept: '香気に優れ独特の酸味を持ち、甘みとコクが加わる。',
    },
    {
      handle_name: 'moon_bucks',
      name: 'ブルーマウンテン',
      price: '1,400',
      price_ID: 'price_1KOcYBCy4RvxOO5UYJuMT4Lt',
      image: moon_bucks_001,
      concept: '軽い口当りと滑らかな咽越しが特徴。',
    },
    {
      handle_name: '4th_coffee',
      name: 'キリマンジャロ',
      price: '980',
      price_ID: 'price_1KOcX2Cy4RvxOO5UTwoEjBJQ',
      image: fourth_coffee_001,
      concept: '強い酸味とコクが特長。',
    },
  ])

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
  }, [])

  return (
    <Box>
      <Head>
        <title>オンラインショップ</title>
        <meta name="onlineShop" content="オンラインショップ" />
      </Head>
      <UserHeader />

      <Center>
        <Heading size="md" mt="50px">
          オンラインショップ
        </Heading>
      </Center>
      <Center w={{base:'80%', md:'65%'}} mx='auto' my='0'>
        <Text mt='14px' fontSize={'sm'}>
          このオンラインショップでは、COFFEE CLIPが厳選した豆を販売しています
        </Text>
      </Center>

      <Box w={{ base: '80%', md: '65%' }} my="0" mx="auto">
        <SimpleGrid columns={{ md: 2 }}>
          {products.map((product: any, key: any) => {
            return (
              <OnlineShopCard
                key={key}
                name={product.name}
                handle_name={product.handle_name}
                image={product.image}
                concept={product.concept}
                price_ID={product.price_ID}
                price={product.price}
              />
            )
          })}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

onlineShop.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default onlineShop
