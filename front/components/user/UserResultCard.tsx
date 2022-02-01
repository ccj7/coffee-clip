import { Avatar, Stack, HStack, Heading, Box, Text } from '@chakra-ui/react'
import Link from 'next/link'

// TODO propsの型を変換する
function UserResultCard(props: any) {
  const { display_name, handle_name, icon } = props
  return (
    <Box p='15px' mb='5px'>
      <Link href={{ pathname: `/user/topPage/${handle_name}` }}>
        <HStack style={{cursor: 'pointer'}}>
          <Avatar size="lg" src={icon} alt="icon" mr='8px'/>
          <Heading size="lg">{display_name}</Heading>
          <Text fontSize='sm'>@{handle_name}</Text>
        </HStack>
      </Link>
    </Box>
  )
}

export default UserResultCard
