import { Schema, Types, Model, model } from 'mongoose'

interface Review {
  coffee_name?: string
  image?: string
  description?: string
  created_at: number
}

interface User {
  auth_id: string
  handle_name: string
  display_name: string
  icon?: string
  follower_handle_names: Types.Array<string>
  followee_handle_names: Types.Array<string>
  followee_shops_handle_names: Types.Array<string>
  reviews: Types.DocumentArray<Review> | Types.Array<undefined>
}

const userSchema = new Schema<User, Model<User>>({
  auth_id: { type: String, required: true },
  handle_name: { type: String, required: true },
  display_name: { type: String, required: true },
  icon: String,
  follower_handle_names: [String],
  followee_handle_names: [String],
  followee_shops_handle_names: [String],
  reviews: [
    {
      coffee_name: String,
      image: String,
      description: String,
      created_at: Number,
    },
  ],
})

const userModel = model<User>('User', userSchema)

export default userModel
