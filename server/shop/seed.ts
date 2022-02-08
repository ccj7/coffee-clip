import connectToDB from '../db-connection'
import ShopsDataModel from '../schema/shopSchema'
import data from './shops.json'
import mongoose from 'mongoose'

async function runSeedShop() {
  await connectToDB()
  mongoose.connection.db.dropCollection('shopdatas')
  await ShopsDataModel.create(data.shops)
  console.log('Inserted shop data!')
}

export default runSeedShop
