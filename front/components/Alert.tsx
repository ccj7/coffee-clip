import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

function Alert(props: any) {
  const { alert, message } = props

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  useEffect(() => {
    if (alert) {
      onOpen()
    }
  }, [])

  return (
    <>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Alert</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Alert
