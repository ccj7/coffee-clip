import { Request, Response } from 'express'
import connectToDB from '../db-connection'
import ShopsDataModel from '../schema/shopSchema'

export const getShops = async (req: Request, res: Response) => {
  await connectToDB()
  const data = await ShopsDataModel.find()
  res.send(data)
}