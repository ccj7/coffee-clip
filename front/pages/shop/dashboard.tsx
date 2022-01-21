import Head from 'next/head'

import Header from '../../components/shop/Header'
import Profile from '../../components/Profile'
import PrimaryButton from '../../components/Button'

function PhotoImage() {
  const dammy = {
    uid: 1234,
    shopId: 'arasuna_coffee',
    name: 'Arasuna Coffee',
    Image: 'image',
    address: '東京都コードクリサリス',
    googlemap: 'googlemap URL',
    HP: 'HP URL',
    instagram: 'instagram URL',
    OpeningHours: '9:00~10:00',
    holiday: '月曜日',
    comment: '美味しいコーヒー提供してま〜す',
    recommendCoffee: {
      title: 'グリッチ',
      photo: 'image',
      description: '酸味が特徴！',
    },
    PhotosOfTheStore: 'image',
    commitmentToCoffee: '人生かけてコーヒー淹れてます！',
  }
  // const [shopInfo, setShopInfo] = useEffect<any>(dammy);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="dashboard" content="ダッシュボード" />
      </Head>
      <Header />
      <Profile shopInfo={dammy} />
      <p>住所：{dammy.address}</p>
      <p>HP：{dammy.HP}</p>
      <p>instagram:{dammy.instagram}</p>
      <p>お気に入り　●（数を表示）</p>
      <PrimaryButton text="編集" />
      <PrimaryButton text="公開ページを作成" />
      <></>
    </div>
  )
}

export default PhotoImage
