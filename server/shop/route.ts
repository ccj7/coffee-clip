import { Router } from 'express'
import {
  getShops,
  getShop,
  getShopHandleNameCheck,
  putShop,
  postShop,
  getShopFromUser,
} from './controller'

const routes = Router()

routes.get('/', getShops)
routes.get('/details/:handleName', getShop)
routes.get('/handle/:handleName', getShopHandleNameCheck)
routes.get('/:authId', getShop)
routes.get('/:authId/:handleName', getShopFromUser)

routes.put('/:authId', putShop)

routes.post('/', postShop)

export default routes
