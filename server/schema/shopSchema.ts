import { Schema, Types, Model, model } from 'mongoose'

interface Recommendation {
    title?: string
    description?: string
    image?: string
}

interface ShopsData {
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
    recommendation?: Types.DocumentArray<Recommendation>
    selling_point?: string
    follower_auth_ids?: Types.Array<string>
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
    recommendation: [{ title: String, description: String, image: String }],
    selling_point: String,
    follower_auth_ids: [String],
})

const ShopsDataModel = model<ShopsData>('ShopData', shopsDataSchema)

export default ShopsDataModel