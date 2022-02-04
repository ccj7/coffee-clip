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
  Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  HamburgerIcon,
  NotAllowedIcon,
  SearchIcon,
  SettingsIcon,
} from '@chakra-ui/icons'
import { getAuth, signOut } from 'firebase/auth'
import firebase from '../../auth/firebaseConfig'
import logo from '../../img/logo.jpg'

import React from 'react'
import { useForm } from 'react-hook-form'

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
          <Box w={{base:'54px', md:'38px'}} ml='4px'>
            <Image src={logo} alt='COFFEE CLIP' />
          </Box>
          <Link href="/user/timeline" _hover={{textDecoration: "none"}}>
            <Text ml='4px' fontSize={{base:"lg", md:"3xl"}}>COFFEE CLIP</Text>
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
                  mr='22px'
                  icon={<SearchIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </form>

          <Breadcrumb separator="|" display={{base: "none", md: "block"}}>
            <BreadcrumbItem fontSize={{base:'12px', md:'16px'}}>
              <BreadcrumbLink href="/user/timeline">TimeLine</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem fontSize={{base:'12px', md:'16px'}}>
              <BreadcrumbLink href="/user/shoplist">ShopList</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem fontSize={{base:'12px', md:'16px'}}>
              <BreadcrumbLink href="/user/mypage">MyPage</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem fontSize={{base:'12px', md:'16px'}}>
              <BreadcrumbLink href="/user/onlineShop">OnlineShop</BreadcrumbLink>
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
              <Box display={{base: "block", md: "none"}}>
                <Link href="/user/timeline">
                  <MenuItem>TimeLine</MenuItem>
                </Link>
                <Link href="/user/shoplist">
                  <MenuItem>ShopList</MenuItem>
                </Link>
                <Link href="/user/mypage">
                  <MenuItem>MyPage</MenuItem>
                </Link>
                <Link href="/user/onlineShop">
                <MenuItem>OnlineShop</MenuItem>
              </Link>
              </Box>
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
