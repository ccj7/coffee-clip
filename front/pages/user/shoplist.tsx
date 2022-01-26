// TODO　U-002 github issue#23

import Head from 'next/head'
import axios from 'axios'

import ShopCard from '../../components/user/ShopCard'
import UserHeader from '../../components/user/UserHeader'
import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { VFC } from 'react'
import { useAuthContext } from '../../auth/AuthContext'

let isLogin = false

interface Shop {
  auth_id: string,
  display_name: string,
  handle_name: string,
  icon?: string,
  selling_point?: string
}

const Shoplist: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  if (currentUser) isLogin = true
  const [shopsInfo, setShopsInfo] = useState<[Shop]>();

  // shopの一覧情報を取得
  useEffect(() => {
    const getShopsInfo = async () => {
      const res: any = await axios.get('/api/shops');
      setShopsInfo(res.data)
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

Shoplist.getAccessControl = () => {
  return !isLogin ? { type: 'replace', destination: '/user/signin' } : null
}

export default Shoplist
