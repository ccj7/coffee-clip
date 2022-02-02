export const reviewInitialData: Review = {
  coffee_name: '',
  image: '',
  description: '',
  created_at: 0,
}

export const userInitialData: UserData = {
  auth_id: '',
  handle_name: '',
  display_name: '',
  icon: '',
  follower_handle_names: [],
  followee_handle_names: [],
  followee_shops_handle_names: [],
  reviews: [reviewInitialData],
}

export const UserInitialDataForTimeline: UserDataForTimeline = {
  handle_name: '',
  display_name: '',
  icon: '',
  review: reviewInitialData
}