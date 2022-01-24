import { Button, ButtonGroup } from '@chakra-ui/react'

// TODO propsの型を変換する
function PrimaryButton(props: any) {
  const { text, onclick } = props
  return (
    <>
      <Button onClick={onclick}>{text}</Button>
    </>
  )
}

export default PrimaryButton
