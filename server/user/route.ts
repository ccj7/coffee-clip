import { Router } from 'express'
import {
    getUsers,
    getUserByAuthId,
    postUser,
    getReviewsOfFolloweesByAuthId,
    postReview,
} from './controller'

const routes = Router()

routes.get('/', getUsers)
routes.get('/:authId', getUserByAuthId)
routes.get('/:authId/followee/reviews', getReviewsOfFolloweesByAuthId)

routes.post('/', postUser)
routes.post('/:authId/reviews', postReview)

export default routes
