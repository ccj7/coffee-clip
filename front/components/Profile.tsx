import { Avatar, Text, Heading, Box, VStack } from '@chakra-ui/react'

// TODO propsの型を変換する
function PhotoImage(props: any) {
  const { display_name, handle_name, icon } = props
  return (
    <Box w='65%' my='0' ml='auto' mr='auto'>
      <VStack>
        <Avatar size="2xl" mt='8' mb='2' src={icon} alt="icon" />{' '}
        <Heading size="lg">{display_name}</Heading>
        <Text fontSize='20px' letterSpacing='1px' pb='8'>@{handle_name}</Text>
      </VStack>
    </Box>
  )
}

export default PhotoImage
