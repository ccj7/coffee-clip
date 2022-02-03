import Link from 'next/link'

import { loadStripe } from '@stripe/stripe-js'

import { Box, Heading, Text, Center, Button } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import PrimaryButton from '../Button'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from 'next/image'

import axios from 'axios'

// TODO propsの型を変換する
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
)

function OnlineShopCard(props: any) {
  const { name, handle_name, image, concept, price_ID, price } = props

  const router = useRouter()
  const goToStripe = async () => {
    await axios.post('/api/stripe/checkout_sessions')
  }
  const goToShopTopPage = () => {
    router.push(`/user/shop-top-page/${handle_name}`)
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
  }, [])

  return (
    <Box
      w="80%"
      h="auto"
      m="40px"
      backgroundColor="#fcf7f0"
      border="0.2px"
      borderColor="gray.100"
      padding="24px"
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
      transition="0.3s"
    >
      <Box
        borderBottom='3px solid'
        borderColor='brand.color1'
        mb="20px"
      >
        <Heading
          size="sm"
          p="10px 10px 4px 0px"
          mb="2px"
        >
          {name}
        </Heading>
      </Box>
      <Center>
        <Box borderRadius="5px">
          <Image src={image} />
        </Box>
      </Center>

      <Box py="8px">
        <Text fontSize="15px" mb='10px' fontWeight="bold">
          ¥ {price}
        </Text>
        <Text fontSize="13px">
          {concept}
        </Text>
      </Box>

      <Box>
        <Box>
          <form action="/api/stripe/checkout_sessions" method="POST">
            <input
              id="price_ID"
              name="price_ID"
              type="hidden"
              value={price_ID}
            ></input>
            <section>
              <Button
                boxSize='40%'
                py='6px'
                backgroundColor="brand.color3"
                color="brand.color6"
                _hover={{ background: '#c58573' }}
                mt={2}
                type="submit">購入する</Button>
            </section>
          </form>
        </Box>

        <Box ml={{base:'75%', md:'70%'}}>
          <Button 
            onClick={goToShopTopPage}
            fontSize='xs'
            color="brand.color1"
            boxSize='40%'
            backgroundColor="#fcf7f0"
            _hover={{backgroundColor: '#fcf7f0'}}
          >
            <Text
              // ml='120px'
              mr="5px"
              _hover={{ borderBottom: "1px solid", borderColor: "brand.color2" }}
            >
                販売店を見る</Text> <ArrowRightIcon/>
          </Button>
        </Box>

      </Box>
    </Box>
  )
}

export default OnlineShopCard
