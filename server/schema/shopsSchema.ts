import { Schema, Types, model, connect } from 'mongoose'

run().catch((err) => console.log(err))

async function run(): Promise<void> {
    await connect('mongodb://localhost:27017/test')

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
        charm?: string
        follower_handle_names?: Types.Array<string>
    }

    const shopsDataSchema = new Schema<ShopsData>({
        auth_id: String,
        handle_name: String,
        display_name: String,
        icon: String,
        address: String,
        map_url: String,
        hp_url: String,
        instagram_url: String,
        opening_hours: String,
        regular_day_off: String,
        concept: String,
        recommendation: [{ title: String, description: String, image: String }],
        charm: String,
        follower_handle_names: [String],
    })

    const ShopsDataModel = model<ShopsData>('ShopData', shopsDataSchema)

    const doc = new ShopsDataModel({
        auth_id: '1111',
        handle_name: 'mizki',
        display_name: 'mizkiii',
        icon: 'URL',
        address: 'japan',
        map_url: 'Google URL',
        hp_url: 'hpURL',
        instagram_url: 'URL',
        opening_hours: '8:00~20:00',
        regular_day_off: '金曜日',
        concept: 'こだわってます',
        recommendation: [
            {
                title: 'アメリカンコーヒー',
                description: 'さっぱりで飲みやすい',
                image: 'URL',
            },
            {
                title: 'ブラジルコーヒー',
                description: 'よくわかりません',
                image: 'URL',
            },
            {
                title: 'エチオピア産豆',
                description: '酸味が効いてます',
                image: 'URL',
            },
        ],
        charm: 'オシャレです',
        follower_handle_names: ['ccmizki', 'ccwalk'],
    })
    await doc.save()

    console.log('sucess!!!!')
}
