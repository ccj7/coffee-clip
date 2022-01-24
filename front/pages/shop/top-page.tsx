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
import { useState } from 'react'
import PrimaryButton from '../../components/Button'
import Profile from '../../components/Profile'

import Header from '../../components/shop/Header'
import Link from 'next/link'

function shopTopPage() {
  const dammy = {
    auth_id: '1',
    handle_name: 'arasuna_coffee',
    display_name: 'Arasuna Coffee',
    icon: 'image',
    address: '東京都コードクリサリス',
    map_url: 'googlemap URL',
    hp_url: 'HPURL',
    instagram_url: 'instagram URL',
    opening_hours: '9:00~10:00',
    regular_day_off: '月曜日',
    concept: '美味しいコーヒー提供してま〜す',
    recommendation: {
      title: 'グリッチ',
      description: '酸味が特徴！',
      image: 'image',
    },
    selling_point: 'image',
    follower_handle_name: ['ccmizki'],
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

export default shopTopPage
