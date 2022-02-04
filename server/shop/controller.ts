import { Request, Response } from 'express'
import { s3Upload } from '../s3'
import ShopsDataModel from '../schema/shopSchema'
import userModel from '../schema/userSchema'
import { Recommendation, Selling_point, ShopsData } from '../schema/shopSchema'

export const getShops = async (req: Request, res: Response) => {
    try {
        const data = await ShopsDataModel.find(
            { publish_state: true },
            { _id: 0, __v: 0 }
        )
        res.json(data)
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getShop = async (req: Request, res: Response) => {
    try {
        const data = await ShopsDataModel.findOne(
            {
                $or: [
                    { auth_id: req.params.authId },
                    { handle_name: req.params.handleName },
                ],
            },
            { _id: 0, __v: 0 }
        )
        res.json(data)
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getShopHandleNameCheck = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const handleName: String = req.params.handleName
        const shop = await ShopsDataModel.findOne({ handle_name: handleName })

        if (!shop) {
            res.send(false)
        } else {
            res.send(true)
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getShopFromUser = async (req: Request, res: Response) => {
    try {
        const authId: string = req.params.authId
        const handleName: string = req.params.handleName

        const user = await userModel.findOne({ auth_id: authId })
        const shop = await ShopsDataModel.findOne(
            { handle_name: handleName },
            { _id: 0, __v: 0 }
        )

        if (!user || !shop) {
            res.status(400).json({ error: '対象のデータがありません' })
        } else {
            const resData = JSON.parse(JSON.stringify(shop))
            resData.is_following = shop.follower_handle_name?.includes(
                user.handle_name
            )
            res.json(resData)
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const putShop = async (req: Request, res: Response) => {

    try {
        const dataBody = req.body
        const authIdCheck = await ShopsDataModel.findOne({
            auth_id: req.params.authId,
        }) as ShopsData

        if (!authIdCheck) {
            res.status(400).send({ error: 'ショップのアカウントがありません' })
        } else {
            let iconData: String = ''
            let sellingPointData: String = ''
            let recommendationData: String = ''

            if (dataBody?.icon) {
                const imgFileName = `icon_shop_${req.params.authId}`
                iconData = await s3Upload(dataBody.icon, imgFileName)
            }

            if (dataBody?.selling_point.image) {
                const imgFileName = `selling_point_shop_${req.params.authId}`
                sellingPointData = await s3Upload(
                    dataBody.selling_point.image,
                    imgFileName
                )
            }

            if (dataBody?.recommendation.image) {
                const imgFileName = `recommendation_shop_${req.params.authId}`
                recommendationData = await s3Upload(
                    dataBody.recommendation.image,
                    imgFileName
                )
            }

            if (iconData !== '') {
                dataBody.icon = iconData
            } else {
                delete dataBody.icon
            }

            if (sellingPointData !== '') {
                dataBody.selling_point.image = sellingPointData
            } else {
                dataBody.selling_point.image = authIdCheck.selling_point?.image
            }

            if (recommendationData !== '') {
                dataBody.recommendation.image = recommendationData
            } else {
                dataBody.recommendation.image = authIdCheck.recommendation?.image
            }

            await ShopsDataModel.updateOne(
                { auth_id: req.params.authId },
                dataBody
            )
            const data = await ShopsDataModel.findOne({
                auth_id: req.params.authId,
            })
            res.send(Object(data))
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

export const postShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const { auth_id, handle_name, display_name } = req.body
        const authIdCheck = await ShopsDataModel.findOne({
            auth_id: auth_id,
        })

        const handleNameCheck = await ShopsDataModel.findOne({
            handle_name: handle_name,
        })

        if (!authIdCheck && !handleNameCheck) {
            interface Recommendation {
                title: String
                description: String
                image: String
            }

            interface SellingPoint {
                text: String
                image: String
            }

            interface Shop {
                auth_id: String
                handle_name: String
                display_name: String
                icon: String
                address: String
                map_url: String
                hp_url: String
                instagram_url: String
                opening_hours: String
                regular_day_off: String
                concept: String
                recommendation: Recommendation
                selling_point: SellingPoint
                follower_handle_name: Array<String>
                publish_state: Boolean
            }

            const newShopUser: Shop = {
                auth_id: auth_id,
                handle_name: handle_name,
                display_name: display_name,
                icon: '',
                address: '',
                map_url: '',
                hp_url: '',
                instagram_url: '',
                opening_hours: '',
                regular_day_off: '',
                concept: '',
                recommendation: {
                    title: '',
                    description: '',
                    image: '',
                },
                selling_point: { text: '', image: '' },
                follower_handle_name: [],
                publish_state: false,
            }

            await ShopsDataModel.create(newShopUser)
            res.status(200).json({
                message: '新規ショップアカウントを作成しました',
            })
        } else if (authIdCheck) {
            res.status(400).json({
                error: '既に存在する認証IDです',
            })
        } else if (handleNameCheck) {
            res.status(400).json({
                error: '既に存在するユーザーIDです',
            })
        } else {
            res.status(400).json({ error: 'エラーです' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}
