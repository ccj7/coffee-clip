import { Center, Heading } from '@chakra-ui/react'
import { VFC } from 'react'

const Custom404: WithGetAccessControl<VFC> = () => {
  return (
    <>
      <Center mb="50px">
        <Heading size="md" mt="50px">
          404 - Page Not Found
        </Heading>
      </Center>
    </>
  )
}

Custom404.getAccessControl = async () => {
  return null
}

export default Custom404
