import { Router, Request, Response } from 'express'
import connectToDB from '../db-connection'
import ShopsDataModel from '../schema/shopSchema'
// import { shopDashboard } from './controller'
import { getShops, getShop, putShop, postShop } from './controller'

const routes = Router()

routes.get('/', getShops)

//shopダッシュボード画面
routes.get('/:authId', getShop)

// 【PUT】shopダッシュボード編集画面
routes.put('/:authId', putShop)

routes.get('/details/:handleName', getShop)

routes.post('/', postShop)

// // TODO: create more routes here

export default routes
