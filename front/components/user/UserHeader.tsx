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
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Input,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  HamburgerIcon,
  NotAllowedIcon,
  SearchIcon,
  SettingsIcon,
} from '@chakra-ui/icons'
import { getAuth, signOut } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'

import React from 'react'
import { ssrEntries } from 'next/dist/build/webpack/plugins/middleware-plugin'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function UserHeader() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const logout = async () => {
    const auth = getAuth(firebase)
    signOut(auth)
      .then(() => {
        router.push('/user/signin')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
    console.log('ログアウト')
  }

  const onSubmit = async (data: any) => {
    console.log(data.keyword)
    router.push(`/user/search?about=${data.keyword}`)
  }

  return (
    <>
      <div>
        <HStack p="2" bg="gray.800" color="white">
          <Link href="/user/timeline">
            <Text fontSize="3xl">COFFEE CLIP</Text>
          </Link>
          <Spacer></Spacer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                placeholder="Search"
                {...register('keyword')}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  type="submit"
                  aria-label="Search database"
                  icon={<SearchIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </form>
          <Breadcrumb separator="|">
            <BreadcrumbItem>
              <BreadcrumbLink href="/user/timeline">TimeLiine</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/user/shoplist">ShopList</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
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
