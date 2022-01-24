import Link from 'next/link'
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
import { HamburgerIcon, NotAllowedIcon, SettingsIcon } from '@chakra-ui/icons'
import { getAuth, signOut } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'

import React from 'react'

function UserHeader() {
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
    <>
      <div>
        <HStack p="2" bg="gray.800" color="white">
          <Link href="/">
            <Text fontSize="3xl">COFFEE CLIP</Text>
          </Link>
          <Spacer></Spacer>

          <Breadcrumb separator="|">
            <BreadcrumbItem>
              <BreadcrumbLink href="/user/timeline">TimeLiine</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/user/shoplist">ShopList</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/user/mypage">MyPage</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList color="black">
              <Link href="/user/setting">
                <MenuItem icon={<SettingsIcon />}>Setting</MenuItem>
              </Link>
              <MenuItem icon={<NotAllowedIcon />} onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </div>
      {/* // TODO  検索ボタンと関数を作成*/}
    </>
  )
}
export default UserHeader
