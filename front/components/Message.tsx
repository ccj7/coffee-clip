import { Center, Text } from '@chakra-ui/react'

interface Message {
  message: String
}

function Message(props: Message) {
  const { message } = props
  return (
    <Center mt="20px" mb="15px">
      <Text fontSize='2xl'>{message}</Text>
    </Center>
  )
}

export default Message
