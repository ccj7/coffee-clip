import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { HamburgerIcon, NotAllowedIcon } from '@chakra-ui/icons'

import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'
import firebase from '../../auth/firebaseConfig'
import { useRouter } from 'next/router'

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
    // TODO　色変更
    <div>
      <HStack p="2" bg="gray.800" color="white">
        <Link href="/shop/dashboard">
          <Text fontSize="3xl">COFFEE CLIP</Text>
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
    </div>
  )
}

export default Header
