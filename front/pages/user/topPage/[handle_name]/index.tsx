// TODO　U-006 github issue#40

import { Box, Text, HStack, Spacer } from '@chakra-ui/react'

import Head from 'next/head'
import { useContext, useEffect, useState, VFC } from 'react'
import PrimaryButton from '../../../../components/Button'
import Profile from '../../../../components/Profile'

import UserHeader from '../../../../components/user/UserHeader'
import { useRouter } from 'next/router'
import axios from 'axios'
import PostImage from '../../../../components/Image'
import { AuthContext, useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'

const UserTopPage: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()

  const router = useRouter()
  const { handle_name } = router.query

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

  useEffect(() => {
    const getUser = async (handle: string | string[]) => {
      // エンドポイントの確認
      const res: any = await axios.get(`/api/users/${handle}`)
      setUserInfo(res.data)
    }
    if (handle_name) {
      getUser(handle_name)
    }
    // TODO ハンドルネームいるか確認
  }, [handle_name])

  return (
    <Box>
      <Head>
        <title>トップページ</title>
        <meta name="userTopPage" content="ユーザートップページ" />
      </Head>
      <UserHeader />

      <Box m="3">
        <HStack>
          {/* <Profile
            display_name={userInfo.display_name}
            handle_name={userInfo.handle_name}
            icon={userInfo.icon}
          /> */}
          ここがユーザートップ
          <Spacer></Spacer>

        </HStack>
      </Box>

    </Box>
  )
}

UserTopPage.getAccessControl = async () => {
  return ! await isLoggedIn() ? { type: 'replace', destination: '/user/signin' } : null
}

export default UserTopPage
