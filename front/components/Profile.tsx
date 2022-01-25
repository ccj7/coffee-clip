import Image from './Image'
import { Avatar, Stack, HStack, Heading, Box } from '@chakra-ui/react'

// TODO propsの型を変換する
function PhotoImage(props: any) {
  const { display_name, handle_name, icon } = props
  return (
    <>
      <HStack>
        <Avatar size="lg" src={icon} alt="icon" />{' '}
        <Stack>
          <Heading size="lg">{display_name}</Heading>
          <Box>@{handle_name}</Box>
        </Stack>
      </HStack>
    </>
  )
}

export default PhotoImage
