import Head from 'next/head'
import axios from 'axios'

import UserHeader from '../../components/user/UserHeader'
import Profile from '../../components/Profile'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Box, Text, Flex, Spacer, Stack } from '@chakra-ui/react'

import { VFC } from 'react'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'
import LogCard from '../../components/user/LogCard'

// TODO: interfaceのデータ型を確認
// interface Review {
//   image?: string
//   description?: string
// }

// interface User {
//   auth_id: string
//   handle_name: string
//   display_name: string
//   icon?: string
//   follower_handle_names?: Array<string>
//   followee_handle_names?: Array<string>
//   followee_shops_handle_names?: Array<string>
//   reviews: Array<Review>
//   _id: string
// }

const Mypage: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()

  const initial = {
    auth_id: '',
    handle_name: '',
    display_name: '',
    icon: '',
    follower_handle_names: [''],
    followee_handle_names: [''],
    followee_shops_handle_names: [''],
    reviews: [''],
    _id: '',
  }

  // ユーザー情報
  const [userInfo, setUserInfo] = useState(initial)

  // TODO paramsからハンドルネームを取得

  //　user情報を取得
  useEffect(() => {
    const getUser = async () => {
      const res: any = await axios.get(`/api/users/${currentUser}`)
      console.log(res.data)

      if (res.data !== null) {
        setUserInfo(res.data)
      }
    }

    getUser()
  }, [currentUser])

  // TODO: typescriptのuserInfo用のinterfaceをサーバー側から流用して作成
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
