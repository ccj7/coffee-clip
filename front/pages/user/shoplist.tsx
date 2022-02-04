import { VFC, useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

import { isLoggedIn } from '../../util'

import ShopCard from '../../components/user/ShopCard'
import UserHeader from '../../components/user/UserHeader'

import { Box, Flex, Heading, Center, SimpleGrid } from '@chakra-ui/react'

const Shoplist: WithGetAccessControl<VFC> = (props) => {
  const [shopsInfo, setShopsInfo] = useState<PartOfShopData[]>()

  // shopの一覧情報を取得
  useEffect(() => {
    const getShopsInfo = async () => {
      const res: any = await axios.get('/api/shops')
      setShopsInfo(res.data)
    }

    getShopsInfo()
  }, [])

  return (
    <Box>
      <Head>
        <title>ショップ一覧</title>
      </Head>
      <UserHeader />
      <Center>
        <Heading size="md" mt="50px">
          ショップ一覧
        </Heading>
      </Center>

      <Box w={{ base: '80%', md: '65%' }} my="0" mx="auto">
        <SimpleGrid columns={{ md: 2 }}>
          {shopsInfo &&
            shopsInfo.map((shop: PartOfShopData, key: any) => {
              return (
                <ShopCard
                  key={key}
                  display_name={shop.display_name}
                  handle_name={shop.handle_name}
                  icon={shop.icon}
                  concept={shop.concept}
                />
              )
            })}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

Shoplist.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default Shoplist
