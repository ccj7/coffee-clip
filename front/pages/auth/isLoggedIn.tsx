import { useAuthContext } from './AuthContext'

export const isLoggedIn = () => {
  const { currentUser } = useAuthContext()

  if (currentUser) {
    return true
  }

  if (!currentUser) {
    return false
  }
}
