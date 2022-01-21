import Image from './Image'

// TODO propsの型を変換する
function PhotoImage(props: any) {
  const { display_name, handle_name } = props
  return (
    <div>
      <Image />
      <h1>{display_name}</h1>
      <p>{handle_name}</p>
    </div>
  )
}

export default PhotoImage
