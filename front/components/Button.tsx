import { Button, Icon } from '@chakra-ui/react'
import React from 'react'

// TODO propsの型を変換する

const PrimaryButton = (props: any) => {
  const { text, onclick } = props
  return (
    <>
      <Button onClick={onclick}>{text}</Button>
    </>
  )
}

export default PrimaryButton
