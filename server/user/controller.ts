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
    const bodyData = req.body

    const authIdCheck = await userModel.findOne({
        auth_id: bodyData.auth_id,
    })

    const handleNameCheck = await userModel.findOne({
        handle_name: bodyData.handle_name,
    })

    if (!authIdCheck && !handleNameCheck) {
        interface User {
            auth_id: String
            handle_name: String
            display_name: String
            icon: String | undefined
            follower_handle_names: Array<String>
            followee_handle_names: Array<String>
            followee_shops_handle_names: Array<String>
            reviews: Array<String>
        }

        const newUser: User = {
            auth_id: bodyData.auth_id,
            handle_name: bodyData.handle_name,
            display_name: bodyData.display_name,
            icon: bodyData.icon,
            follower_handle_names: [],
            followee_handle_names: [],
            followee_shops_handle_names: [],
            reviews: [],
        }

        await userModel.create(newUser)
        res.status(201).end()
    } else {
        res.status(400).end()
    }
}

export const postReview = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()

    const authId: String = req.params.authId
    const user = await userModel.findOne({ auth_id: authId })

    if (user) {
        const newReviews = user.reviews

        if (newReviews) {
            newReviews.push(req.body)

            await userModel.updateOne(
                { auth_id: authId },
                { reviews: newReviews }
            )
        }

        res.status(201).end()
    } else {
        res.status(400).end()
    }
}
