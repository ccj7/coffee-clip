import Head from 'next/head'
import axios from 'axios'

import UserHeader from '../../components/user/UserHeader'
import Profile from '../../components/Profile'
import Tabs from '../../components/Tab'
import { useEffect, useState } from 'react'

import { VFC } from 'react'
import { useAuthContext } from '../../auth/AuthContext'
import { isLoggedIn } from '../../util'

// TODO: 仮でInterfaceを入れているので、実際のデータ型に変更
interface Review {
  image?: string
  description?: string
}

interface User {
  auth_id: string
  handle_name: string
  display_name: string
  icon?: string
}

const Mypage: WithGetAccessControl<VFC> = (props) => {
  const { currentUser } = useAuthContext()
  const [userInfo, setUserInfo] = useState<User>()
  
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
      {userInfo && (
        <Profile
          display_name={userInfo.display_name}
          handle_name={userInfo.handle_name}
          icon={userInfo.icon}
        />
      )}
      <p>フォロー数表示</p>
      <p>フォロワー数表示</p>
      <section>
        <Tabs color="amber" />
      </section>
    </div>
  )
}

Mypage.getAccessControl = async () => {
  return ! await isLoggedIn() ? { type: 'replace', destination: '/user/signin' } : null
}

export default Mypage
