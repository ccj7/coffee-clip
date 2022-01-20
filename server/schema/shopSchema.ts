const { Schema, Types, model, connect } = require('mongoose')

const shopDataSchema = new Schema({
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

const ShopDataModel = mongoose.model('ShopsData', shopDataSchema)

module.exports = ShopDataModel
