// TODO　U-005 github issue#25

import Head from 'next/head'
import { useEffect, useState, VFC } from 'react'

import Header from '../../components/shop/Header'
import ShopCard from '../../components/user/ShopCard'
import UserHeader from '../../components/user/UserHeader'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import { Box, Flex } from '@chakra-ui/react'
import axios from 'axios'

interface Shop {
  auth_id: string
  display_name: string
  handle_name: string
  icon?: string
  selling_point?: string
}

const LikeShops: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  const [shopsInfo, setShopsInfo] = useState<Shop[]>([
    {
      auth_id: '',
      display_name: '',
      handle_name: '',
      icon: '',
      selling_point: '',
    },
  ])

  useEffect(() => {
    const getShopsInfo = async (authId: string) => {
      const res: any = await axios.get(`/api/users/${authId}/followee/shops`)
      setShopsInfo(res.data.followeeShops)
    }

    if (currentUser) {
      getShopsInfo(currentUser)
    }
  }, [currentUser])

  return (
    <Box>
      <Head>
        <title>ショップ一覧</title>
        <meta name="shopslist" content="ショップ一覧" />
      </Head>
      <UserHeader />
      <Flex>
        {shopsInfo &&
          shopsInfo.map((shop: any, key: any) => {
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
      </Flex>
    </Box>
  )
}

LikeShops.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default LikeShops
