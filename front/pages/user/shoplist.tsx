import Head from "next/head";

function Shoplist () {

  const shoplist = [
    {
      name: "Arasuna Coffee",
      shopId: "arasuna_coffee",
      image: "ここにImg",
      comment: "美味しいコーヒー提供してま〜す"
    },
    {
      name: "Arasuna Coffee2",
      shopId: "Arasuna_kiyosumi",
      image: "ここにImg",
      comment: "清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。"
    },
    {
      name: "Arasuna Coffee3",
      shopId: "Arasuna_kiyosumi",
      image: "ここにImg",
      comment: "清澄白河にあるカフェです。清澄白河にあるカフェです。清澄白河にあるカフェです。"
    }
  ];


  return (
    <div>
      <Head>
        <title>ショップ一覧</title>
      </Head>
      {shoplist.map(shop => {
        return (
          <div key={shop.shopId}>
            <p>{shop.name}</p>
            <p>{shop.shopId}</p>
            <p>{shop.image}</p>
            <p>{shop.comment}</p>
          </div>
          )
        })}
    </div>
  );
}

export default Shoplist;