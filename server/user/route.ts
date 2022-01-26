import { Router } from 'express'
import {
    getUsers,
    getUserByAuthId,
    postUser,
    getReviewsOfFolloweesByAuthId,
    postReview,
} from './controller'
import { putUserProfile } from './controller2'
import { getFolloweeShops } from './controller3'

const routes = Router()

routes.get('/', getUsers)
routes.get('/:authId', getUserByAuthId)
routes.get('/:authId/followee/reviews', getReviewsOfFolloweesByAuthId)
routes.get('/:authId/followee/shops', getFolloweeShops)

routes.post('/', postUser)
routes.post('/:authId/reviews', postReview)

routes.put('/:authId', putUserProfile)

export default routes
