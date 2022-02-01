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
  Link
} from '@chakra-ui/react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { useContext, useEffect, useState, VFC } from 'react'
import PrimaryButton from './Button'
import Profile from './Profile'

import axios from 'axios'
import PostImage from './Image'
import { AuthContext } from '../auth/AuthContext'
import { shopInitialData } from '../initial_data/shopInitialDdata'

const ShopTopPage = (props: any) => {
  const { handle_name, isUser } = props
  const { currentUser } = useContext(AuthContext)

  const getShop = async (handle: string | string[]) => {
     if(currentUser) {
       const res: any = await axios.get(`/api/shops/${currentUser}/${handle}`)
       setShopInfo(res.data)
     }
  }

  useEffect(() => {
    if (handle_name) {
      getShop(handle_name)
    }
  }, [handle_name, currentUser])

  const [shopInfo, setShopInfo] = useState<ShopData>(shopInitialData)

  const registerFavarite = () => {
    if (shopInfo.is_following) {
      const unfollow = async () => {
        const res = await axios.put(
          `/api/users/${currentUser}/shops/unfollowing`,
          {
            handle_name: handle_name,
          }
        )
        if (handle_name) {
          getShop(handle_name)
        }
      }
      unfollow()
    } else {
      const follow = async () => {
        const res = await axios.put(
          `/api/users/${currentUser}/shops/following`,
          {
            handle_name: handle_name,
          }
        )
        if (handle_name) {
          getShop(handle_name)
        }
      }
      follow()
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
          <Link href={shopInfo.instagram_url} isExternal>
            <Icon
              as={AiOutlineInstagram}
              w={7}
              h={7}
            />
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
                text={shopInfo.is_following ? 'お気に入りに登録済み' : 'お気に入りに登録する'}
                onclick={registerFavarite}
              />
            )}
            {!isUser && (
              <PrimaryButton
                text={shopInfo.is_following ? 'お気に入りに登録済み' : 'お気に入りに登録する'}
              />
            )}
          </Box>
        </HStack>
        <Text>{shopInfo.concept}</Text>

        <HStack spacing="40px">
          <Stack>
            <Link href={shopInfo.map_url} isExternal>
              住所: {shopInfo.address}
            </Link>
            <Link href={shopInfo.hp_url} isExternal>
              HP: {shopInfo.hp_url}
            </Link>
          </Stack>
          <Stack>
            <Text>営業時間: {shopInfo.opening_hours}</Text>
            <Text>定休日: {shopInfo.regular_day_off}</Text>
          </Stack>
        </HStack>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>お店の紹介</Tab>
            <Tab>コーヒー豆販売！</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <HStack>
                {shopInfo.recommendation.image &&
                  <PostImage
                    src={shopInfo.recommendation.image}
                    alt="おすすめの一杯の写真"
                  />
                }
                <Stack>
                  <Text>おすすめの一杯</Text>
                  <Text>{shopInfo.recommendation.title}</Text>
                  <Text>{shopInfo.recommendation.description}</Text>
                </Stack>
              </HStack>
              <HStack>
                {shopInfo.recommendation.image &&
                  <PostImage
                    src={shopInfo.selling_point.image}
                    alt="お店の魅力を表す写真"
                  />
                }
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
