import Link from 'next/link'
import { Box, Heading, Image, Text, Center } from '@chakra-ui/react'

// TODO propsの型を変換する
function ShopCard(props: any) {
  const { display_name, handle_name, icon, concept } = props
  return (
    <Link href={{ pathname: `/user/shop-top-page/${handle_name}` }}>
      <Box 
        w={{ base:'350px', md:'500px' }}
        m={10}
        backgroundColor={"brand.color5"}
        border="0.2px"
        borderRadius='24px'
        borderColor="gray.100"
        textAlign="center"
        padding='24px'
        boxShadow='0px 2px 6px rgba(0, 0, 0, 0.3)'
        transition='0.3s'
        _hover={{transform: 'translate3d(1px, 3px, 1px)', backgroundColor: 'rgba(162, 178, 155, 0.8)'}}
      >
        <Heading size="md" mb='8px' _hover={{textDecoration:'underline'}}>{display_name}</Heading>
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
