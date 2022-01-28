import { Request, Response } from 'express'
import connectToDB from '../db-connection'
import { s3Upload } from '../s3'
import userModel from '../schema/userSchema'

export const postUser = async (req: Request, res: Response): Promise<void> => {
    try {
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
            res.status(200).json({ message: '新規ユーザーを作成しました' })
        } else if (authIdCheck) {
            res.status(400).json({
                error: '既に存在す認証IDです',
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

export const postReview = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await connectToDB()

        const authId: String = req.params.authId
        const user = await userModel.findOne({ auth_id: authId })

        if (user) {
            const bodyData = req.body

            let reviewImg: String = ''
            const time = Date.now()

            if (bodyData.image) {
                const imgFileName: string = `review_user_${authId}_${time}`
                reviewImg = await s3Upload(bodyData.image, imgFileName)
            }

            if (reviewImg || bodyData.description) {
                const newReview = {
                    image: reviewImg,
                    description: bodyData.description,
                    created_at: Number(time),
                }

                await userModel.updateOne(
                    { auth_id: authId },
                    { $push: { reviews: newReview } }
                )

                res.status(200).json({ message: '新規レビューを作成しました' })
            } else {
                res.status(400).json({
                    error: '送信されたデータが無いため作成できません',
                })
            }
        } else {
            res.status(400).json({ error: 'userが見つかりません' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}
