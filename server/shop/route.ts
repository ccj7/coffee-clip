import { Router, Request, Response } from 'express'
import connectToDB from '../db-connection'
import ShopsDataModel from '../schema/shopSchema'
// import { shopDashboard } from './controller'
import { getShops, getShop, getShopEdit } from './controller'

const routes = Router()

routes.get('/', getShops)

//shopダッシュボード画面
routes.get('/handle_name', getShop)

// 【GET】shopダッシュボード編集画面
routes.get('/:authId/edit', getShopEdit)

// 【PUT】shopダッシュボード編集画面
// routes.put('/:authId/edit', async (req: Request, res: Response) => {
//     await connectToDB()
//     const data = await ShopsDataModel.findOne({ auth_id: req.params.authId })
//     const body = {
//         auth_id: { type: req., required: true },
//         handle_name: { type: , required: true },
//         display_name: { type: , required: true },
//         icon: ,
//         address: ,
//         map_url: ,
//         hp_url: ,
//         instagram_url: ,
//         opening_hours: ,
//         regular_day_off: ,
//         concept: ,
//         recommendation: [{ title: , description: , image:  }],
//         selling_point: [{ text: , image:  }],
//     }
// })

// //フォローしているリスト
// routes.put('/:authId/following', async (req: Request, res: Response) => {
//     await connectToDB()
//     const data = await ShopsDataModel.find()
//     res.json(data)

// //
// routes.put('/list', async (req: Request, res: Response) => {
//     await connectToDB()
//     const data = await ShopsDataModel.find()
//     res.send(data)

// routes.get('/:authId', async (req: Request, res: Response): Promise<void> => {
//     const shopAuthId = req.params.authId

//     const arrayOfShop = data.filter((shop: any) => {
//         if (shop.auth_id === shopAuthId) {
//             res.json({ shop: shop })
//         }
//     })
// })

// // TODO: create more routes here

export default routes
