import { Box, Text } from '@chakra-ui/react'

interface Message {
  message: String
}

function Message(props: Message) {
  const { message } = props
  return (
    <Box borderRadius="sm" background="#423b36" boxShadow="md">
      <Text fontSize='2xl' color='#fff'>{message}</Text>
    </Box>
  )
}

export default Message
