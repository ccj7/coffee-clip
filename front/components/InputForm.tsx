import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { useForm, useFormContext } from 'react-hook-form'

function InputForm(props: any) {
  const { thema, text, defaultValue } = props

  // const {
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm()
  const methods = useFormContext()
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <FormControl isInvalid={errors[thema]}>
        <FormLabel htmlFor={thema}>{text}</FormLabel>
        <Input
          id={thema}
          defaultValue={defaultValue}
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
