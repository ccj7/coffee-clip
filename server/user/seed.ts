import userModel from '../schema/userSchema'
import data from './users.json'
import connectToDB from '../db-connection'

async function run(): Promise<void> {
    await connectToDB()
    await userModel.create(data.users)
    console.log('insert user data success!!')
    process.exit()
}

run().catch((err) => console.log(err))
