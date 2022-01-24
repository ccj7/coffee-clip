import { Schema, Types, Model, model } from 'mongoose'

interface Review {
    image?: string
    description?: string
}

interface User {
    auth_id: string
    handle_name: string
    display_name: string
    icon?: string
    follower_auth_ids?: Types.Array<string>
    followee_auth_ids?: Types.Array<string>
    followee_shops_auth_ids?: Types.Array<string>
    reviews?: Types.DocumentArray<Review>
}

const userSchema = new Schema<User, Model<User>>({
    auth_id: { type: String, required: true },
    handle_name: { type: String, required: true },
    display_name: { type: String, required: true },
    icon: String,
    follower_auth_ids: [String],
    followee_auth_ids: [String],
    followee_shops_auth_ids: [String],
    reviews: [
        {
            image: String,
            description: String,
        },
    ],
})

const userModel = model<User>('User', userSchema)

export default userModel
