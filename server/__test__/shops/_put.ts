import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import connectToDB from "../../db-connection"
import server from "../../app"
import runSeedShop from "../../shop/seed"
import mongoose from "mongoose"

chai.use(chaiHttp)

describe('Shop Get Request Tests', () => {
  before(async () => {
    await connectToDB()
    await runSeedShop()
  })

  after(async () => {
    mongoose.connection.close()
  })

  describe('PUT /api/shop/',() => {

    it('should update information of the shop', async () => {
      const updateData = {
        display_name: "new coffee",
        concept: "コーヒに自信がとってもありあます",
        icon: ''
      }
      const res = await chai.request(server).put('/api/shops/540PJipKIwXZUY422LmC2j3ZlvU2').send(updateData)
      expect(res.body).to.deep.include({
        display_name: "new coffee",
        concept: "コーヒに自信がとってもありあます",
      })
      expect(res.body).not.to.deep.include({icon: ''})
    })

    it('should not update if request auth id is invalid', async () => {
      const res = await chai.request(server).put('/api/shops/XXXXXXXXXX').send({display_name: "new coffee"})
      expect(res.status).to.equal(400)
    })

  })

})