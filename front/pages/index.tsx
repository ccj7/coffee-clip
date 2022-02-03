import Head from 'next/head'
import { VFC } from 'react'
import { Stack, Text, HStack, Box, Heading, VStack, Center, SimpleGrid } from '@chakra-ui/react'
import PrimaryButton from '../components/Button'
import Header from '../components/Header'
import { IconContext } from 'react-icons'
import { BsShop, BsPeople } from 'react-icons/bs'
import { useRouter } from 'next/router'

const Home: WithGetAccessControl<VFC> = () => {
  const router = useRouter()
  return (
    <Box
      background="#988d83"
      backgroundImage="linear-gradient(62deg, #988d83 0%, #f7dcae 100%)"
      pb="400px"
    >
      <Head>
        <title>COFFEE CLIP</title>
        <meta name="COFFEE CLIP" content="COFFEE CLIPのトップページです" />
      </Head>
      <Header />

      <Box w={{ base: '80%', md: '65%' }} ml="auto" mr="auto" mt={{base:"35px", md:"70px"}}>
        <Center m="25px">
          <HStack color="brand.color1">
            <Heading size="sm">
              COFFEE CLIPは、コーヒーを身近に感じてコーヒーで暮らしをもっと豊かにするための、コーヒー専門SNSです。
            </Heading>
          </HStack>
        </Center>
      </Box>

      <Box w={{ base: '80%', md: '65%' }} my="0" mx="auto">
        <SimpleGrid columns={{md:2}}>
          <Center>
          <Box
            w="90%"
            p="10px"
            mt={{base:"22px", md:"60px"}}
            borderRadius="10px"
            backgroundColor="orange.50"
            boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
          >
            <VStack my="25px" color="brand.color1">
             <Stack mb="10px">
                <IconContext.Provider value={{ size: '50px' }}>
                  <BsPeople />
                </IconContext.Provider>
              </Stack>

              <Stack>
                <Text fontSize="2xl">ユーザー</Text>
              </Stack>

              <Stack>
                <Text 
                  fontSize="sm"
                  m="0 4px 10px 4px">
                  コーヒーやお店をクリップしよう
                </Text>
              </Stack>

              <Stack>
                <Box my="16px">
                <PrimaryButton
                  text="アカウントを作成"
                  onclick={() => router.push('/user/signup')}
                />
                </Box>
              </Stack>

              <Stack>
                <Box my="10px">
                  <Text fontSize="11px">アカウントをお持ちの方はこちら</Text>
                <Center>
                  <PrimaryButton
                    text="ユーザーログイン"
                    onclick={() => router.push('/user/signin')}
                  />
                </Center>
                </Box>
              </Stack>
            </VStack>
          </Box>
          </Center>

          <Center>
          <Box
            w="90%"
            p="10px"
            mt="60px"
            borderRadius="10px"
            backgroundColor="orange.50"
            boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
          >
            <VStack my="25px" color="brand.color1">
              <Stack mb="10px">
                <IconContext.Provider value={{ size: '50px' }}>
                  <BsShop />
                </IconContext.Provider>
              </Stack>

              <Stack>
                <Text fontSize="2xl">ショップ</Text>
              </Stack>

              <Stack>
                <Text 
                  fontSize="sm"
                  m="6px 4px 10px 4px">
                  自分のお店の情報を掲載しよう
                </Text>
              </Stack>

              <Stack>
                <Box my="16px">
                <PrimaryButton
                  text="アカウントを作成"
                  onclick={() => router.push('/shop/signup')}
                />
                </Box>
              </Stack>

              <Stack>
                <Box my="10px">
                  <Text fontSize="11px">アカウントをお持ちの方はこちら</Text>
                  <Center>
                    <PrimaryButton
                      text="ショップログイン"
                      onclick={() => router.push('/shop/signin')}
                    />
                  </Center>
                </Box>
              </Stack>
            </VStack>
          </Box>
          </Center>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

Home.getAccessControl = async () => {
  return null
}
export default Home
