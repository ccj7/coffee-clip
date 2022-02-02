type AccessControlType = 'replace' | 'push'
type AccessControlFallback = { type: AccessControlType; destination: string }
type GetAccessControl = () =>
  | null
  | AccessControlFallback
  | Promise<null | AccessControlFallback>
type WithGetAccessControl<P> = P & {
  getAccessControl?: GetAccessControl
}

type Review = {
  coffee_name?: string
  image?: string
  description?: string
  created_at?: number
}

type UserData = {
  auth_id: string
  handle_name: string
  display_name: string
  icon?: string
  follower_handle_names: string[]
  followee_handle_names: string[]
  followee_shops_handle_names: string[]
  reviews: Review[]
}

type UserDataForTimeline = {
  handle_name: string
  display_name: string
  icon: string
  review: Review
}

type ShopData = {
  auth_id: string
  handle_name: string
  display_name: string
  icon: string
  address: string
  map_url: string
  hp_url: string
  instagram_url: string
  opening_hours: string
  regular_day_off: string
  concept: string
  recommendation: {
    title: string
    description: string
    image: string
  }
  selling_point: {
    text: string
    image: string
  }
  follower_handle_name: string[]
  publish_state: string
  is_following: boolean
}

type PartOfUserData = {
  handle_name: string
  display_name: string
  icon: string
}

type PartOfShopData = {
  auth_id: string
  display_name: string
  handle_name: string
  icon?: string
  concept: string
}

type UserSignUpInfo = {
  display_name: string
  handle_name: string
  auth_id: string
  icon: string
}