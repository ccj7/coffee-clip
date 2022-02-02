import { useEffect, useState, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import UserHeader from '../../components/user/UserHeader'
import ShopCard from '../../components/user/ShopCard'
import UserResultCard from '../../components/user/UserResultCard'
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Center,
  SimpleGrid
} from '@chakra-ui/react'

const Search: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  const router = useRouter()
  const keyword = router.query.about

  const [shopsInfo, setShopsInfo] = useState<PartOfShopData[]>([])
  const [usersInfo, setUsersInfo] = useState<PartOfUserData[]>([])

  useEffect(() => {
    const getSearchResult = async () => {
      const res = await axios.get(`/api/users/search?keyword=${keyword}`)
      setUsersInfo(res.data.users)
      setShopsInfo(res.data.shops)
    }
    getSearchResult()
  }, [keyword])

  return (
    <Box>
      <Head>
        <title>検索結果</title>
        <meta name="Search" content="Search" />
      </Head>
      <UserHeader />
      <Center mb='40px'>
        <Heading size='md' mt='50px' >検索結果</Heading>
      </Center>
      <Box
        w={{base:'98%', md:'65%'}}
        my='0' mx='auto'>
        <Tabs isFitted p='20px'>
          <TabList borderBottom='none'>
            <Tab
              pt='13px' pb='13px'
              fontWeight='bold'
              borderBottom='2px solid'
              borderColor='brand.color4'
              _selected={{
                color: 'white',
                bg: 'brand.color4',
                borderTopRadius: '16px',
                boxShadow: '-1px -1px 6px rgba(0, 0, 0, 0.3)'
               }}>
              ユーザー
            </Tab>
            <Tab
              pt='13px' pb='13px'
              fontWeight='bold'
              borderBottom='2px solid'
              borderColor='brand.color4'
              _selected={{ 
                color: 'white',
                bg: 'brand.color4',
                borderTopRadius: '16px',
                boxShadow: '-1px -1px 6px rgba(0, 0, 0, 0.3)'
                }}>
              ショップ
            </Tab>
          </TabList>

          <TabPanels
            borderBottomRadius='16px'
            backgroundColor='orange.50'
            boxShadow='0px 2px 6px rgba(0, 0, 0, 0.3)'>
            <TabPanel>
              {usersInfo &&
                usersInfo.map((user: any, key: any) => {
                  return (
                    <UserResultCard
                      key={key}
                      display_name={user.display_name}
                      handle_name={user.handle_name}
                      icon={user.icon}
                    />
                  )
                })}
              {!usersInfo.length && (
                <>
                  <Text>検索結果がありません</Text>
                </>
              )}
            </TabPanel>
            <TabPanel>
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
              {!shopsInfo.length && (
                <>
                  <Text>検索結果がありません</Text>
                </>
              )}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

Search.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default Search
