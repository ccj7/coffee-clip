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
  Link,
  SimpleGrid,
  Flex
} from '@chakra-ui/react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { useContext, useEffect, useState } from 'react'
import PrimaryButton from './Button'
import Profile from './Profile'

import axios from 'axios'
import PostImage from './Image'
import { AuthContext } from '../auth/AuthContext'
import { shopInitialData } from '../initial_data/shopInitialDdata'

const ShopTopPage = (props: any) => {
  const { handle_name, isUser } = props
  const { currentUser } = useContext(AuthContext)
  const [shopInfo, setShopInfo] = useState<ShopData>(shopInitialData)

  const getShop = async (handle: string | string[]) => {
    if(currentUser && isUser) {
      const res: any = await axios.get(`/api/shops/${currentUser}/${handle}`)
      setShopInfo(res.data)
    } else if(currentUser && !isUser) {
      const res: any = await axios.get(`/api/shops/${currentUser}`)
      if(res.data) {
        setShopInfo(res.data)
      }
    }
  }

  useEffect(() => {
    if (handle_name) {
      getShop(handle_name)
    }
  }, [handle_name, currentUser])

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
    <Box 
     w="100%"
     h='300px'
     pt='50px'
     background="#988d83 "
     backgroundImage="linear-gradient(62deg, #988d83  0%, #af6938 100%)"
    >
      <Box 
        w={{base: '80%', md: '65%'}}
        ml='auto' mr='auto' my='0'
        borderRadius="46px"
        backgroundColor='orange.50'
        h='405px'
        pt='10px'
        mb="45px">
      
        <Profile
          display_name={shopInfo.display_name}
          handle_name={shopInfo.handle_name}
          icon={shopInfo.icon}
        />

        {/* お気に入りの数 */}
        <HStack
          w='190px'
          borderRadius="15px"
          backgroundColor="rgba(245, 239, 235, 0.8)"
          backdropFilter="blur(4px)"
          webkit-backdropfilter="blur(4px)"
          border="1px solid rgba(255, 255, 255, 0.18)"
          ml="auto"
          mr="auto"
          my="0"
          padding="10px"
        >
          <Box ml='auto' mr='auto' my='0'>
            <Text fontSize="20px" fontWeight="bold" textAlign='center'>
              {shopInfo.follower_handle_name.length}
            </Text>
            <Text textAlign='center'>
              お気に入り
            </Text>
          </Box>
        </HStack>

        {/* お気に入り登録ボタン */}
        <Center>
        <Box mt='14px'>
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
        </Center>
      </Box>

      {/* お店の情報 */}
      <Box
        w={{base: '80%', md: '65%'}} 
        my="0" 
        ml="auto" 
        mr="auto" 
        backgroundColor='orange.50'
        borderRadius="40px"
        p="40px"
      >
        <SimpleGrid columns={{md:2}}>
          <Box mb='26px' mt='6px'>
            <Link href={shopInfo.map_url} isExternal>
              住所：{shopInfo.address}
            </Link>
          </Box>
          <Box mb='26px'>
            <Link href={shopInfo.hp_url} isExternal>
              HP：{shopInfo.hp_url}
            </Link>
          </Box>
          <Box mb='26px'><Text>営業時間：{shopInfo.opening_hours}</Text></Box>
          <Box mb='26px'><Text>定休日：{shopInfo.regular_day_off}</Text></Box>

          {/* インスタアイコン */}
          <Link href={shopInfo.instagram_url} isExternal>
            <Icon
              as={AiOutlineInstagram}
              boxSize={10}
              _hover={{transform: 'translate3d(1px, 2px, 1px)'}}
            />
          </Link>
        </SimpleGrid>
      </Box>
      
      {/* リード */}
      <Box 
        w={{base: '80%', md: '65%'}} 
        ml="auto" 
        mr="auto"
        my='80px'
        mb='30px'
      >
        <Text fontSize='md' fontWeight='bold'>{shopInfo.concept}</Text>
      </Box>
      
      {/* タブ */}
      <Box>
        <Tabs
          isFitted
          w={{base: '80%', md: '65%'}} 
          ml="auto" 
          mr="auto"
          pb='200px'
        >

        <TabList borderBottom='none'>
          <Tab 
            pt='13px' 
            pb='13px'
            fontWeight='bold'
            borderBottom='2px solid'
            borderColor='brand.color3'
            _selected={{
              color: 'white',
              bg: 'brand.color3',
              borderTopRadius: '16px',
              boxShadow: '-1px -1px 6px rgba(0, 0, 0, 0.3)'
            }}>
            お店の紹介
          </Tab>
          <Tab
            pt='13px' 
            pb='13px'
            fontWeight='bold'
            borderBottom='2px solid'
            borderColor='brand.color3'
            _selected={{ 
              color: 'white',
              bg: 'brand.color3',
              borderTopRadius: '16px',
              boxShadow: '-1px -1px 6px rgba(0, 0, 0, 0.3)'
            }}>
            コーヒー豆購入
          </Tab>
        </TabList>

        <TabPanels 
          borderBottomRadius='16px'
          backgroundColor='orange.50'
          boxShadow='0px 2px 6px rgba(0, 0, 0, 0.3)'>

          <TabPanel>
            <Box
              m='20px 20px 50px 20px'
              columns={{md:2}}>
              <Text 
                fontSize='18px' 
                fontWeight='bold'
                mb='14px'>おすすめの一杯</Text>
              <SimpleGrid columns={{md:2}}>
                <Box>
                {shopInfo.recommendation.image &&
                  <PostImage
                    src={shopInfo.recommendation.image}
                    alt="おすすめの一杯の写真"
                  />
                }
                </Box>
                <Box>
                  <Text
                    fontSize='16px'>
                      {shopInfo.recommendation.title}</Text>
                  <Box 
                    h='2.5px'
                    backgroundColor='brand.color3'></Box>
                  <Text 
                    mt="10px"
                    fontSize="14px">{shopInfo.recommendation.description}</Text>
                </Box>
              </SimpleGrid>
            </Box>
            
            <Box
              m='20px 20px 50px 20px'
              columns={{md:2}}>
              <Text 
                fontSize='18px' 
                fontWeight='bold'
                mb='14px'>お店の魅力</Text>
              <SimpleGrid columns={{md:2}}>
                <Box>
                {shopInfo.recommendation.image &&
                  <PostImage
                  src={shopInfo.selling_point.image}
                  alt="お店の魅力を表す写真"
                  />
                }
                </Box>
                <Box>
                  <Text 
                    mt="10px"
                    fontSize="14px">{shopInfo.selling_point.text}</Text>
                </Box>
              </SimpleGrid>
            </Box>
          </TabPanel>

          <TabPanel
          borderBottomRadius='16px'
          backgroundColor='orange.50'
          boxShadow='0px 2px 6px rgba(0, 0, 0, 0.3)'>
            <p>コーヒー豆販売！</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Box>
  )
}

export default ShopTopPage
