import { Request, Response } from 'express'
import connectToDB from '../db-connection'
import userModel from '../schema/userSchema'
import ShopsDataModel from '../schema/shopSchema'
import { s3Upload } from '../s3'

export const putUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const dataBody = req.body
        await connectToDB()
        const authIdCheck = await userModel.findOne({
            auth_id: req.params.authId,
        })

        if (!authIdCheck) {
            res.status(400).send({ error: 'ユーザーのアカウントがありません' })
        } else {
            let iconData: String = ''

            if (dataBody?.icon) {
                const imgFileName = `icon_shop_${req.params.authId}`
                iconData = await s3Upload(dataBody.icon, imgFileName)
            }
            if (iconData !== '') {
                dataBody.icon = iconData
            } else {
                delete dataBody.icon
            }

            await userModel.updateOne({ auth_id: req.params.authId }, dataBody)
            const data = await userModel.findOne({ auth_id: req.params.authId })
            res.send(data)
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const followUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await connectToDB()
        const myAuthId = req.params.authId
        const otherHandleName = req.body.handle_name

        const myUser = await userModel.findOne({ auth_id: myAuthId })
        const otherUser = await userModel.findOne({
            handle_name: otherHandleName,
        })

        if (!myUser || !otherUser) {
            res.status(400).json({
                error: 'userが見つかりません',
            })
        } else {
            // ログイン中のユーザー側のfollowee_handle_names更新
            await userModel.updateOne(
                { auth_id: myAuthId },
                { $addToSet: { followee_handle_names: otherUser.handle_name } }
            )

            // フォローする相手側のfollower_handle_names更新
            await userModel.updateOne(
                { handle_name: otherHandleName },
                { $addToSet: { follower_handle_names: myUser.handle_name } }
            )

            res.status(200).json({ message: 'フォローしました' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const unfollowUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await connectToDB()

        const myAuthId = req.params.authId
        const otherHandleName = req.body.handle_name

        const myUser = await userModel.findOne({ auth_id: myAuthId })
        const otherUser = await userModel.findOne({
            handle_name: otherHandleName,
        })

        if (!myUser || !otherUser) {
            res.status(400).json({
                error: 'userが見つかりません',
            })
        } else {
            // ログイン中のユーザー側のfollowee_handle_namesに存在した場合は削除
            await userModel.updateOne(
                { auth_id: myAuthId },
                {
                    $pull: {
                        followee_handle_names: otherUser.handle_name,
                    },
                }
            )

            // フォローする相手側のfollower_handle_namesに存在した場合は削除
            await userModel.updateOne(
                { handle_name: otherHandleName },
                {
                    $pull: {
                        follower_handle_names: myUser.handle_name,
                    },
                }
            )

            res.status(200).json({ message: 'アンフォローしました' })
        }
    } catch (err) {
        res.send(err)
    }
}

export const followShop = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await connectToDB()

        const myAuthId = req.params.authId
        const shopHandleName = req.body.handle_name

        const user = await userModel.findOne({ auth_id: myAuthId })
        const shop = await ShopsDataModel.findOne({
            handle_name: shopHandleName,
        })

        if (!user || !shop) {
            res.status(400).json({
                error: '対象のユーザー、または、お店がありません',
            })
        } else {
            // ユーザー側のfollowee_shops_handle_names更新
            await userModel.updateOne(
                { auth_id: myAuthId },
                { $addToSet: { followee_shops_handle_names: shop.handle_name } }
            )

            // Shop側のfollower_handle_names更新
            await ShopsDataModel.updateOne(
                { handle_name: shopHandleName },
                { $addToSet: { follower_handle_name: user.handle_name } }
            )

            res.status(200).json({ message: 'フォローしました' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const unfollowShop = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await connectToDB()

        const myAuthId = req.params.authId
        const shopHandleName = req.body.handle_name

        const user = await userModel.findOne({ auth_id: myAuthId })
        const shop = await ShopsDataModel.findOne({
            handle_name: shopHandleName,
        })

        if (!user || !shop) {
            res.status(400).json({
                error: '対象のユーザー、または、お店がありません',
            })
        } else {
            // ユーザー側のfollowee_shops_handle_namesに存在した場合は削除
            await userModel.updateOne(
                { auth_id: myAuthId },
                {
                    $pull: {
                        followee_shops_handle_names: shop.handle_name,
                    },
                }
            )

            // Shop側のfollower_handle_namesに存在した場合は削除
            await ShopsDataModel.updateOne(
                { handle_name: shopHandleName },
                {
                    $pull: {
                        follower_handle_name: user.handle_name,
                    },
                }
            )

            res.status(200).json({ message: 'アンフォローしました' })
        }
    } catch (err) {
        res.send(err)
    }
}
