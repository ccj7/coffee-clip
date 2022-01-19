// TODO propsの型を変換する
function PrimaryButton(props: any) {
  const { text } = props;
  return (
    <div>
      <button>{text}</button>
    </div>
  );
}

export default PrimaryButton;
