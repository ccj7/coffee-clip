import {
  Box,
  Center,
  HStack,
  Icon,
  Text,
  Link,
  SimpleGrid,
} from '@chakra-ui/react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { useContext, useEffect, useState } from 'react'
import PrimaryButton from './Button'
import Profile from './Profile'

import axios from 'axios'
import PostImage from './Image'
import { AuthContext } from '../auth/AuthContext'
import { shopInitialData } from '../initial_data/shopInitialDdata'
import { BiHome } from 'react-icons/bi'

const ShopTopPage = (props: any) => {
  const { handle_name, isUser } = props
  const { currentUser } = useContext(AuthContext)
  const [shopInfo, setShopInfo] = useState<ShopData>(shopInitialData)

  const getShop = async (handle: string | string[]) => {
    if (currentUser && isUser) {
      const res: any = await axios.get(`/api/shops/${currentUser}/${handle}`)
      setShopInfo(res.data)
    } else if (currentUser && !isUser) {
      const res: any = await axios.get(`/api/shops/${currentUser}`)
      if (res.data) {
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
      h="300px"
      pt="50px"
      background="#988d83"
      backgroundImage="linear-gradient(62deg, #988d83  0%, #af6938 100%)"
    >
      <Box
        w={{ base: '80%', md: '65%' }}
        ml="auto"
        mr="auto"
        my="0"
        borderRadius="46px"
        backgroundColor="orange.50"
        pt="10px"
        pb="40px"
        mb="45px"
      >
        <Profile
          display_name={shopInfo.display_name}
          handle_name={shopInfo.handle_name}
          icon={shopInfo.icon}
        />

        <Center
          mb={{ base: '30px', md: '40px' }}
          w={{ base: '60%' }}
          ml="auto"
          mr="auto"
        >
          <Text fontSize="sm" fontWeight="bold">
            {shopInfo.concept}
          </Text>
        </Center>

        {/* ????????????????????? */}
        <HStack
          w="190px"
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
          <Box ml="auto" mr="auto" my="0">
            <Text fontSize="20px" fontWeight="bold" textAlign="center">
              {shopInfo.follower_handle_name.length}
            </Text>
            <Text textAlign="center">???????????????</Text>
          </Box>
        </HStack>

        {/* ?????????????????????????????? */}
      </Box>
      <Center>
        <Box mt={{ base: '-90px' }}>
          {isUser && (
            <PrimaryButton
              text={
                shopInfo.is_following
                  ? '??????????????????????????????'
                  : '??????????????????????????????'
              }
              onclick={registerFavarite}
            />
          )}
          {!isUser && (
            <PrimaryButton
              text={
                shopInfo.is_following
                  ? '??????????????????????????????'
                  : '??????????????????????????????'
              }
            />
          )}
        </Box>
      </Center>

      {/* ??????????????? */}
      <Box
        w={{ base: '80%', md: '65%' }}
        my="0"
        ml="auto"
        mr="auto"
        backgroundColor="orange.50"
        borderRadius="40px"
        p="40px"
        mb="30px"
      >
        <SimpleGrid columns={{ md: 2 }} spacingX="40px">
          <Box mb="26px">
            <Link href={shopInfo.map_url} isExternal>
              {shopInfo.address}
            </Link>
          </Box>
          <Box mb="26px">
            <HStack color="brand.color1">
              <BiHome />
              <Link href={shopInfo.hp_url} isExternal>
                {shopInfo.hp_url}
              </Link>
            </HStack>
          </Box>
          <Box mb="26px">
            <Text>???????????????{shopInfo.opening_hours}</Text>
          </Box>
          <Box mb="26px">
            <Text>????????????{shopInfo.regular_day_off}</Text>
          </Box>

          {/* ???????????????????????? */}
          <Link href={shopInfo.instagram_url} isExternal w={'10'}>
            <Icon
              as={AiOutlineInstagram}
              boxSize={10}
              _hover={{ transform: 'translate3d(1px, 2px, 1px)' }}
            />
          </Link>
        </SimpleGrid>
      </Box>

      {/* ??????????????? */}

      <Box pb="100px">
        <Box
          w={{ base: '80%', md: '65%' }}
          ml="auto"
          mr="auto"
          backgroundColor="orange.50"
          borderRadius="40px"
          p="30px"
        >
          <Box>
            <Box m="20px 20px 50px 20px" columns={{ md: 2 }}>
              <Text fontSize="18px" fontWeight="bold" mb="14px">
                ?????????????????????
              </Text>
              <SimpleGrid columns={{ md: 2 }}>
                <Box>
                  {shopInfo.recommendation.image && (
                    <PostImage
                      src={shopInfo.recommendation.image}
                      alt="??????????????????????????????"
                    />
                  )}
                </Box>
                <Box>
                  <Text fontSize="16px">{shopInfo.recommendation.title}</Text>
                  <Box h="2.5px" backgroundColor="brand.color3"></Box>
                  <Text mt="10px" fontSize="14px">
                    {shopInfo.recommendation.description}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>

            <Box m="20px 20px 50px 20px" columns={{ md: 2 }}>
              <Text fontSize="18px" fontWeight="bold" mb="14px">
                ???????????????
              </Text>
              <SimpleGrid columns={{ md: 2 }}>
                <Box>
                  {shopInfo.recommendation.image && (
                    <PostImage
                      src={shopInfo.selling_point.image}
                      alt="??????????????????????????????"
                    />
                  )}
                </Box>
                <Box>
                  <Text mt="10px" fontSize="14px">
                    {shopInfo.selling_point.text}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ShopTopPage
