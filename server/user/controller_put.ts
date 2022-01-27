import { Request, Response } from 'express'
import userModel from '../schema/userSchema'
import ShopsDataModel from '../schema/shopSchema'
import connectToDB from '../db-connection'
import { s3Upload } from '../s3'

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
