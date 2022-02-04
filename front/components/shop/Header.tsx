import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Box,
  Link
} from '@chakra-ui/react'
import { HamburgerIcon, NotAllowedIcon } from '@chakra-ui/icons'

import { getAuth, signOut } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '../../img/logo.jpg'

function Header() {
  const router = useRouter()
  const logout = async () => {
    const auth = getAuth(firebase)
    signOut(auth)
      .then(() => {
        router.push('/shop/signin')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
    console.log('ログアウト')
  }
  return (
    <>
      <Box top={0} position="sticky" zIndex={'sticky'}>
        <HStack p="2" bg="brand.color1" color="brand.color6">
          <Box w={{base:'54px', md:'38px'}} ml='4px'>
            <Image src={logo} alt='COFFEE CLIP' />
          </Box>
          <Link href="/shop/dashboard" _hover={{textDecoration: "none"}}>
            <Text ml="10px" fontSize={{ base: 'lg', md: '3xl' }}>
              COFFEE CLIP
            </Text>
          </Link>
          <Spacer></Spacer>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList color="black">
              <MenuItem icon={<NotAllowedIcon />} onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </>
  )
}

export default Header
