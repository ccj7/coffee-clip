import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Textarea,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

function TextArea(props: any) {
  const { theme, text, defaultValue, validation, errorMessage } = props

  const methods = useFormContext()
  const {
    formState: { errors },
    setValue,
  } = useFormContext()

  useEffect(() => {
    setValue(theme, defaultValue)
  }, [defaultValue])

  return (
    <>
      <FormControl isInvalid={errors[theme]} mb="25px">
        <FormLabel fontSize="sm" htmlFor={theme}>
          {text}
        </FormLabel>
        <>
          <Textarea
            bg="#FCFAF8"
            borderColor="brand.color6"
            id={theme}
            {...methods.register(theme, validation)}
          />
          <FormErrorMessage>{errors[theme] && errorMessage}</FormErrorMessage>
        </>
      </FormControl>
    </>
  )
}

export default TextArea
