type AccessControlType = 'replace' | 'push'
type AccessControlFallback = { type: AccessControlType; destination: string }
type GetAccessControl = () =>
  | null
  | AccessControlFallback
  | Promise<null | AccessControlFallback>
type WithGetAccessControl<P> = P & {
  getAccessControl?: GetAccessControl
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
