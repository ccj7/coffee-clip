import { useEffect, useState, VFC } from 'react'
import Head from 'next/head'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import ShopCard from '../../components/user/ShopCard'
import UserHeader from '../../components/user/UserHeader'
import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/react'

const LikeShops: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  const [shopsInfo, setShopsInfo] = useState<PartOfShopData[] | null>(null)

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
        <title>お気に入りショップ</title>
        <meta name="favorite shops" content="お気に入りショップ" />
      </Head>
      <UserHeader />
      <Center>
        <Heading size='md' mt='50px' >お気に入りショップ</Heading>
      </Center>

      <Box w={{base:'80%', md:'65%'}} my='0' mx='auto'>
        <SimpleGrid columns={{md:2}}>
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

LikeShops.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default LikeShops
