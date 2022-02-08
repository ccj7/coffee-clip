import { Router } from 'express'
import {
  getUsers,
  search,
  getUserHandleNameCheck,
  getOtherUser,
  getUser,
  getFolloweeReviews,
  getFolloweeShops,
} from './controller_get'

import { postUser, postReview } from './controller_post'

import {
  putUserProfile,
  followUser,
  unfollowUser,
  followShop,
  unfollowShop,
} from './controller_put'

const routes = Router()

routes.get('/', getUsers)
routes.get('/search', search)
routes.get('/handle/:handleName', getUserHandleNameCheck)
routes.get('/:authId', getUser)
routes.get('/:authId/followee/reviews', getFolloweeReviews)
routes.get('/:authId/followee/shops', getFolloweeShops)
routes.get('/:authId/:handleName', getOtherUser)

routes.post('/', postUser)
routes.post('/:authId/reviews', postReview)

routes.put('/:authId', putUserProfile)
routes.put('/:authId/users/following', followUser)
routes.put('/:authId/users/unfollowing', unfollowUser)
routes.put('/:authId/shops/following', followShop)
routes.put('/:authId/shops/unfollowing', unfollowShop)

export default routes
