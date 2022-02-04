import { Center, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { VFC } from 'react'
import PrimaryButton from '../components/Button'

const Custom404: WithGetAccessControl<VFC> = () => {
  const router = useRouter()

  return (
    <>
      <Center mb="50px">
        <Heading size="md" mt="50px">
          404 - Page Not Found
        </Heading>
      </Center>
      <Center>
        <PrimaryButton
          text="topページに戻る"
          onclick={() => {
            router.push('/index')
          }}
        />
      </Center>
    </>
  )
}

Custom404.getAccessControl = async () => {
  return null
}

export default Custom404
