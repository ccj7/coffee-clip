import { Box, Heading, Image, Text, Center, Link } from '@chakra-ui/react'

// TODO propsの型を変換する
function ShopCard(props: any) {
  const { display_name, handle_name, icon, concept } = props
  return (
    <Link
      href={`/user/shop-top-page/${handle_name}`}
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        w="80%"
        h="auto"
        m="40px"
        backgroundColor="#fcf7f0"
        border="0.2px"
        borderRadius="24px"
        borderColor="gray.100"
        textAlign="center"
        padding="24px"
        boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
        transition="0.3s"
        _hover={{
          transform: 'translate3d(1px, 3px, 1px)',
          backgroundColor: 'rgba(252, 247, 240, 0.5)',
        }}
      >
        <Box
          borderRadius="10px"
          backgroundColor="brand.color2"
          mb="20px"
          color="brand.color6"
        >
          <Heading
            size="md"
            pt="16px"
            mb="2px"
            mx="2px"
            _hover={{ textDecoration: 'underline' }}
          >
            {display_name}
          </Heading>
          <Text fontSize="14px" pb="16px">
            @{handle_name}
          </Text>
        </Box>
        <Center>
          <Image
            mb="20px"
            boxSize="250px"
            objectFit="cover"
            borderRadius="5px"
            src={icon}
          />
        </Center>
        <Box mx="auto" borderRadius="5px" py="8px">
          <Text fontSize="13px" fontWeight="bold">
            {concept}
          </Text>
        </Box>
      </Box>
    </Link>
  )
}

export default ShopCard
