import Link from 'next/link'

import { loadStripe } from '@stripe/stripe-js'

import { Box, Heading, Text, Center, Button } from '@chakra-ui/react'
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
      borderRadius="24px"
      borderColor="gray.100"
      textAlign="center"
      padding="24px"
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
      transition="0.3s"
      _hover={{
        transform: 'translate3d(1px, 3px, 1px)',
        backgroundColor: 'rgba(252, 247, 240, 0.5)',
      }}
    >
      <Box
        borderRadius="10px"
        backgroundColor="brand.color2"
        mb="20px"
        color="brand.color6"
      >
        <Heading
          size="md"
          pt="16px"
          mb="2px"
          mx="2px"
          _hover={{ textDecoration: 'underline' }}
        >
          {name}
        </Heading>
      </Box>
      <Center>
        <Box mb="20px" borderRadius="5px">
          <Image src={image} />
        </Box>
      </Center>
      <Box mx="auto" borderRadius="5px" py="8px">
        <Text fontSize="13px" fontWeight="bold">
          ¥ {price}
        </Text>
        <Text fontSize="13px" fontWeight="bold">
          {concept}
        </Text>

        <form action="/api/stripe/checkout_sessions" method="POST">
          <input
            id="price_ID"
            name="price_ID"
            type="hidden"
            value={price_ID}
          ></input>
          <section>
            <Button type="submit">Checkout</Button>
          </section>
        </form>
        <PrimaryButton text="販売店" onclick={goToShopTopPage} />
      </Box>
    </Box>
  )
}

export default OnlineShopCard
