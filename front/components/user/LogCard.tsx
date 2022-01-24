import Link from 'next/link'
import { Box, Heading, Image, Text, HStack } from '@chakra-ui/react'
import IconImage from '../Image'

function LogCard(props: any) {
  const { display_name, handle_name, review } = props;
  return (
    <Link href={"test"}>
      <Box mb="10">
      <HStack>
        <IconImage />
        <Box>
          <Heading size="lg">{display_name}</Heading>
          <Text>{handle_name}</Text>
        </Box>
      </HStack>
      <HStack>
        <Image src={review.image} />
        <Text>{review.description}</Text>
      </HStack>
      </Box>
    </Link>
  )
}

export default LogCard;