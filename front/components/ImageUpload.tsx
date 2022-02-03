import { useRef, useState } from 'react'
import {
  Button,
  Image,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  Box,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

function ImageUpload(props: any) {
  const { size, theme, text } = props

  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext()

  const [image, setImage] = useState('')

  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register(theme)

  const validateFiles = (value: FileList | null) => {
    if (value) {
      if (value.length < 1) {
        return 'Files is required'
      }
      for (const file of Array.from(value)) {
        const fsMb = file.size / (1024 * 1024)
        const MAX_FILE_SIZE = 10
        if (fsMb > MAX_FILE_SIZE) {
          return 'Max file size 10mb'
        }
      }
      return true
    }
  }

  // アップされた画像データをimageにセット
  const handleChangeImage = (files: any) => {
    if (files) {
      encodeToBase64(files[0])
    }
  }

  // base64を生成する関数
  const encodeToBase64 = async (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result as string
      setImage(base64)
      setValue(theme, base64)
    }
  }
  const handleClick = () => inputRef.current?.click()

  return (
    <Box mb="20px">
      <FormControl isInvalid={!!errors.file_}>
        <FormLabel fontSize="sm">{text}</FormLabel>
        <InputGroup onClick={handleClick} w={'100px'}>
          <input
            id={theme}
            type="text"
            {...register(theme)}
            hidden
            onChange={(e) => {}}
          ></input>
          <input
            type={'file'}
            multiple={false}
            hidden
            accept="image/*"
            ref={(e) => {
              ref(e)
              inputRef.current = e
            }}
            onChange={(e) => {
              validateFiles(e.target.files)
              handleChangeImage(e.target.files)
            }}
          />
          <Button
            backgroundColor="brand.color4"
            _hover={{ backgroundColor: '#b8b1aa' }}
            color="white"
            leftIcon={<Icon as={FiFile} />}
          >
            Upload
          </Button>
        </InputGroup>
        <FormErrorMessage>
          {errors.theme && errors?.theme.message}
        </FormErrorMessage>
      </FormControl>
      {image && <Image w={size} src={image} />}
    </Box>
  )
}

export default ImageUpload
