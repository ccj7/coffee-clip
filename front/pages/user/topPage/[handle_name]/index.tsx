import { useEffect, useState, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'

import { useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'

import PrimaryButton from '../../../../components/Button'
import Profile from '../../../../components/Profile'
import LogCard from '../../../../components/user/LogCard'
import UserHeader from '../../../../components/user/UserHeader'

import { Box, Text, Stack, Spacer, Flex, HStack, Center } from '@chakra-ui/react'

const UserTopPage: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useAuthContext()

  const router = useRouter()
  const { handle_name } = router.query

  const [userInfo, setUserInfo] = useState<UserData | null>(null)
  const [isFollow, setIsFollow] = useState<boolean>(false)

  const getUser = async (handle: string | string[], authId: string) => {

    try {
      const res: AxiosResponse = await axios.get(`/api/users/${authId}/${handle}`)
      const myUser: AxiosResponse = await axios.get(`/api/users/${currentUser}`)
  
      if (myUser.data.handle_name === handle_name) {
        router.replace('/user/mypage')
      } else {
        setUserInfo(res.data)
        setIsFollow(res.data.is_following)
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (handle_name && currentUser) {
      getUser(handle_name, currentUser)
    }
  }, [handle_name, currentUser])

  const unfollow = () => {
    const putUser = async (authId: string) => {
      await axios.put(
        `/api/users/${authId}/users/unfollowing`,
        {
          handle_name: userInfo?.handle_name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (handle_name && currentUser) {
        getUser(handle_name, currentUser)
      }
    }

    if (currentUser) {
      putUser(currentUser)
    }
  }

  const follow = () => {
    const putUser = async (authId: string) => {
      await axios.put(
        `/api/users/${authId}/users/following`,
        {
          handle_name: userInfo?.handle_name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (handle_name && currentUser) {
        getUser(handle_name, currentUser)
      }
    }

    if (currentUser) {
      putUser(currentUser)
    }
  }

  const orFollow = () => {
    if (isFollow) {
      setIsFollow(false)
      unfollow()
    } else {
      setIsFollow(true)
      follow()
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
        <Box
          w="100%"
          h="550px"
          background="#988d83"
          backgroundImage="linear-gradient(62deg, #988d83 0%, #f7dcae 100%)"
          borderBottomRadius="46px"
          mb="-120px"
          pt="20px"
        >
          <Profile
            display_name={userInfo.display_name}
            handle_name={userInfo.handle_name}
            icon={userInfo.icon}
          />

           {userInfo && (
           <Box
              w={{ base: '300px', md: '350px' }} 
              mx='auto' 
              mb='30px'
              mt='-20px'>
            <Center>
              <PrimaryButton
                text={isFollow ? 'フォロー中' : 'フォローする'}
                onclick={orFollow}
              />
            </Center>
          </Box>
          )}

          <HStack
            w={{ base: '320px', md: '350px' }}
            borderRadius="15px"
            backgroundColor="rgba(245, 239, 235, 0.25)"
            backdropFilter="blur(4px)"
            webkit-backdropfilter="blur(4px)"
            border="1px solid rgba(255, 255, 255, 0.18)"
            mx="auto"
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
          <Box>
            <Text ml="40%" fontSize="20px" fontWeight="bold">
              {userInfo.followee_shops_handle_names.length}
            </Text>
            <Text fontSize={{ base: '8px', md: '12px' }} >
              お気に入りShop
            </Text>
          </Box>
          </HStack>
        </Box>
      )}

      <Stack>
        {userInfo && (
          <Box w={{ base: '80%', md: '65%' }} my="0" ml="auto" mr="auto">
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

UserTopPage.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/user/signin' }
    : null
}

export default UserTopPage
