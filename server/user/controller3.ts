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
            const shop = await ShopsDataModel.findOne({
                handle_name: shopHandleName,
            })

            if (shop) {
                interface RequireShopData {
                    handle_name: String
                    display_name: String
                    icon: String | undefined
                    concept: String | undefined
                }

                const requiredShopData: RequireShopData = {
                    handle_name: shop.handle_name,
                    display_name: shop.display_name,
                    icon: shop.icon,
                    concept: shop.concept,
                }

                followeeShops.push(requiredShopData)
            }
        }
    }

    res.json({ followeeShops: followeeShops })
}
