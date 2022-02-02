import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

function InputForm(props: any) {
  const { theme, text, defaultValue, type, validation, errorMessage } = props

  let inputType = ''
  if (type) {
    inputType = type
  } else {
    inputType = 'text'
  }

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
      <FormControl isInvalid={errors[theme]}>
        <FormLabel fontSize="sm" htmlFor={theme}>
          {text}
        </FormLabel>
        <>
          <Input
            mb="25px"
            bg="#FCFAF8"
            borderColor="brand.color6"
            id={theme}
            type={inputType}
            {...methods.register(theme, validation)}
          />
          <FormErrorMessage>{errors[theme] && errorMessage}</FormErrorMessage>
        </>
      </FormControl>
    </>
  )
}

export default InputForm
