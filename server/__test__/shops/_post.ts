import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import connectToDB from "../../db-connection"
import server from "../../app"
import runSeedShop from "../../shop/seed"
import mongoose from "mongoose"

chai.use(chaiHttp)

describe('Shop POST Request Tests', () => {
  before(async () => {
    await connectToDB()
    await runSeedShop()
  })

  after(async () => {
    mongoose.connection.close()
  })

  describe('POST /api/shop/ 配下',() => {

    it('should post a new shop', async () => {
      const newshop = {
        auth_id: 'XXXXXXXXXXX',
        handle_name: 'testing_coffee',
        display_name: 'testing_001'
      }
      const res = await chai.request(server).post('/api/shops/').send(newshop)
      expect(res.status).to.equal(200)
    })

    it('should not post a new shop without auth id', async () => {
      const newshop = {
        handle_name: 'testing_coffee',
        display_name: 'testing_001'
      }
      const res = await chai.request(server).post('/api/shops/').send(newshop)
      expect(res.status).to.equal(400)
    })

  })

})