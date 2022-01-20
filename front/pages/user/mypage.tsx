import Head from 'next/head'

import UserHeader from '../../component/user/UserHeader'
import Profile from '../../component/Profile'

function Mypage() {
    const myInfo = {
        shopId: 'kaori_hikita',
        name: 'Kaori',
    }

    return (
        <div>
            <Head>
                <title>マイページ</title>
                <meta name="mypage" content="マイページ" />
            </Head>
            <UserHeader />
            <Profile shopInfo={myInfo} />
            <p>フォロー数表示</p>
            <p>フォロワー数表示</p>
            <section>
                {/* TODO ここにタブを作る */}
                <p>ここにタブを作る</p>
            </section>
        </div>
    )
}

export default Mypage
