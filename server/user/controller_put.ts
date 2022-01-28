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

export const putFollowUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()
    const user = await userModel.findOne({
        handle_name: req.params.handleName,
    })

    const currentUser = await userModel.findOne({
        auth_id: req.body.auth_id,
    })

    if (!user || !currentUser) {
        res.status(400).send({ error: '見つかりませんでした' })
    } else if (!user.follower_handle_names?.includes(req.body.handle_name)) {
        const userList = user.follower_handle_names
        const currentUserList = currentUser.followee_handle_names

        if (userList) {
            userList.push(currentUser.handle_name)
        }
        if (currentUserList) {
            currentUserList.push(user.handle_name)
        }

        await userModel.updateOne(
            { handle_name: req.params.handleName },
            { follower_handle_names: userList }
        )

        await userModel.updateOne(
            { auth_id: req.body.auth_id },
            { followee_handle_names: currentUserList }
        )

        const updateUser = await userModel.findOne({
            handle_name: req.params.handleName,
        })
        res.json(updateUser)
    } else {
        res.status(403).json({ error: 'you already follow this users' })
    }
}

export const unfollowUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()
    const user = await userModel.findOne({
        handle_name: req.params.handleName,
    })

    const currentUser = await userModel.findOne({
        auth_id: req.body.auth_id,
    })

    if (!user || !currentUser) {
        res.status(400).send({ error: '見つかりませんでした' })
    } else if (!user.follower_handle_names?.includes(currentUser.handle_name)) {
        res.status(403).send({ error: 'まだフォローしていません' })
    } else if (!currentUser.followee_handle_names?.includes(user.handle_name)) {
        res.status(403).send({ error: 'まだフォローしていません' })
    } else {
        const userList = user.follower_handle_names
        for (let i = 0; i < userList.length; i++) {
            if (userList[i] === currentUser.handle_name) {
                userList.splice(i, 1)
            }
        }

        await userModel.updateOne(
            { handle_name: req.params.handleName },
            { follower_handle_names: userList }
        )

        const currentUserList = currentUser.followee_handle_names
        for (let i = 0; i < currentUserList.length; i++) {
            if (currentUserList[i] === user.handle_name) {
                currentUserList.splice(i, 1)
            }
        }

        await userModel.updateOne(
            { auth_id: req.body.auth_id },
            { followee_handle_names: currentUserList }
        )

        const updateUser = await userModel.findOne({
            handle_name: req.params.handleName,
        })
        res.json(updateUser)
    }
}

export const followShop = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await connectToDB()

        const user = await userModel.findOne({ auth_id: req.params.authId })
        const shop = await ShopsDataModel.findOne({
            handle_name: req.body.handle_name,
        })

        if (!user || !shop) {
            res.status(400).json({
                error: '対象のユーザー、または、お店がありません',
            })
        } else {
            // ユーザー側のfollowee_shops_handle_names更新
            await userModel.updateOne(
                { auth_id: req.params.authId },
                { $addToSet: { followee_shops_handle_names: shop.handle_name } }
            )

            // Shop側のfollower_handle_names更新
            await ShopsDataModel.updateOne(
                { handle_name: req.body.handle_name },
                { $addToSet: { follower_handle_name: user.handle_name } }
            )

            const newShop = await ShopsDataModel.findOne(
                {
                    handle_name: req.body.handle_name,
                },
                {
                    _id: 0,
                    __v: 0,
                }
            )

            res.status(200).json(newShop)
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

        const user = await userModel.findOne({ auth_id: req.params.authId })
        const shop = await ShopsDataModel.findOne({
            handle_name: req.body.handle_name,
        })

        if (!user || !shop) {
            res.status(400).json({
                error: '対象のユーザー、または、お店がありません',
            })
        } else {
            // ユーザー側のfollowee_shops_handle_namesから削除
            await userModel.updateOne(
                { auth_id: req.params.authId },
                {
                    $pull: {
                        followee_shops_handle_names: shop.handle_name,
                    },
                }
            )

            // Shop側のfollower_handle_namesから削除
            await ShopsDataModel.updateOne(
                { handle_name: req.body.handle_name },
                {
                    $pull: {
                        follower_handle_name: user.handle_name,
                    },
                }
            )

            const newShop = await ShopsDataModel.findOne(
                {
                    handle_name: req.body.handle_name,
                },
                {
                    _id: 0,
                    __v: 0,
                }
            )
            res.json(newShop)
        }
    } catch (err) {
        res.send(err)
    }
}
