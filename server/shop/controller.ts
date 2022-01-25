import { Request, Response } from 'express'
import connectToDB from '../db-connection'
import ShopsDataModel from '../schema/shopSchema'

export const getShops = async (req: Request, res: Response) => {
    await connectToDB()
    const data = await ShopsDataModel.find()
    res.send(data)
}

export const getShop = async (req: Request, res: Response) => {
    await connectToDB()
    const data = await ShopsDataModel.findOne({

        auth_id: req.params.authId
      
    })
    res.json(data)
}

export const getShopEdit = async (req: Request, res: Response) => {
    await connectToDB()
    const data = await ShopsDataModel.findOne({ auth_id: req.params.authId })
    res.json(data)
}
