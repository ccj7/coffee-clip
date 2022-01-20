import Link from "next/link";

function UserHeader() {
  return (
    <div>
      {/* TODO ぞれぞれのリンク先 */}
      <Link href="/">
        <h1>coffee clip</h1>
      </Link>
      <ul>
        <Link href="/">
          <li><p>検索</p></li>
        </Link>
        <Link href="/">
          <li><p>タイムライン</p></li>
        </Link>
        <Link href="/user/shoplist">
          <li><p>shop検索</p></li>
        </Link>
        <Link href="/">
          <li><p>My log</p></li>
        </Link>
        <Link href="/user/mypage">
          <li><p>マイページ</p></li>
        </Link>
        <Link href="/">
          <li><p>ログアウト</p></li>
        </Link>
      </ul>
    </div>
  );
}

export default UserHeader;
