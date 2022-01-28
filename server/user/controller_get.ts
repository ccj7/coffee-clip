import { Request, Response } from 'express'
import connectToDB from '../db-connection'
import userModel from '../schema/userSchema'
import ShopsDataModel from '../schema/shopSchema'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDB()
        const users = await userModel.find({})
        res.json(users)
    } catch (err) {
        res.status(400).send(err)
    }
}

export const search = async (req: Request, res: Response): Promise<void> => {
    await connectToDB()
    const keyword = req.query.keyword

    const usersResult = await userModel.find(
        {
            $or: [
                { handle_name: new RegExp('.*' + keyword + '.*', 'i') },
                { display_name: new RegExp('.*' + keyword + '.*', 'i') },
            ],
        },
        { _id: 0, handle_name: 1, display_name: 1, icon: 1 }
    )

    const shopsResult = await ShopsDataModel.find(
        {
            $or: [
                {
                    handle_name: new RegExp('.*' + keyword + '.*', 'i'),
                },
                {
                    display_name: new RegExp('.*' + keyword + '.*', 'i'),
                },
            ],
        },
        { _id: 0, handle_name: 1, display_name: 1, icon: 1, concept: 1 }
    )

    const result = {
        users: usersResult,
        shops: shopsResult,
    }

    res.json(result)
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    await connectToDB()
    const data = await userModel.findOne({
        $or: [
            { auth_id: req.params.authId },
            { handle_name: req.params.handleName },
        ],
    })
    res.json(data)
}

export const getReviewsOfFolloweesByAuthId = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()
    const authId: String = req.params.authId
    const user = await userModel.findOne({ auth_id: authId })

    if (user) {
        const result = []

        if (user.reviews.length > 0) {
            let myHandleName = user.handle_name
            let myDisplayName = user.display_name
            let myIcon = user.icon

            for (const review of user.reviews) {
                const myReview = {
                    handle_name: myHandleName,
                    display_name: myDisplayName,
                    icon: myIcon,
                    review: review,
                }

                result.push(myReview)
            }
        }

        const followeeHandleNames = user.followee_handle_names

        if (followeeHandleNames) {
            for (const followeeHandleName of followeeHandleNames) {
                const followee = await userModel.findOne({
                    handle_name: followeeHandleName,
                })

                if (followee) {
                    if (followee.reviews) {
                        let followeeHandleName = followee.handle_name
                        let followeeDisplayName = followee.display_name
                        let followeeIcon = followee.icon

                        for (const review of followee.reviews) {
                            const reviews = {
                                handle_name: followeeHandleName,
                                display_name: followeeDisplayName,
                                icon: followeeIcon,
                                review: review,
                            }
                            result.push(reviews)
                        }
                    }
                }
            }
        }

        if (result.length > 0) {
            result.sort((a, b) => b.review!.created_at - a.review!.created_at)
        }

        res.json({ reviews: result })
    } else {
        res.status(400).end()
    }
}

export const getFolloweeShops = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()
    const authId: String = req.params.authId
    const user = await userModel.findOne({ auth_id: authId })

    const followeeShops = []

    if (user && user.followee_shops_handle_names) {
        for (const shopHandleName of user.followee_shops_handle_names) {
            const shop = await ShopsDataModel.findOne(
                {
                    handle_name: shopHandleName,
                    publish_state: true,
                },
                {
                    handle_name: 1,
                    display_name: 1,
                    icon: 1,
                    concept: 1,
                    _id: 0,
                }
            )

            if (shop) {
                followeeShops.push(shop)
            }
        }
    }

    res.json({ followeeShops: followeeShops })
}
