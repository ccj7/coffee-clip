import Image from "./Image";

// TODO propsの型を変換する
function PhotoImage(props: any) {
  const { shopInfo } = props;
  console.log(shopInfo);
  return (
    <div>
      <Image />
      <h1>{shopInfo.name}</h1>
      <p>{shopInfo.shopId}</p>
    </div>
  );
}

export default PhotoImage;
