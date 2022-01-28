import {
  Box,
  Center,
  HStack,
  Icon,
  Spacer,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { AiOutlineInstagram } from 'react-icons/ai'
import Head from 'next/head'
import { useContext, useEffect, useState, VFC } from 'react'
import PrimaryButton from './Button'
import Profile from './Profile'

import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import PostImage from './Image'
import { AuthContext, useAuthContext } from '../auth/AuthContext'
import { isLoggedIn } from '../util'
import UserHeader from './user/UserHeader'

const ShopTopPage = (props: any) => {
  const { handle_name, isUser } = props
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const getShop = async (handle: string | string[]) => {
      const res: any = await axios.get(`/api/shops/details/${handle}`)
      setShopInfo(res.data)
    }
    if (handle_name) {
      getShop(handle_name)
    }
  }, [handle_name])

  const dammy = {
    auth_id: '',
    handle_name: '',
    display_name: '',
    icon: '',
    address: '',
    map_url: '',
    hp_url: '',
    instagram_url: '',
    opening_hours: '',
    regular_day_off: '',
    concept: '',
    recommendation: {
      title: '',
      description: '',
      image: '',
    },
    selling_point: {
      text: '',
      image: '',
    },
    follower_handle_name: [''],
  }
  const [shopInfo, setShopInfo] = useState<any>(dammy)
  const [isfavorite, setIsfavorite] = useState<boolean>(false)

  const registerFavarite = () => {
    if (isfavorite) {
      setIsfavorite(false)
    } else {
      setIsfavorite(true)
    }
  }

  return (
    <>
      <Box m="3">
        <HStack>
          <Profile
            display_name={shopInfo.display_name}
            handle_name={shopInfo.handle_name}
            icon={shopInfo.icon}
          />
          <Spacer></Spacer>

          <Link href={shopInfo.instagram_url}>
            <Icon as={AiOutlineInstagram} w={7} h={7} />
          </Link>
          <Spacer></Spacer>
          <Box>
            <Center>
              <Text>お気に入り</Text>
            </Center>
            <Center>
              <Text>{shopInfo.follower_handle_name.length}</Text>
            </Center>
            {isUser && (
              <PrimaryButton
                text={isfavorite ? 'お気に入り' : 'お気に入りに登録する'}
                onclick={registerFavarite}
              />
            )}
            {!isUser && (
              <PrimaryButton
                text={isfavorite ? 'お気に入り' : 'お気に入りに登録する'}
              />
            )}
          </Box>
        </HStack>
        <Text>{shopInfo.concept}</Text>

        <HStack spacing="40px">
          <Stack>
            <Text>住所：{shopInfo.address}</Text>
            <Text>HP：{shopInfo.hp_url}</Text>
          </Stack>
          <Stack>
            <Text>営業時間:{shopInfo.opening_hours}</Text>
            <Text>定休日:{shopInfo.regular_day_off}</Text>
          </Stack>
        </HStack>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>お店の紹介</Tab>
            <Tab>コーヒー豆販売！</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* <Image boxSize="200px" /> */}
              <HStack>
                <PostImage
                  src={shopInfo.recommendation.image}
                  alt="おすすめの一杯の写真"
                />
                <Stack>
                  <Text>おすすめの一杯</Text>
                  <Text>{shopInfo.recommendation.title}</Text>
                  <Text>{shopInfo.recommendation.description}</Text>
                </Stack>
              </HStack>
              <HStack>
                <PostImage
                  src={shopInfo.recommendation.image}
                  alt="お店の魅力を表す写真"
                />
                <Stack>
                  <Text>お店の魅力</Text>
                  <Text>{shopInfo.selling_point.text}</Text>
                </Stack>
              </HStack>
            </TabPanel>
            <TabPanel>
              <p>コーヒー豆販売！</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default ShopTopPage
