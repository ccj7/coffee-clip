import Link from 'next/link'
import { Box, Heading, Image, Text, HStack } from '@chakra-ui/react'

function LogCard(props: any) {
  const { display_name, handle_name, icon, review } = props;
  return (
    <Link href={"test"}>
      <Box mb="10">
      <HStack>
        <Image
          borderRadius='full'
          boxSize='70px'
          objectFit='cover'
          src={icon}
          alt={display_name} />
        <Box>
          <Heading size="lg">{display_name}</Heading>
          <Text>{handle_name}</Text>
        </Box>
      </HStack>
      <HStack>
        {review &&
        
        <Box>
        {review.image && 
          <Image
            boxSize='250px'
            objectFit='cover'
            src={review.image}
            alt={review.description} />    
        }
        <Text>{review.description}</Text>
        </Box>
  
        }
      </HStack>
      </Box>
    </Link>
  )
}

export default LogCard;