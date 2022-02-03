import { VFC, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import Profile from '../../components/Profile'
import MyLogCard from '../../components/user/MyLogCard'
import PrimaryButton from '../../components/Button'

import { Box, Text, Spacer, Stack, HStack, Flex } from '@chakra-ui/react'

const Mypage: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()
  const router = useRouter()

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
        <Box
          w="100%"
          h="520px"
          background="#988d83"
          backgroundImage="linear-gradient(62deg, #988d83 0%, #f7dcae 100%)"
          borderBottomRadius="46px"
          mb="-140px"
          pt="20px"
        >
          <Profile
            display_name={userInfo.display_name}
            handle_name={userInfo.handle_name}
            icon={userInfo.icon}
          />

          <HStack
            w={{ base: '320px', md: '350px' }}
            borderRadius="15px"
            backgroundColor="rgba(245, 239, 235, 0.25)"
            backdropFilter="blur(4px)"
            webkit-backdropfilter="blur(4px)"
            border="1px solid rgba(255, 255, 255, 0.18)"
            ml="auto"
            mr="auto"
            my="0"
            p="10px 20px 10px 20px"
          >
            <Box>
              <Text ml="40%" fontSize="20px" fontWeight="bold">
                {userInfo.followee_handle_names.length}
              </Text>
              <Text fontSize={{ base: '10px', md: '14px' }}>フォロー</Text>
            </Box>
            <Spacer />
            <Box>
              <Text ml="40%" fontSize="20px" fontWeight="bold">
                {userInfo.follower_handle_names.length}
              </Text>
              <Text fontSize={{ base: '10px', md: '14px' }}>フォロワー</Text>
            </Box>
            <Spacer />
            <Link href="/user/favorite-shops">
              <Box>
                <Text ml="40%" fontSize="20px" fontWeight="bold">
                  {userInfo.followee_shops_handle_names.length}
                </Text>
                <Text fontSize={{ base: '8px', md: '12px' }}>
                  お気に入りShop
                </Text>
              </Box>
            </Link>
          </HStack>
        </Box>
      )}

      <Box 
        w={{ base: '80%', md: '65%' }}
        my="0" 
        mx="auto"
      >
        <Box mb='-20px' mt="20px" textAlign='right'>
        <PrimaryButton
            text={'新しい投稿をする'}
            onclick={() => {
              router.push('/user/new-review')
            }}
        />
        </Box>
      </Box>

      <Stack>
        {userInfo && (
          <Box w={{ base: '80%', md: '65%' }} my="0" ml="auto" mr="auto">
            {userInfo.reviews.map((data: any, key: any) => {
              return (
                <MyLogCard
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
