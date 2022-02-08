import app from './app'
import connectToDB from './db-connection'
import runSeedShop from './shop/seed'
import runSeedUser from './user/seed'

const PORT: number = 7000

connectToDB()
runSeedShop()
runSeedUser()

app.listen(PORT, (): void => {
  console.log(`Start on port ${PORT}.`)
})
