import userModel from '../schema/userSchema'
import data from './users.json'
import connectToDB from '../db-connection'
import mongoose from 'mongoose'

export async function runSeedUser(): Promise<void> {
    await connectToDB()
    mongoose.connection.db.dropCollection('users')
    await userModel.create(data.users)
    console.log('insert user data success!!')
}

export default runSeedUser
