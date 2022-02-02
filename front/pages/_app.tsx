import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
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


const theme = extendTheme({
  styles: {
    global: {
      "body": {
        background: '#f2eadf',
        letterSpacing: "1px",
        color: "#414042"
      }
    }
  },
  colors: {
    brand: {
      color1: '#414042',
      color2: '#ad5138',
      color3: '#af6938',
      color4: '#988d83',
      color5: '#a2b29b',
      color6: '#f2eadf',
    }
  }
})

function MyApp({ Component, pageProps }: Props) {
  const { getAccessControl = accessControl } = Component
  useAccessControll(getAccessControl)
  return (
    <AuthProvider>

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>

    </AuthProvider>
  )
}

export default MyApp
