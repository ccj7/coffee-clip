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

interface Review {
  image?: string
  description?: string
}

interface User {
  auth_id: string
  handle_name: string
  display_name: string
  icon?: string
  reviews: [Review]
}

function postNewReview() {
  // TODO: 新しい投稿をポストする処理を記載
}

function Timeline() {

  const [userInfo, setUserInfo] = useState<User>()
  // TODO paramsからハンドルネームを取得
  
  //　TODO: 仮データのままです！フォローしているユーザーのreviewsを取得
  useEffect(() => {
    const getUser = async (authId: string) => {
      const res: any = await axios.get(`/api/users/${authId}`)
      setUserInfo(res.data)
    }
    getUser('1111')
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
              onclick={postNewReview}
            />
        </HStack>
        <Stack>
          {userInfo &&
            <Box>
              {userInfo.reviews.map((review) => {
                return <LogCard display_name={userInfo.display_name} handle_name={userInfo.handle_name} review={review}/>
              }
            )}
            </Box>
          }
        </Stack>
      </Box>
    </div>
  )
}

export default Timeline
