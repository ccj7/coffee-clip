import Head from 'next/head'
import axios from 'axios'

import UserHeader from '../../components/user/UserHeader'
import Profile from '../../components/Profile'
import Tabs from '../../components/Tab'
import { useEffect, useState } from 'react'

function Mypage() {
  const [userInfo, setUserInfo] = useState({
    auth_id: '2222',
    handle_name: '@bob',
    display_name: 'Bob',
    icon: 'Bobのアイコン画像',
    follower_handle_names: ['@alice', '@vue_love'],
    followee_handle_names: ['@kaori_hikita'],
    reviews: [
      {
        image: 'レビュー画像C',
        description: '最高！！',
      },
    ],
  })
  // TODO paramsからハンドルネームを取得

  console.log(userInfo.display_name)
  //　user情報を取得
  useEffect(() => {
    const getUser = async (authId: string) => {
      //   const res: any = await axios.get(`/api/users/${authId}`)
      //   setUserInfo(res)
    }
    getUser('test')
  }, [])

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
        <Tabs color="pink" />
        {/* TODO ここにタブを作る */}
        <p>ここにタブを作る</p>
      </section>
    </div>
  )
}

export default Mypage
