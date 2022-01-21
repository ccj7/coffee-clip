// TODO propsの型を変換する
function PrimaryButton(props: any) {
  const { text, onclick } = props
  return (
    <div>
      <button onClick={onclick}>{text}</button>
    </div>
  )
}

export default PrimaryButton
