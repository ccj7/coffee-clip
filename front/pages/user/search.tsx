import Head from 'next/head'
import { useEffect, useState, VFC } from 'react'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import UserHeader from '../../components/user/UserHeader'
import { useRouter } from 'next/router'
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from '@chakra-ui/react'
import { async } from '@firebase/util'
import axios from 'axios'
import ShopCard from '../../components/user/ShopCard'

interface Shop {
  auth_id: string
  display_name: string
  handle_name: string
  icon?: string
  selling_point?: string
}

const Search: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  const router = useRouter()
  const keyword = router.query.about

  const [shopsInfo, setShopsInfo] = useState<Shop[]>([])

  useEffect(() => {
    const getSearchResult = async () => {
      const res = await axios.get(`/api/users/search?keyword=${keyword}`)
      console.log(res.data.users)
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
      <Heading>検索結果</Heading>

      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Shops</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
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
            {!shopsInfo.length && (
              <>
                <Text>検索結果：なし</Text>
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

Search.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default Search
