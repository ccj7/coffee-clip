import { Request, Response } from 'express'
import connectToDB from '../db-connection'
import userModel from '../schema/userSchema'
import ShopsDataModel from '../schema/shopSchema'
import { s3Upload } from '../s3'

export const putUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    const dataBody = req.body
    await connectToDB()
    const authIdCheck = await userModel.findOne({ auth_id: req.params.authId })

    if(!authIdCheck) {
        res.status(400).send({error: 'ユーザーのアカウントがありません'})
    } else {
        let iconData: String = ''

        if(dataBody?.icon) {
            const imgFileName = `icon_shop_${req.params.authId}`
            iconData = await s3Upload(dataBody.icon, imgFileName)
        }
        if(iconData !== '') {
            dataBody.icon = iconData
        } else {
            delete dataBody.icon
        }

        await userModel.updateOne({ auth_id: req.params.authId }, dataBody)
        const data = await userModel.findOne({ auth_id: req.params.authId })
        res.send(data)
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
        res.status(403).json('you already follow this users')
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
    await connectToDB()

    const user = await userModel.findOne({ auth_id: req.params.authId })
    const shop = await ShopsDataModel.findOne({
        handle_name: req.body.handle_name,
    })

    if (!user || !shop) {
        res.status(400).send({
            error: '対象のユーザー、または、お店がありません',
        })
        // followee-shops-handle-namesにフォローするショップのハンドルネームがないかを確認
    } else if (user.followee_shops_handle_names?.includes(shop.handle_name)) {
        res.status(400).send({ error: 'すでにフォロー済みです' })
        // follower_handle_namesに自分のハンドルネームがないかを確認
    } else if (shop.follower_handle_name?.includes(user.handle_name)) {
        res.status(400).send({ error: 'すでにフォロー済みです' })
        // 更新
    } else {
        // ユーザー側のfollowee_shops_handle_names更新
        const shopList = user.followee_shops_handle_names
        if (shopList) {
            shopList.push(shop.handle_name)
        }

        await userModel.updateOne(
            { auth_id: req.params.authId },
            { followee_shops_handle_names: shopList }
        )

        // Shop側のfollower_handle_names更新
        const userList = shop.follower_handle_name
        if (userList) {
            userList.push(user.handle_name)
        }

        await ShopsDataModel.updateOne(
            { handle_name: req.body.handle_name },
            { follower_handle_name: userList }
        )

        const newShop = await ShopsDataModel.findOne({
            handle_name: req.body.handle_name,
        })
        res.json(newShop)
    }
}

export const unfollowShop = async (
    req: Request,
    res: Response
): Promise<void> => {
    await connectToDB()

    const user = await userModel.findOne({ auth_id: req.params.authId })
    const shop = await ShopsDataModel.findOne({
        handle_name: req.body.handle_name,
    })

    if (!user || !shop) {
        res.status(400).send({
            error: '対象のユーザー、または、お店がありません',
        })
        // followee-shops-handle-namesにフォローするショップのハンドルネームがあるかを確認（なければエラー）
    } else if (!user.followee_shops_handle_names?.includes(shop.handle_name)) {
        res.status(400).send({ error: 'まだフォローしていません' })
        // follower_handle_namesに自分のハンドルネームがあるかを確認（なければばエラー）
    } else if (!shop.follower_handle_name?.includes(user.handle_name)) {
        res.status(400).send({ error: 'まだフォローしていません' })
        // 更新
    } else {
        // ユーザー側のfollowee_shops_handle_namesから削除
        const shopList = user.followee_shops_handle_names
        for (let i = 0; i < shopList.length; i++) {
            if (shopList[i] === shop.handle_name) {
                shopList.splice(i, 1)
            }
        }
        await userModel.updateOne(
            { auth_id: req.params.authId },
            { followee_shops_handle_names: shopList }
        )
        // Shop側のfollower_handle_namesから削除
        const userList = shop.follower_handle_name
        for (let i = 0; i < userList.length; i++) {
            if (userList[i] === user.handle_name) {
                userList.splice(i, 1)
            }
        }
        await ShopsDataModel.updateOne(
            { handle_name: req.body.handle_name },
            { follower_handle_name: userList }
        )

        const newShop = await ShopsDataModel.findOne({
            handle_name: req.body.handle_name,
        })
        res.json(newShop)
    }
}
