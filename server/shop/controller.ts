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

export const putShop = async (req: Request, res: Response) => {
    await connectToDB()
    await ShopsDataModel.updateOne({ auth_id: req.params.authId }, req.body)
    const data = await ShopsDataModel.findOne({ auth_id: req.params.authId })
    res.send(data)
}
