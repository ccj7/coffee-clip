import { Request, Response } from 'express'
import userModel from '../schema/userSchema'
import ShopsDataModel from '../schema/shopSchema'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userModel.find({}, { _id: 0, __v: 0 })
        res.json(users)
    } catch (err) {
        res.status(400).send(err)
    }
}

export const search = async (req: Request, res: Response): Promise<void> => {
    try {
        const keyword = req.query.keyword

        if (keyword) {
            const usersResult = await userModel.find(
                {
                    $or: [
                        { handle_name: new RegExp('.*' + keyword + '.*', 'i') },
                        {
                            display_name: new RegExp(
                                '.*' + keyword + '.*',
                                'i'
                            ),
                        },
                    ],
                },
                { _id: 0, handle_name: 1, display_name: 1, icon: 1 }
            )

            const shopsResult = await ShopsDataModel.find(
                {
                    $or: [
                        {
                            handle_name: new RegExp('.*' + keyword + '.*', 'i'),
                            publish_state: true,
                        },
                        {
                            display_name: new RegExp(
                                '.*' + keyword + '.*',
                                'i'
                            ),
                            publish_state: true,
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
        } else {
            const result = {
                users: [],
                shops: [],
            }
            res.json(result)
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getUserHandleNameCheck = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const handleName: String = req.params.handleName
        const user = await userModel.findOne({ handle_name: handleName })

        if (!user) {
            res.status(200).send(false)
        } else {
            res.status(400).send(true)
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getOtherUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const authId: String = req.params.authId
        const handleName: String = req.params.handleName

        const myUser = await userModel.findOne({ auth_id: authId })

        if (myUser) {
            let otherUser = await userModel.findOne(
                { handle_name: handleName },
                { _id: 0, __v: 0 }
            )

            if (otherUser) {
                let isFollowing: boolean = false
                if (
                    otherUser.follower_handle_names.includes(myUser.handle_name)
                ) {
                    isFollowing = true
                }

                const resData = {
                    auth_id: otherUser.auth_id,
                    handle_name: otherUser.handle_name,
                    display_name: otherUser.display_name,
                    icon: otherUser.icon,
                    follower_handle_names: otherUser.follower_handle_names,
                    followee_handle_names: otherUser.followee_handle_names,
                    followee_shops_handle_names:
                        otherUser.followee_shops_handle_names,
                    reviews: otherUser.reviews,
                    is_following: isFollowing,
                }

                res.json(resData)
            } else {
                res.status(400).json({ error: '選択したuserが見つかりません' })
            }
        } else {
            res.status(400).json({ error: 'ログイン中のuserが見つかりません' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await userModel.findOne(
            { auth_id: req.params.authId },
            { _id: 0, __v: 0 }
        )

        if (data) {
            res.json(data)
        } else {
            res.status(400).json({ error: 'userが見つかりません' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getFolloweeReviews = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
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
                result.sort(
                    (a, b) => b.review!.created_at - a.review!.created_at
                )
            }

            res.json({ reviews: result })
        } else {
            res.status(400).json({ error: 'userが見つかりません' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getFolloweeShops = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const authId: String = req.params.authId
        const user = await userModel.findOne({ auth_id: authId })

        const followeeShops = []

        if (user) {
            if (user.followee_shops_handle_names) {
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
        } else {
            res.status(400).json({ error: 'userが見つかりません' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}
