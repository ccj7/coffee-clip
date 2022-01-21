import { Router, Request, Response } from 'express'
// const data = require('../dammy.json')
// import dammy from "../dammy.json"

// import {} from "./controller";

// const basePath = '/api/tasks'
const routes = Router()

const dammy = [
    {
        auth_id: '1',
        handle_name: 'arasuna_coffee',
        display_name: 'Arasuna Coffee',
        icon: 'image',
        address: '東京都コードクリサリス',
        map_url: 'googlemap URL',
        hp_url: 'HPURL',
        instagram_url: 'instagram URL',
        opening_hours: '9:00~10:00',
        regular_day_off: '月曜日',
        concept: '美味しいコーヒー提供してま〜す',
        recommendation: {
            title: 'グリッチ',
            description: '酸味が特徴！',
            image: 'image',
        },
        selling_point: 'image',
        follower_auth_ids: ['ccmizki'],
    },
]

routes.get('/', async (req: Request, res: Response): Promise<void> => {
    res.json({ dammy: dammy })
})

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
