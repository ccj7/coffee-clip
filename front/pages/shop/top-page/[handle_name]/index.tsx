import {
  Box,
  Center,
  HStack,
  Icon,
  Spacer,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { AiOutlineInstagram } from 'react-icons/ai'
import Head from 'next/head'
import { useContext, useEffect, useState, VFC } from 'react'
import PrimaryButton from '../../../../components/Button'
import Profile from '../../../../components/Profile'

import Header from '../../../../components/shop/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import PostImage from '../../../../components/Image'
import { AuthContext, useAuthContext } from '../../../../auth/AuthContext'
import { isLoggedIn } from '../../../../util'
import ShopTopPage from '../../../../components/ShopTopPage'

const ShopTopPageOfShop: WithGetAccessControl<VFC> = () => {
  const { currentUser } = useContext(AuthContext)

  const router = useRouter()
  const { handle_name } = router.query

  return (
    <div>
      <Head>
        <title>shop Top Page</title>
        <meta name="shopTopPage" content="shop Top Page" />
      </Head>
      <Header />

      <ShopTopPage handle_name={handle_name} isUser={false} />
    </div>
  )
}

ShopTopPageOfShop.getAccessControl = async () => {
  return !(await isLoggedIn())
    ? { type: 'replace', destination: '/shop/signin' }
    : null
}

export default ShopTopPageOfShop
