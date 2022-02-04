import {
  Box,
  HStack,
  Text,
  Center,
  Link
} from '@chakra-ui/react'
import Image from 'next/image'
import logo from '../img/logo.jpg'

function Header() {
  return (
    <Box>
        <HStack p="2" bg="brand.color1" color="white">
          <Center w='100%'>
          <Box w={{base:'54px', md:'38px'}} mr='4px'>
            <Image src={logo} alt='COFFEE CLIP' />
          </Box>
            <Link
              href="/" 
              _hover={{ borderBottom: 'none' }}>
              <Text fontSize="3xl" ml='10px' >COFFEE CLIP</Text>
            </Link>
          </Center>
        </HStack>
    </Box>
  )
}

export default Header
