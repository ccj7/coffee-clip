import { Request, Response } from 'express'
import userModel from '../schema/userSchema'
import connectToDB from '../db-connection'

export const putUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()
    await userModel.updateOne({ auth_id: req.params.authId }, req.body)
    const data = await userModel.findOne({ auth_id: req.params.authId })
    res.send(data)
}
