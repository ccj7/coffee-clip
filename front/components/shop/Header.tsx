import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
    <div>
      <HStack>
        <Link href="/">
          <Text fontSize="3xl">COFFEE CLIP</Text>
        </Link>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            color="brand.300"
          />
          <MenuList>
            <MenuItem icon={<NotAllowedIcon />} onClick={logout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Link href="/">
        <h1>coffee clip</h1>
      </Link>
      <PrimaryButton text="ログアウト" onclick={logout} />
    </div>
  )
}

export default Header
