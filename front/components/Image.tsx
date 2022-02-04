import { Avatar, Image } from '@chakra-ui/react'

type ImageProps = {
  src: string
  alt: string
}

function PostImage(props: ImageProps) {
  return (
    <>
      <Image
        boxSize="250px"
        objectFit="cover"
        src={props.src}
        alt={props.src}
      />
    </>
  )
}

export default PostImage
