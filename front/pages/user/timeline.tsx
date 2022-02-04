import { VFC, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import LogCard from '../../components/user/LogCard'
import PrimaryButton from '../../components/Button'
import { UserInitialDataForTimeline } from '../../initial_data/userInitialData'
import BoxMessage from '../../components/BoxMessage'

import { FiCoffee } from 'react-icons/fi'
import { Box, Heading, HStack, Spacer, Stack } from '@chakra-ui/react'

const Timeline: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserDataForTimeline[]>([
    UserInitialDataForTimeline,
  ])

  useEffect(() => {
    const getUser = async (authId: string) => {
      const res: any = await axios.get(`/api/users/${authId}/followee/reviews`)
      setUserInfo(res.data.reviews)
    }
    if (currentUser) {
      getUser(currentUser)
    }
  }, [currentUser])

  return (
    <div>
      <Head>
        <title>Timeline</title>
      </Head>
      <UserHeader />
      <Box w={{ base: '80%', md: '65%' }} my="0" mr="auto" ml="auto" mt="30px">
        <HStack p="2">
          <HStack color="brand.color1">
            <FiCoffee />
            <Heading as="h2" size="md">
              Time Line
            </Heading>
          </HStack>
          <Spacer></Spacer>
          <PrimaryButton
            text={'新しい投稿をする'}
            onclick={() => {
              router.push('/user/new-review')
            }}
          />
        </HStack>
        <Stack>
          {userInfo && userInfo.length > 0 && (
            <Box>
              {userInfo.map((data, key) => {
                return (
                  <LogCard
                    key={key}
                    display_name={data.display_name}
                    handle_name={data.handle_name}
                    icon={data.icon}
                    review={data.review}
                  />
                )
              })}
            </Box>
          )}
          {userInfo && userInfo.length === 0 && (
            <BoxMessage
              heading="まだタイムラインに表示する情報がありません。"
              text="お気に入りのお店や気になるユーザーを探してみましょう！"
            />
          )}
        </Stack>
      </Box>
    </div>
  )
}

Timeline.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default Timeline
