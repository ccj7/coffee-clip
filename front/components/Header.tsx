import {
  Box,
  HStack,
  Text,
  Center,
  Link
} from '@chakra-ui/react'

function Header() {
  return (
    <Box>
        <HStack p="2" bg="gray.800" color="white">
          <Center w='100%'>
            <Link
              href="/" 
              _hover={{ borderBottom: 'none' }}>
              <Text fontSize="3xl">COFFEE CLIP</Text>
            </Link>
          </Center>
        </HStack>
    </Box>
  )
}

export default Header
