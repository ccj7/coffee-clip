import { background, Button } from '@chakra-ui/react'
import React from 'react'

// TODO propsの型を変換する

const PrimaryButton = (props: any) => {
  const { text, onclick } = props
  return (
    <>
      <Button
       onClick={onclick}
       backgroundColor='brand.color5'
       color='brand.color1'
       _hover={{backgroundColor:'rgba(162, 178, 155, 0.6)', color:'rgba(65, 64, 66, 0.6)'}}
      >{text}</Button>
    </>
  )
}

export default PrimaryButton
