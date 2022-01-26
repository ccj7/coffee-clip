import { useState } from 'react'
import { Button, Image } from '@chakra-ui/react'

function ImageUpload(props: any) {
  // base64に変換したコードを格納するstateと、setするもの、サムネのサイズを渡してください
  const { base64Code, setBase64Code, size } = props

  // アップロードされた画像のデータ
  const [image, setImage] = useState("")

  // アップされた画像データをimageにセット
  const handleChangeImage = (e: any) => {
    setImage(e.target.files[0])
  }

  // base64を生成する関数
  const encodeToBase64 = async (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result as string
      console.log(base64)

      setBase64Code(base64)
    }
  }

  // 画像をアップロードする関数
  const uploadImage = () => {
    encodeToBase64(image)
  }

  return (
    <>
     <input type="file" accept="image/png, image/jpeg" onChange={handleChangeImage}/>
     <Button type="submit" onClick={uploadImage}>アップロード</Button>
     { base64Code && 
     <Image w={size} src={base64Code} />
     }
    </>
  )
}

export default ImageUpload
