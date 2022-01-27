import { Router } from 'express'
import {
    getUsers,
    getUserByAuthId,
    postUser,
    getReviewsOfFolloweesByAuthId,
    postReview,
    followShop,
    unfollowShop,
} from './controller'


import {
    putUserProfile,
    getUser,
    putFollowUser,
    unfollowUser,
} from './controller2'

import { getFolloweeShops } from './controller3'

const routes = Router()

routes.get('/', getUsers)
routes.get('/:authId', getUser)
routes.get('/details/:handleName', getUser)
routes.get('/:authId', getUserByAuthId)
routes.get('/:authId/followee/reviews', getReviewsOfFolloweesByAuthId)
routes.get('/:authId/followee/shops', getFolloweeShops)

routes.post('/', postUser)
routes.post('/:authId/reviews', postReview)

routes.put('/:authId', putUserProfile)
routes.put('/:handleName/following', putFollowUser)

routes.put('/:handleName/unfollowing', unfollowUser)


routes.put('/:authId/shops/following', followShop)
routes.put('/:authId/shops/unfollowing', unfollowShop)

export default routes
