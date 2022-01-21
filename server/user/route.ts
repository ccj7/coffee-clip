import { Router } from 'express'
import { getUsers } from './controller'

const routes = Router()

routes.get('/', getUsers)

export default routes
