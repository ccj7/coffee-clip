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
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
      <Box top={0} position="sticky" zIndex={"sticky"}>
        <HStack p="2" bg="brand.color1" color="brand.color6">
          <Link href="/user/timeline">
            <Text ml='10px' fontSize={{base:"lg", md:"3xl"}}>COFFEE CLIP</Text>
          </Link>
          <Spacer/>

          <form onSubmit={handleSubmit(onSubmit)} >
            <InputGroup w={{main:"100px", md:"300px"}} pr="10px">
              <Input
                pr="4.5rem"
                placeholder="Search"
                {...register('keyword')}
              />
              <InputRightElement>
                <IconButton
                  type="submit"
                  aria-label="Search database"
                  backgroundColor={'brand.color3'}
                  _hover={{backgroundColor: '#cc8756'}}
                  boxSize='93%'
                  mr='21px'
                  icon={<SearchIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </form>

          <Breadcrumb separator="|">
            <BreadcrumbItem fontSize={{base:'12px', md:'16px'}}>
              <BreadcrumbLink href="/user/timeline">TimeLine</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem fontSize={{base:'12px', md:'16px'}}>
              <BreadcrumbLink href="/user/shoplist">ShopList</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem fontSize={{base:'12px', md:'16px'}}>
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
      </Box>
      {/* // TODO  検索ボタンと関数を作成*/}
    </>
  )
}
export default UserHeader
