import Head from 'next/head'

import Header from '../../component/shop/Header'

function shopTopPage() {
    return (
        <div>
            <Head>
                <title>Signup</title>
                <meta name="Signup" content="ユーザー登録" />
            </Head>
            <Header />
        </div>
    )
}

export default shopTopPage
