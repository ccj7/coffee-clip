import Link from 'next/link'
import { Box, Heading, Image, Text } from '@chakra-ui/react'

// TODO propsの型を変換する
function ShopCard(props: any) {
  const { auth_id, display_name, handle_name, icon, concept } = props;
  return (
    // TODO: auth_idを使ったLink先
    <Link href="/">
      <Box w={600} m={10}>
        <Heading size="lg">{display_name}</Heading>
        <Text>{handle_name}</Text>
        <Image src={icon} />
        <Text>{concept}</Text>
      </Box>
    </Link>
  )
}

export default ShopCard;