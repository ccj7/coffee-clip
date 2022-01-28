import { Router } from 'express'
import {
    getUsers,
    search,
    getUser,
    getFolloweeReviews,
    getFolloweeShops,
} from './controller_get'

import { postUser, postReview } from './controller_post'

import {
    putUserProfile,
    putFollowUser,
    unfollowUser,
    followShop,
    unfollowShop,
} from './controller_put'

const routes = Router()

routes.get('/', getUsers)
routes.get('/search', search)
routes.get('/details/:handleName', getUser)
routes.get('/:authId', getUser)
routes.get('/:authId/followee/reviews', getFolloweeReviews)
routes.get('/:authId/followee/shops', getFolloweeShops)

routes.post('/', postUser)
routes.post('/:authId/reviews', postReview)

routes.put('/:authId', putUserProfile)
routes.put('/:handleName/following', putFollowUser)
routes.put('/:handleName/unfollowing', unfollowUser)
routes.put('/:authId/shops/following', followShop)
routes.put('/:authId/shops/unfollowing', unfollowShop)

export default routes
