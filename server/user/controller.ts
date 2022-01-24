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
        const followeeAuthIds = user.followee_auth_ids

        const result = []

        if (followeeAuthIds) {
            for (const followeeAuthId of followeeAuthIds) {
                const followee = await userModel.findOne({
                    auth_id: followeeAuthId,
                })

                if (followee) {
                    if (followee.reviews) {
                        for (const review of followee.reviews) {
                            const reviews = {
                                auth_id: followee.auth_id,
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

        res.json({ followeeReviews: result })
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
