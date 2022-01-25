import Link from 'next/link'
import { Box, Heading, Image, Text, Center } from '@chakra-ui/react'

// TODO propsの型を変換する
function ShopCard(props: any) {
  const { display_name, handle_name, icon, concept } = props;
  return (
    // TODO: 本番はhandle_nameを使ったLink先
    <Link href={{ pathname: `/shop/top-page/${handle_name}` }}>
      <Box w={600} m={10} border='2px' borderColor='gray.200' textAlign='center'>
        <Heading size="lg">{display_name}</Heading>
        <Text>{handle_name}</Text>
        <Center><Image w={300} src={icon} /></Center>
        <Text>{concept}</Text>
      </Box>
    </Link>
  )
}

export default ShopCard;