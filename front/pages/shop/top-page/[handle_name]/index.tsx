import { VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { isLoggedIn } from '../../../../util'

import Header from '../../../../components/shop/Header'
import ShopTopPage from '../../../../components/ShopTopPage'
import PrimaryButton from '../../../../components/Button'
import { Box, Center, Heading, Spacer } from '@chakra-ui/react'

const ShopTopPageOfShop: WithGetAccessControl<VFC> = () => {
  const router = useRouter()
  const { handle_name } = router.query

  return (
    <div>
      <Head>
        <title>shop Top Page</title>
        <meta name="shopTopPage" content="shop Top Page" />
      </Head>
      <Header />
      <Box backgroundColor="brand.color1" >
        <Center
          height="70px"
          color="white"
          w={{ base: '80%', md: '65%' }}
          ml="auto"
          mr="auto">
          <Heading size="md">店舗向けのプレビューページです</Heading>
          <Spacer></Spacer>
          <PrimaryButton
            text={'ダッシュボードに戻る'}
            onclick={() => {
              router.push('/shop/dashboard')
            }}
          />
        </Center>
      </Box>
      <ShopTopPage handle_name={handle_name} isUser={false} />
    </div>
  )
}

ShopTopPageOfShop.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}

export default ShopTopPageOfShop
