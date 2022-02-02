import { VFC, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

import UserHeader from '../../components/user/UserHeader'
import LogCard from '../../components/user/LogCard'
import PrimaryButton from '../../components/Button'
import coffeeImg from '../../img/coffee.png'

import { FiCoffee } from 'react-icons/fi'
import { Box, Center, Heading, HStack, Spacer, Stack, Text, VStack } from '@chakra-ui/react'

interface User {
  auth_id: string
  handle_name: string
  display_name: string
  icon: string
  review: Review[]
}

const Timeline: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<User[]>()

  // TODO paramsからハンドルネームを取得
  useEffect(() => {
    const getUser = async (authId: string) => {
      const res: any = await axios.get(`/api/users/${authId}/followee/reviews`)
      console.log(res.data.reviews)
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
        <meta name="Timeline" content="タイムライン" />
      </Head>
      <UserHeader />
      <Box w={{base:'80%', md:'65%'}} my='0' mr='auto' ml='auto' mt='30px'>
        <HStack p="2">
          <HStack color='brand.color1'>
            <FiCoffee /> 
            <Heading as='h2' size='md'>Time Line</Heading>
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
          { userInfo && userInfo.length > 0 && (
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
            <Box
              w={{ base: '80%', md: '65%' }}
              ml="auto" mr="auto">
              <Box
              my={12} p={8} mt='70px'
              borderRadius='16px'
              backgroundColor='orange.50'
              boxShadow='0px 2px 6px rgba(0, 0, 0, 0.3)'>
                <Center mt='20px'>
                  <VStack>
                    <Heading size='md'>
                      まだタイムラインに表示する情報がありません。
                    </Heading>
                  <Text>お気に入りのお店や気になるユーザーを探してみましょう！</Text>
                  </VStack>
                </Center>
                <Center mt='15px'>
                  <Box w='50%'>
                    <Image src={coffeeImg} alt='Coffee' />
                  </Box>
                </Center>
              </Box>
            </Box>
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
