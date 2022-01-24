import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

function InputForm(props: any) {
  const { thema, text, defaultValue } = props

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  return (
    <>
      <FormControl isInvalid={errors.thema}>
        <FormLabel htmlFor={thema}>{text}</FormLabel>
        <Input
          id={thema}
          defaultValue={defaultValue}
          {...register(thema, {
            required: 'This is required',
            // minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.thema && errors.thema.message}
        </FormErrorMessage>
      </FormControl>
    </>
  )
}

export default InputForm
