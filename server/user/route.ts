import { Router } from 'express'
import { getUsers, getUserByHandleName } from './controller'

const routes = Router()

routes.get('/', getUsers)
routes.get('/:authId', getUserByHandleName)

export default routes
