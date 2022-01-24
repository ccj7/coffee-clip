import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react'
import { HamburgerIcon, NotAllowedIcon } from '@chakra-ui/icons'

import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'
import firebase from '../../auth/firebaseConfig'
import PrimaryButton from '../Button'
import { Text } from '@chakra-ui/react'

function Header() {
  const logout = async () => {
    const auth = getAuth(firebase)
    try {
      signOut(auth)
      // history.push('/login')
    } catch (error) {
      alert(error)
    }
    console.log('ログアウト')
  }
  return (
    // TODO　色変更
    <div>
      <HStack p="2" bg="gray.800" color="white">
        <Link href="/">
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
          <MenuList>
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
