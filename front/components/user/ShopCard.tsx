import Link from 'next/link'
import { Box, Heading, Image, Text, Center } from '@chakra-ui/react'

// TODO propsの型を変換する
function ShopCard(props: any) {
  const { display_name, handle_name, icon, concept } = props
  return (
    // TODO: 本番はhandle_nameを使ったLink先
    <Link href={{ pathname: `/user/shop-top-page/${handle_name}` }}>
      <Box 
        w={{ base:'350px', md:'500px' }}
        m={10}
        backgroundColor={"brand.sub1"}
        border="0.2px"
        color='gray.100'
        borderRadius='24px'
        borderColor="gray.100"
        textAlign="center"
        padding='20px'
        boxShadow='0px 2px 6px rgba(0, 0, 0, 0.3)'
        transition='0.3s'
        _hover={{transform: 'translate3d(1px, 3px, 1px)'}}
      >
        <Heading size="md" mb='8px'>{display_name}</Heading>
        <Text fontSize='16px' mb='20px'>@{handle_name}</Text>
        <Center>
          <Image w={{ base:'200px', md:'300px'}} mb='20px' src={icon} />
        </Center>
        <Text>{concept}</Text>
      </Box>
    </Link>
  )
}

export default ShopCard
