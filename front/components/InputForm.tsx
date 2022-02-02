import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'

function InputForm(props: any) {
  const { theme, text, defaultValue } = props

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
        <Input
          mb="25px"
          bg="#FCFAF8"
          borderColor="brand.color6"
          id={theme}
          {...methods.register(theme, {
            // required: true,
          })}
        />
        <FormErrorMessage>
          {errors[theme] && 'This is required'}
        </FormErrorMessage>
      </FormControl>
    </>
  )
}

export default InputForm
