import { Router, Request, Response } from 'express'
import connectToDB from '../db-connection'
import ShopsDataModel from '../schema/shopSchema'
// import { shopDashboard } from './controller'

const routes = Router()

//shopダッシュボード画面
routes.get('/:authId', async (req: Request, res: Response) => {
    await connectToDB()
    const data = await ShopsDataModel.findOne({ auth_id: req.params.authId })
    res.json(data)
})

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

// //shopダッシュボード編集画面
// routes.put('/:authId/edit', async (req: Request, res: Response) => {
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
