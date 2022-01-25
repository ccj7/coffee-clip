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
import { useEffect, useState } from 'react'
import PrimaryButton from '../../../../components/Button'
import Profile from '../../../../components/Profile'

import Header from '../../../../components/shop/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

function shopTopPageTest() {
  const router = useRouter();
  const { handle_name } = router.query;
  
  useEffect(() => {
    const getShop = async (handle_name: string) => {
      // TODO: dammy変更してください
      const res: any = await axios.get(
        `/api/shops/540PJipKIwXZUY422LmC2j3ZlvU2`
      )
      console.log(res.data)
      setShopInfo(res.data)
    }
    // TODO: 直接入力しているhandle_nameを変更
    getShop("string")
  }, [])

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
    selling_point: '',
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
    <div>
      <Head>
        <title>shop Top Page</title>
        <meta name="shopTopPage" content="shop Top Page" />
      </Head>
      <Header />

      <Box m="3">
        <HStack>
          <Profile
            display_name={shopInfo.display_name}
            handle_name={shopInfo.handle_name}
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
            <PrimaryButton
              text={isfavorite ? 'お気に入り' : 'お気に入りに登録する'}
              onclick={registerFavarite}
            />
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
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* <Image boxSize="200px" /> */}
              <HStack>
                <Box boxSize="200" bg="blue.200">
                  image!
                </Box>
                <Stack>
                  <Text>おすすめの一杯</Text>
                  <Text>{shopInfo.recommendation.title}</Text>
                  <Text>{shopInfo.recommendation.description}</Text>
                </Stack>
              </HStack>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  )
}

export default shopTopPageTest