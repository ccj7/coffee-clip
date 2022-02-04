import { useState, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { isLoggedIn } from '../../../../util'

import Header from '../../../../components/shop/Header'
import ShopTopPage from '../../../../components/ShopTopPage'
import PrimaryButton from '../../../../components/Button'
import { Box, Center, Heading, Text, SimpleGrid } from '@chakra-ui/react'

const ShopTopPageOfShop: WithGetAccessControl<VFC> = () => {
  const router = useRouter()
  const { handle_name } = router.query

  const [isPublish, setIsPublish] = useState(true)

  return (
    <div>
      <Head>
        <title>店舗向けプレビュー</title>
      </Head>
      <Header />
      <Box backgroundColor="brand.color1">
        <Center
          height={{ base: '100px', md: '70px' }}
          color="white"
          w={{ base: '80%', md: '65%' }}
          ml="auto"
          mr="auto"
        >
          <SimpleGrid columns={{ md: 2 }} spacing={{ md: '50px' }}>
            <Heading size="md" mb="5px" mt="8px">
              店舗向けのプレビューページ
              {isPublish ? ' (公開中)' : ' (非公開)'}
            </Heading>
            <PrimaryButton
              text={'ダッシュボードに戻る'}
              onclick={() => {
                router.push('/shop/dashboard')
              }}
            />
          </SimpleGrid>
          {/* {isPublish ? <Text>公開中</Text> : <Text>非公開</Text>} */}
        </Center>
      </Box>
      <ShopTopPage
        handle_name={handle_name}
        isUser={false}
        setIsPublish={setIsPublish}
      />
    </div>
  )
}

ShopTopPageOfShop.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}

export default ShopTopPageOfShop
