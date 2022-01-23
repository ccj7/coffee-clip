import Image from '../Image'

function LogCard(props: any) {
  //const { display_name, handle_name } = props;
  return (
    <div>
      <section>
        <Image />
        <p>Sota</p>
        <p>@sota_113</p>
      </section>
      <section>
        <div className='flex flex-wrap'>
          <article className='w-full lg:w-1/2'>
            <p>ここに飲んだコーヒーのテキスト（reviews[i].description）、画像がなければ成り行き</p>
          </article>
          <aside className='w-full lg:w-1/2'>
            <p>ここに飲んだコーヒーのImg（reviews[i].image）</p>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default LogCard;