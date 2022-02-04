import { Schema, Types, Model, model } from 'mongoose'

export interface Recommendation {
    title?: string
    description?: string
    image?: string
}

export interface Selling_point {
    text?: string
    image?: string
}

export interface ShopsData {
    auth_id: string
    handle_name: string
    display_name: string
    icon?: string
    address?: string
    map_url?: string
    hp_url?: string
    instagram_url?: string
    opening_hours?: string
    regular_day_off?: string
    concept?: string
    recommendation?: Recommendation
    selling_point?: Selling_point
    follower_handle_name?: Types.Array<string>
    publish_state: boolean
}

const shopsDataSchema = new Schema<ShopsData, Model<ShopsData>>({
    auth_id: { type: String, required: true },
    handle_name: { type: String, required: true },
    display_name: { type: String, required: true },
    icon: String,
    address: String,
    map_url: String,
    hp_url: String,
    instagram_url: String,
    opening_hours: String,
    regular_day_off: String,
    concept: String,
    recommendation: { title: String, description: String, image: String },
    selling_point: { text: String, image: String },
    follower_handle_name: [String],
    publish_state: Boolean
})

const ShopsDataModel = model<ShopsData>('ShopData', shopsDataSchema)

export default ShopsDataModel
