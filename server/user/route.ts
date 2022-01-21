import { Router } from 'express'
import { getUsers, getUserByHandleName, postUser } from './controller'

const routes = Router()

routes.get('/', getUsers)
routes.get('/:authId', getUserByHandleName)

routes.post('/', postUser)

export default routes
