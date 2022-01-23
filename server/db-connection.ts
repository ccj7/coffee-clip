import mongoose from 'mongoose'

async function connectToDB(): Promise<void> {
  let dbInfo: string = process.env.MONGODB_URL || "mongodb://localhost:27017"
  await mongoose.connect( dbInfo , {
    dbName: "coffee_clip"
  });
}

export default connectToDB;