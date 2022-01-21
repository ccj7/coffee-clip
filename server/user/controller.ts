import { Request, Response } from 'express'

// TODO jsonファイルからMongoDBに変更
import data from './users.json'

export const getUsers = async (req: Request, res: Response) => {
    res.json(data)
}
