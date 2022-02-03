import React from 'react'
import Image from 'next/image'
import { Box, Center, VStack, Heading, Text, Stack } from '@chakra-ui/react'
import coffeeImg from '../img/coffee.png'
import PrimaryButton from './Button'
import { useRouter } from 'next/router'

// TODO propsの型を変換する

const BoxMessage = (props: any) => {
  const { heading, text, buttonLabel, path } = props
  const router = useRouter()
  return (
    <Box w={{ base: '80%', md: '65%' }} ml="auto" mr="auto">
      <Box
        my={12}
        p={8}
        mt="70px"
        borderRadius="16px"
        backgroundColor="orange.50"
        boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
      >
        <Center>
          <VStack>
            { heading &&
              <Heading size="md">
                {heading}
              </Heading>
            }
            { text && 
              <Text>
                {text}
              </Text>
            }
          </VStack>
        </Center>
        <Center mt="15px">
            <Box w="50%">
              <Image src={coffeeImg} alt="Coffee" />
            </Box>
        </Center>
        <Center mt="-40px">
          { buttonLabel &&
            <PrimaryButton
            text={buttonLabel}
            onclick={() => {
              router.push(path)
            }} />
          }
        </Center>
      </Box>
    </Box>
  )
}

export default BoxMessage
