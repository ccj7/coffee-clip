import { Router } from 'express'
import { getUsers, getUserByAuthId, postUser } from './controller'

const routes = Router()

routes.get('/', getUsers)
routes.get('/:authId', getUserByAuthId)

routes.post('/', postUser)

export default routes
