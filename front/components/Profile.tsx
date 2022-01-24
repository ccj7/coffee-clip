import Image from './Image'
import { Stack, HStack, Heading, Box } from '@chakra-ui/react'

// TODO propsの型を変換する
function PhotoImage(props: any) {
  const { display_name, handle_name } = props
  return (
    <>
      <HStack>
        <Image />
        <Stack>
          <Heading size="lg">{display_name}</Heading>
          <Box>{handle_name}</Box>
        </Stack>
      </HStack>
    </>
  )
}

export default PhotoImage
