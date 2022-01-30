import { VFC, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import Profile from '../../components/Profile'
import LogCard from '../../components/user/LogCard'

import { Box, Text, Flex, Spacer, Stack } from '@chakra-ui/react'

const Mypage: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  // ユーザー情報
  const [userInfo, setUserInfo] = useState<UserData | null>(null)

  //　user情報を取得
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/api/users/${currentUser}`)

      // TODO このコードの意味確認
      // if (res.data !== null) {
      setUserInfo(res.data)
      // }
    }

    if (currentUser) {
      getUser()
    }
  }, [currentUser])

  return (
    <Box>
      <Head>
        <title>マイページ</title>
        <meta name="mypage" content="マイページ" />
      </Head>
      <UserHeader />

      {userInfo && (
        <Flex>
          <Profile
            display_name={userInfo.display_name}
            handle_name={userInfo.handle_name}
            icon={userInfo.icon}
          />
          <Spacer />
          <Box>
            <Text>{userInfo.followee_handle_names.length}</Text>
            <Text>フォロー</Text>
          </Box>
          <Box>
            <Text>{userInfo.follower_handle_names.length}</Text>
            <Text>フォロワー</Text>
          </Box>
          <Link href="/user/favorite-shops">
            <Box>
              <Text>{userInfo.followee_shops_handle_names.length}</Text>
              <Text>お気に入りShop</Text>
            </Box>
          </Link>
        </Flex>
      )}

      <Stack>
        {userInfo && (
          <Box>
            {userInfo.reviews.map((data: any, key: any) => {
              return (
                <LogCard
                  key={key}
                  display_name={userInfo.display_name}
                  handle_name={userInfo.handle_name}
                  icon={userInfo.icon}
                  review={data}
                />
              )
            })}
          </Box>
        )}
      </Stack>
    </Box>
  )
}

Mypage.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default Mypage
