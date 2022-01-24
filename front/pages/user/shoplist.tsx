// TODO　U-002 github issue#23

import Head from 'next/head'
import axios from 'axios'

import ShopCard from '../../components/user/ShopCard'
import UserHeader from '../../components/user/UserHeader'
import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface Shop {
  auth_id: string,
  display_name: string,
  handle_name: string,
  icon?: string,
  selling_point?: string
}


function Shoplist() {
  const [shopsInfo, setShopsInfo] = useState<[Shop]>();

  // shopの一覧情報を取得
  useEffect(() => {
    const getShopsInfo = async () => {
      const res: any = await axios.get('/api/shops');
      // 本番はdammyはいらない
      setShopsInfo(res.data.dammy)
    }

    getShopsInfo()
  }, []) 

  return (
    <Box>
      <Head>
        <title>ショップ一覧</title>
        <meta name="shopslist" content="ショップ一覧" />
      </Head>
      <UserHeader />
      <Flex>
        { shopsInfo &&
         shopsInfo.map((shop: any, key: any) => {
          return (
            <ShopCard
            key={key}
            auth_id={shop.auth_id}
            display_name={shop.display_name}
            handle_name={shop.handle_name}
            icon={shop.icon}
            concept={shop.concept} />
          )})
        }
      </Flex>
    </Box>
  )
}

export default Shoplist
