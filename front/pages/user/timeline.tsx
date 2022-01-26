// TODO　U-001 github issue#20

import {
  Box,
  HStack,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import axios from 'axios'

import Head from 'next/head'
import UserHeader from '../../components/user/UserHeader'
import LogCard from '../../components/user/LogCard'
import PrimaryButton from '../../components/Button'
import { useEffect, useState } from 'react'
import { FiCoffee } from 'react-icons/fi';
import { useRouter } from 'next/router'

import { VFC } from 'react'
import { useAuthContext } from '../../auth/AuthContext'

let isLogin = false

interface Review {
  image?: string
  description?: string
}

interface User {
  auth_id: string
  handle_name: string
  display_name: string
  icon: string
  reviews: [Review]
  _id: string
}

const Timeline: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  if (currentUser) isLogin = true
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<[User]>()

  // TODO paramsからハンドルネームを取得
  useEffect(() => {
    const getUser = async (authId: string) => {
      const res: any = await axios.get(`/api/users/${authId}/followee/reviews`)
      setUserInfo(res.data.reviewsOfFollowees)
    }
    getUser('4E5Jby73IVRAypSDyV3IfFcQwXz1')
  }, [])

  return (
    <div>
      <Head>
        <title>Timeline</title>
        <meta name="Timeline" content="タイムライン" />
      </Head>
      <UserHeader />
      <Box m="3">
        <HStack p="2">
          <FiCoffee />
          <Spacer></Spacer>
          <PrimaryButton
              text={"新しい投稿をする"}
              onclick={() => {router.push('/user/new-review')}}
            />
        </HStack>
        <Stack>
          {userInfo &&
            <Box>
              {userInfo.map((data, key) => {
                return <LogCard 
                  key={key}
                  display_name={data.display_name}
                  handle_name={data.handle_name}
                  icon={data.icon}
                  review={data.reviews}/>
              }
            )}
            </Box>
          }
        </Stack>
      </Box>
    </div>
  )
}

Timeline.getAccessControl = () => {
  return !isLogin ? { type: 'replace', destination: '/user/signin' } : null
}

export default Timeline
