import Link from 'next/link'
import { Box, Heading, Image, Text, HStack, Avatar } from '@chakra-ui/react'

function MyLogCard(props: any) {
  const { display_name, handle_name, icon, review } = props
  return (
    <Box
      my={12}
      p={8}
      borderRadius="16px"
      backgroundColor="orange.50"
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
    >
      <HStack mb={2}>
        <Avatar
          borderRadius="full"
          boxSize="70px"
          objectFit="cover"
          src={icon}
          alt={display_name}
        />
        <Box>
          <Heading size="lg">{display_name}</Heading>
          <Text>@{handle_name}</Text>
        </Box>
      </HStack>
      <HStack>
        {review && (
          <Box>
            <Text
              fontWeight="bold"
              pt={4}
              letterSpacing="0.8px"
              fontSize="16px"
            >
              {review.coffee_name}
            </Text>
            {review.image && (
              <Image
                mt="10px"
                boxSize="250px"
                objectFit="cover"
                src={review.image}
                alt={review.description}
              />
            )}
            <Text pt={4} letterSpacing="0.8px" fontSize="16px">
              {review.description}
            </Text>
          </Box>
        )}
      </HStack>
    </Box>
  )
}

export default MyLogCard
