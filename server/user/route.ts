import { Router } from 'express'
import {
    getUsers,
    getUserByAuthId,
    postUser,
    getReviewsOfFolloweesByAuthId,
    postReview,
} from './controller'
import { getUser, putFollowUser, putUserProfile } from './controller2'

const routes = Router()

routes.get('/', getUsers)
routes.get('/:authId', getUser)
routes.get('/details/:handleName', getUser)
routes.get('/:authId', getUserByAuthId)
routes.get('/:authId/followee/reviews', getReviewsOfFolloweesByAuthId)

routes.post('/', postUser)
routes.post('/:authId/reviews', postReview)

routes.put('/:authId', putUserProfile)
routes.put('/:handleName/following', putFollowUser)

export default routes
