import { Request, Response } from 'express'
import connectToDB from '../db-connection'
import { s3Upload } from '../s3'
import ShopsDataModel from '../schema/shopSchema'

export const getShops = async (req: Request, res: Response) => {
    await connectToDB()
    const data = await ShopsDataModel.find({ publish_state: true })
    res.send(data)
}

export const getShop = async (req: Request, res: Response) => {
    await connectToDB()
    const data = await ShopsDataModel.findOne({
        $or: [
            { auth_id: req.params.authId },
            { handle_name: req.params.handleName },
        ],
    })
    res.json(data)
}

export const putShop = async (req: Request, res: Response) => {
    await connectToDB()
    const dataBody = req.body
    const authIdCheck = await ShopsDataModel.findOne({
        auth_id: req.params.authId,
    })

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
            const imgFileName = `sellingpoint_shop_${req.params.authId}`
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
            delete dataBody.selling_point.image
        }

        if (recommendationData !== '') {
            dataBody.recommendation.image = recommendationData
        } else {
            delete dataBody.recommendation.image
        }

        await ShopsDataModel.updateOne({ auth_id: req.params.authId }, dataBody)
        const data = await ShopsDataModel.findOne({
            auth_id: req.params.authId,
        })
        res.send(Object(data))
    }
}

export const postShop = async (req: Request, res: Response): Promise<void> => {
    await connectToDB()
    const { auth_id, handle_name, display_name } = req.body

    const authIdCheck = await ShopsDataModel.findOne({
        auth_id: auth_id,
    })

    const handleNameCheck = await ShopsDataModel.findOne({
        handle_name: handle_name,
    })

    if (!authIdCheck && !handleNameCheck) {
        interface Shop {
            auth_id: String
            handle_name: String
            display_name: String
            icon: String | undefined
            address: String
            map_url: String
            hp_url: String
            instagram_url: String
            opening_hours: String
            regular_day_off: String
            concept: String
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
            follower_handle_name: [],
            publish_state: false,
        }

        await ShopsDataModel.create(newShopUser)
        res.status(200).end()
    } else {
        res.status(400).end()
    }
}
