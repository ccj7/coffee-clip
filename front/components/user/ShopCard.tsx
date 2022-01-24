import Link from 'next/link'
import { Box, Heading, Image, Text } from '@chakra-ui/react'

// TODO propsの型を変換する
function ShopCard(props: any) {
  const { display_name, handle_name, image, description, url } = props;
  return (
    <Link href={url}>
      <Box w={600} >
        <Heading size="lg">{display_name}</Heading>
        <Text>{handle_name}</Text>
        <Image src={image} />
        <Text>{description}</Text>
      </Box>
    </Link>
  )
}

export default ShopCard;