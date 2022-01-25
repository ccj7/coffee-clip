import { Request, Response } from 'express'
import userModel from '../schema/userSchema'
import connectToDB from '../db-connection'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    await connectToDB()
    const users = await userModel.find({})
    res.json(users)
}

export const getUserByAuthId = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()
    const authId: String = req.params.authId
    const user = await userModel.findOne({ auth_id: authId })

    res.json(user)
}

export const getReviewsOfFolloweesByAuthId = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()
    const authId: String = req.params.authId
    const user = await userModel.findOne({ auth_id: authId })

    if (user) {
        const followeeHandleNames = user.followee_handle_names

        const result = []

        if (followeeHandleNames) {
            for (const followeeHandleName of followeeHandleNames) {
                const followee = await userModel.findOne({
                    handle_name: followeeHandleName,
                })

                if (followee) {
                    if (followee.reviews) {
                        for (const review of followee.reviews) {
                            const reviews = {
                                handle_name: followee.handle_name,
                                display_name: followee.display_name,
                                icon: followee.icon,
                                reviews: review,
                            }
                            result.push(reviews)
                        }
                    }
                }
            }
        }

        res.json({ reviewsOfFollowees: result })
    } else {
        res.status(400).send('Error')
    }
}

export const postUser = async (req: Request, res: Response): Promise<void> => {
    await connectToDB()
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
        res.status(400).send('Error')
    }
}
