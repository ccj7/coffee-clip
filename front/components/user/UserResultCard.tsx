import { Avatar, Stack, HStack, Heading, Box } from '@chakra-ui/react'
import Link from 'next/link'

// TODO propsの型を変換する
function UserResultCard(props: any) {
  const { display_name, handle_name, icon } = props
  return (
    <>
      <Link href={{ pathname: `/user/topPage/${handle_name}` }}>
        <HStack>
          <Avatar size="lg" src={icon} alt="icon" />{' '}
          <Stack>
            <Heading size="lg">{display_name}</Heading>
            <Box>@{handle_name}</Box>
          </Stack>
        </HStack>
      </Link>
    </>
  )
}

export default UserResultCard
