import { Router, Request, Response } from 'express'
// const data = require('../dammy.json')
// import dammy from "../dammy.json"

import { getShops } from "./controller";

// const basePath = '/api/tasks'
const routes = Router()

routes.get('/', getShops)

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
