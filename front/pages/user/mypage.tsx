import Head from 'next/head'
// import axios from 'axios'

import UserHeader from '../../components/user/UserHeader'
import Profile from '../../components/Profile'
import Tabs from '../../components/Tab'
import { useEffect, useState } from 'react'

function Mypage() {
  const [userInfo, setUserInfo] = useState({})
  // TODO paramsからハンドルネームを取得
  
  //　user情報を取得
  useEffect(() => {
    const getUser = async (authId: string) => {
      const res: any = await axios.get(`/api/users/${authId}`)
      setUserInfo(res.data)
    }
    // TODO: 実際のユーザーIDに変更
    getUser('1111')
  }, [])

  // TODO: typescriptのuserInfo用のinterfaceをサーバー側から流用して作成
  return (
    <div>
      <Head>
        <title>マイページ</title>
        <meta name="mypage" content="マイページ" />
      </Head>
      <UserHeader />
      <Profile
        display_name={userInfo.display_name}
        handle_name={userInfo.handle_name}
      />
      <p>フォロー数表示</p>
      <p>フォロワー数表示</p>
      <section>
        <Tabs color="amber" />
      </section>
    </div>
  )
}

export default Mypage
