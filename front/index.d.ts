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
  image?: string
  description?: string
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
  _id: string
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
  __v: string
  _id: string
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
  selling_point?: {
    text: string
    image: string
  }
}
