import Link from 'next/link'

// function UserHeader() {
//   return (
//     <div>
//       {/* TODO ぞれぞれのリンク先 */}
//   <Link href="/">
//     <h1>coffee clip</h1>
//   </Link>
//   <ul>
//     <Link href="/">
//       <li><p>検索</p></li>
//     </Link>
//     <Link href="/">
//       <li><p>タイムライン</p></li>
//     </Link>
//     <Link href="/user/shoplist">
//       <li><p>shop検索</p></li>
//     </Link>
//     <Link href="/">
//       <li><p>My log</p></li>
//     </Link>
//     <Link href="/user/mypage">
//       <li><p>マイページ</p></li>
//     </Link>
//     <Link href="/">
//       <li><p>ログアウト</p></li>
//     </Link>
//   </ul>
// </div>
//   );
// }

// export default UserHeader;

import React from 'react'

function UserHeader() {
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-amber-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              COFFEE CLIP
            </a>
          </div>
          <div
            className="lg:flex flex-grow items-center"
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/user/timeline"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" />{' '}
                  <span className="ml-2">TimeLine</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/user/shoplist"
                >
                  <span className="ml-2">ShopList</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/user/mypage"
                >
                  <span className="ml-2">MyPage</span>
                </a>
              </li>
              <li className="nav-item">
                {/* // TODO  settingを適切なリンクに変更*/}
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/"
                >
                  <span className="ml-2">Setting</span>
                </a>
              </li>
            </ul>

            <div className="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
              <div className="flex">
                <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-amber-600 rounded-full text-sm bg-amber-100 items-center rounded-r-none pl-2 py-1 text-amber-800 border-r-0 placeholder-amber-300">
                  <i className="fas fa-search"></i>
                </span>
              </div>
              <input
                type="text"
                className="px-2 py-1 h-8 border border-solid  border-amber-600 rounded-full text-sm leading-snug text-amber-700 bg-amber-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-amber-300"
                placeholder="Search amber"
              />
              {/* // TODO  検索ボタンと関数を作成*/}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
export default UserHeader
