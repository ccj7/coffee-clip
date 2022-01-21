import { Request, Response } from 'express'

// TODO jsonファイルからMongoDBに変更
import data from './users.json'

export const getUsers = async (req: Request, res: Response) => {
    res.json(data)
}

export const getUserByHandleName = async (req: Request, res: Response) => {
    const handleName: String = req.params.handleName

    const user = data.users.filter((user) => user.handle_name === handleName)
    res.json(user[0])
}
