import { connect } from 'mongoose'
import userModel from '../schema/userSchema'
import data from './users.json'

async function run(): Promise<void> {
    await connect('mongodb://localhost:27017/coffee_clip')
    await userModel.create(data.users)
    console.log('insert user data success!!')
    process.exit()
}

run().catch((err) => console.log(err))
