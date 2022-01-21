import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'
import firebase from '../../auth/firebaseConfig'
import PrimaryButton from '../Button'

function Header() {
  const logout = async () => {
    const auth = getAuth(firebase)
    try {
      signOut(auth)
      // history.push('/login')
    } catch (error) {
      alert(error)
    }
    console.log('ログアウト')
  }
  return (
    <div>
      <Link href="/">
        <h1>coffee clip</h1>
      </Link>
      <PrimaryButton text="ログアウト" onclick={logout} />
    </div>
  )
}

export default Header
