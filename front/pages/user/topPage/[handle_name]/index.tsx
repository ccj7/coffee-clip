// TODO　U-006 github issue#40

import { Box, Text, Stack, Spacer, Flex } from '@chakra-ui/react'

import Head from 'next/head'
import { useContext, useEffect, useState, VFC } from 'react'
import PrimaryButton from '../../../../components/Button'
import Profile from '../../../../components/Profile'
import LogCard from '../../../../components/user/LogCard'
import UserHeader from '../../../../components/user/UserHeader'
import { useRouter } from 'next/router'
import axios from 'axios'
import PostImage from '../../../../components/Image'
import { AuthContext, useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'
import Link from 'next/link'

// TODO: 全体的に型定義
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
  }
  
  // ユーザー情報
  const [userInfo, setUserInfo] = useState(initial)
  // フォローしているかどうか
  const [isFollow, setIsFollow] = useState<boolean>(false)

  useEffect(() => {
    const getUser = async (handle: string | string[]) => {
      const res: any = await axios.get(`/api/users/details/${handle}`)
      setUserInfo(res.data)
      console.log(res.data)
    }

    if (handle_name) {
      getUser(handle_name)
    }
    // TODO ハンドルネームいるか確認
  }, [handle_name])

  const orFollow = () => {
    if (isFollow) {
      setIsFollow(false)
      // 
    } else {
      setIsFollow(true)
      // ハンドルネームを送る?
    }
  }

  return (
    <Box>
      <Head>
        <title>トップページ</title>
        <meta name="userTopPage" content="ユーザートップページ" />
      </Head>
      <UserHeader />
      
      {userInfo && (
      <Flex>
        <Profile
          display_name={userInfo.display_name}
          handle_name={userInfo.handle_name}
          icon={userInfo.icon}
        />
        <Spacer/>
        <Box>
          <Text>{userInfo.followee_handle_names.length}</Text>
          <Text>フォロー</Text>
          </Box>
        <Box>
          <Text>{userInfo.follower_handle_names.length}</Text>
          <Text>フォロワー</Text>
        </Box>
        <Link href='/favorite-shops'>
          <Box>
            <Text>{userInfo.followee_shops_handle_names.length}</Text>
            <Text>お気に入りShop</Text>
          </Box>
        </Link>
      </Flex>
      )}

      {userInfo && (
      <Flex>
        {isFollow && (
        <Box>フォロー中</Box>
        )}
          <PrimaryButton
           text={isFollow ? 'フォローを外す' : 'フォローする'}
           onclick={orFollow}
          />
      </Flex>
      )}
      
      <Stack>
        {userInfo &&
        <Box>
          {userInfo.reviews.map((data: any, key: any) => {
            return <LogCard 
              key={key}
              display_name={userInfo.display_name}
              handle_name={userInfo.handle_name}
              icon={userInfo.icon}
              review={data}/>
            }
          )}
        </Box>
        }
      </Stack>

    </Box>
  )
}

UserTopPage.getAccessControl = async () => {
  return ! await isLoggedIn() ? { type: 'replace', destination: '/user/signin' } : null
}

export default UserTopPage
