import e, { Request, Response } from 'express'
import userModel from '../schema/userSchema'
import connectToDB from '../db-connection'
import { s3Upload } from '../s3'
import ShopsDataModel from '../schema/shopSchema'

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
        res.status(400).end()
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
        let iconData: String = ''

        if (bodyData.icon) {
            const imgFileName: string = `icon_user_${bodyData.auth_id}`
            s3Upload(bodyData.icon, imgFileName)
            iconData = await s3Upload(bodyData.icon, imgFileName)
        }

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
            icon: iconData,
            follower_handle_names: [],
            followee_handle_names: [],
            followee_shops_handle_names: [],
            reviews: [],
        }

        await userModel.create(newUser)
        res.status(200).end()
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
        const bodyData = req.body

        let reviewImg: String = ''
        if (bodyData.image) {
            const time = Date.now()

            const imgFileName: string = `review_user_${authId}_${time}`
            reviewImg = await s3Upload(bodyData.image, imgFileName)
        }

        if (newReviews) {
            const newReview = {
                image: reviewImg,
                description: bodyData.description,
            }

            newReviews.push(newReview)

            await userModel.updateOne(
                { auth_id: authId },
                { reviews: newReviews }
            )
        }

        res.status(200).end()
    } else {
        res.status(400).end()
    }
}

export const followShop = async (req: Request, res: Response): Promise<void> => {
    await connectToDB()

    const user = await userModel.findOne({auth_id: req.params.authId})
    const shop = await ShopsDataModel.findOne({handle_name: req.body.handle_name})

    if (!user || !shop) {
        res.status(400).send({ error: '対象のユーザー、または、お店がありません'})
    // followee-shops-handle-namesにフォローするショップのハンドルネームがないかを確認
    }else if(user.followee_shops_handle_names?.includes(shop.handle_name)) {
        res.status(400).send({ error: 'すでにフォロー済みです'})
    // follower_handle_namesに自分のハンドルネームがないかを確認
    } else if (shop.follower_handle_name?.includes(user.handle_name)) {
        res.status(400).send({ error: 'すでにフォロー済みです'})
    // 更新
    } else {
        // ユーザー側のfollowee_shops_handle_names更新
        const shopList = user.followee_shops_handle_names
        if (shopList) {
            shopList.push(shop.handle_name)
        }
        await userModel.updateOne({auth_id: req.params.authId},{followee_shops_handle_names: shopList})
        
        // Shop側のfollower_handle_names更新
        const userList = shop.follower_handle_name
        if (userList) {
            userList.push(user.handle_name)
        }
        await ShopsDataModel.updateOne({handle_name: req.body.handle_name}, {follower_handle_name: userList})

        const newUser = await userModel.findOne({auth_id: req.params.authId})
        res.json(newUser)
    }
}

export const unfollowShop = async (req: Request, res: Response): Promise<void> => {
    await connectToDB()
    
    const user = await userModel.findOne({auth_id: req.params.authId})
    const shop = await ShopsDataModel.findOne({handle_name: req.body.handle_name})
    
    if (!user || !shop) {
        res.status(400).send({ error: '対象のユーザー、または、お店がありません'})
    // followee-shops-handle-namesにフォローするショップのハンドルネームがあるかを確認（なければエラー）
    } else if(!user.followee_shops_handle_names?.includes(shop.handle_name)){
        res.status(400).send({ error: 'まだフォローしていません'})
    // follower_handle_namesに自分のハンドルネームがあるかを確認（なければばエラー）
    } else if(!shop.follower_handle_name?.includes(user.handle_name)) {
        res.status(400).send({ error: 'まだフォローしていません'})
    // 更新
    } else {
        // ユーザー側のfollowee_shops_handle_namesから削除
        const shopList = user.followee_shops_handle_names
        for(let i=0; i<shopList.length; i++) {
            if(shopList[i] === shop.handle_name) {
                shopList.splice(i,1)
            }
        }
        await userModel.updateOne({auth_id: req.params.authId}, {followee_shops_handle_names: shopList})
        // Shop側のfollower_handle_namesから削除
        const userList = shop.follower_handle_name
        for(let i=0; i<userList.length; i++) {
            if(userList[i] === user.handle_name) {
                userList.splice(i,1)
            }
        }
        await ShopsDataModel.updateOne({handle_name: req.body.handle_name}, {follower_handle_name: userList})

        const newShop = await ShopsDataModel.findOne({handle_name: req.body.handle_name})
        console.log(newShop)

        const newUser = await userModel.findOne({auth_id: req.params.authId})
        res.json(newUser)
    }
}