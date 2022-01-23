import { Request, Response } from 'express'
import { connect } from 'mongoose'
import userModel from '../schema/userSchema'

const dbConnect = () => connect('mongodb://localhost:27017/coffee_clip')

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    await dbConnect()
    const users = await userModel.find({})
    res.json(users)
}

export const getUserByAuthId = async (
    req: Request,
    res: Response
): Promise<void> => {
    await dbConnect()
    const authId: String = req.params.authId
    const user = await userModel.findOne({ auth_id: authId })

    res.json(user)
}

export const postUser = async (req: Request, res: Response): Promise<void> => {
    await dbConnect()
    const newData = req.body

    const authIdCheck = await userModel.findOne({
        auth_id: newData.auth_id,
    })

    const handleNameCheck = await userModel.findOne({
        handle_name: newData.handle_name,
    })

    if (!authIdCheck && !handleNameCheck) {
        await userModel.create(newData)
        res.json(newData)
    } else {
        res.status(400).send('auth_id or handle_nameが被っています')
    }
}
