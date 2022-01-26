import { Router } from 'express'
import {
    getUsers,
    getUserByAuthId,
    postUser,
    getReviewsOfFolloweesByAuthId,
    postReview,
} from './controller'
import { putUserProfile } from './controller2'

const routes = Router()

routes.get('/', getUsers)
routes.get('/:authId', getUserByAuthId)
routes.get('/:authId/followee/reviews', getReviewsOfFolloweesByAuthId)

routes.post('/', postUser)
routes.post('/:authId/reviews', postReview)

routes.put('/:authId', putUserProfile)

export default routes
