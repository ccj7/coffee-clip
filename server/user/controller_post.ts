import { Request, Response } from 'express'
import connectToDB from '../db-connection'
import { s3Upload } from '../s3'
import userModel from '../schema/userSchema'

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

        const time = Date.now()

        if (bodyData.image) {
            const imgFileName: string = `review_user_${authId}_${time}`
            reviewImg = await s3Upload(bodyData.image, imgFileName)
        }

        if (newReviews) {
            const newReview = {
                image: reviewImg,
                description: bodyData.description,
                created_at: Number(time),
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
