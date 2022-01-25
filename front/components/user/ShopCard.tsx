import Link from 'next/link'
import { Box, Heading, Image, Text } from '@chakra-ui/react'

// TODO propsの型を変換する
function ShopCard(props: any) {
  const { auth_id, display_name, handle_name, icon, concept } = props;
  return (
    // TODO: 本番はdisplay_nameを使ったLink先
    <Link href="/shop/shop-top-page">
      <Box w={600} m={10}>
        <Heading size="lg">{display_name}</Heading>
        <Text>{handle_name}</Text>
        <Image w={300} src="https://unsplash.it/630/400" />
        <Text>{concept}</Text>
      </Box>
    </Link>
  )
}

export default ShopCard;