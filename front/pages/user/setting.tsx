// TODO　U-003 github issue#21

import Head from 'next/head'
import UserHeader from '../../components/user/UserHeader'
import { useState } from 'react'
// import axios from 'axios'
import { Button } from '@chakra-ui/react'

// TODO: 全体的に型をちゃんと定義する
function Setting() { 

  const [image, setImage] = useState("");
  const [base64Code, setBase64Code] = useState("");

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

      // この時点でセットされるようにする
      setBase64Code(base64)
    }
  }

  // アップロードする関数
  const uploadImage = () => {
    encodeToBase64(image)
    
    // ここでbase64Codeを使ってfetchする
    
  }

  return (
    <div>
      <Head>
        <title>Setting</title>
        <meta name="Setting" content="Setting" />
      </Head>
      <UserHeader />
      <input type="file" accept="image/*" onChange={handleChangeImage}/>
      <Button type="submit" onClick={uploadImage}>アップロード</Button>
    </div>
  )
}

export default Setting
