import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthProvider } from '../auth/AuthContext'

const useAccessControll = (getAccessControll: GetAccessControl) => {
  const router = useRouter()
  useEffect(() => {
    const controll = async () => {
      const accessControl = await getAccessControll()
      if (!accessControl) return
      router[accessControl.type](accessControl.destination)
    }
    controll()
  }, [router])
}

const accessControl = () => {
  throw new Error('getAccessControl が定義されていません。')
}

type Props = AppProps & {
  Component: {
    getAccessControl?: GetAccessControl
  }
}

function MyApp({ Component, pageProps }: Props) {
  const { getAccessControl = accessControl } = Component
  useAccessControll(getAccessControl)
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
