import Link from 'next/link'

// TODO propsの型を変換する
function ShopCard(props: any) {
  const { display_name, handle_name, image, description, url } = props;
  return (
    <Link href={url}>
      <article className='mx-auto w-1/2 w-[45%]'>
        <p>{display_name}</p>
        <p>{handle_name}</p>
        <div className="bg-[#dcdcdc]">
          <p>{image}</p>
        </div>
        <div className="bg-[#e6e6fa]">
          <p>{description}</p>
        </div>
      </article>
    </Link>
  )
}

export default ShopCard;