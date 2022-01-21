import { Request, Response } from 'express'

// TODO jsonファイルからMongoDBに変更
import data from './users.json'

export const getUsers = async (req: Request, res: Response) => {
    res.json(data)
}

export const getUserByAuthId = async (req: Request, res: Response) => {
    const authId: String = req.params.authId

    const user = data.users.filter((user) => user.auth_id === authId)
    res.json(user[0])
}

export const postUser = async (req: Request, res: Response) => {
    const newData = req.body
    data.users.push(newData)
    res.json(data)
}
