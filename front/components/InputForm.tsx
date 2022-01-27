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
  const { thema, text, defaultValue } = props

  const methods = useFormContext()
  const {
    formState: { errors },
    setValue,
  } = useFormContext()

  useEffect(() => {
    setValue(thema, defaultValue)
  }, [defaultValue])

  return (
    <>
      <FormControl isInvalid={errors[thema]}>
        <FormLabel htmlFor={thema}>{text}</FormLabel>
        <Input
          id={thema}
          {...methods.register(thema, {
            // required: true,
          })}
        />
        <FormErrorMessage>
          {errors[thema] && 'This is required'}
        </FormErrorMessage>
      </FormControl>
    </>
  )
}

export default InputForm
